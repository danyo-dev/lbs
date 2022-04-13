import { v4 } from 'uuid';
import { getSession } from './session.server';
import converter from 'xml-js';
import { Session } from 'remix';
import { BRZ_FlattendedStammDatenProfile } from '~/types/StudentTypes';

/**
 * Handle XML Response
 * @param response
 * @returns JSON string
 */

export function handleXMLResponse(response: string) {
  return converter.xml2json(response, {
    compact: true,
  });
}

/**
 * Handle Errors
 * @param status
 * @param statusText
 */

export function handleErrors(response: Response, responseMsg = 'error occured') {
  if (response.ok) {
    return;
  }
  throw new Response(responseMsg, {
    status: response.status,
  });
}

/**
 * Handle Authentication
 * @param request
 * @returns Session as Promise
 */

export async function brzAuthenticationHandler(request: Request): Promise<Session> {
  const session = await getSession(request);
  if (!session.has('brz_auth_expiration') || session.get('brz_auth_expiration') <= Date.now()) {
    const authenticateRequest = await authenticate(request);

    return authenticateRequest;
  }
  return session;
}

/**
 * Authenticates BRZ user against API
 * https://stubei-q.portal.at/dvb/oauth/token?grant_type=client_credentials
 * @param request
 * @returns Promise
 */
async function authenticate(request: Request): Promise<Session> {
  const session = await getSession(request);

  const requestURL = process.env.BRZ_AUTH_URL || '';
  const { BRZ_USER: user, BRZ_PASSWORD: password } = process.env;

  const base64Output = Buffer.from(`${user}:${password}`).toString('base64');
  const headers = new Headers();

  headers.set('Authorization', `Basic ${base64Output}`);
  headers.set('Content-Type', 'Application/x-www-form-urlencoded');
  headers.set('Accept', 'Application/json');

  const response = await fetch(requestURL, {
    method: 'post',
    headers,
  });

  handleErrors(response);

  const responseData = await response.json();

  session.set('brz_auth', responseData);
  session.set('brz_auth_expiration', Date.now() + responseData.expires_in * 1000);

  return session;
}

/**
 * Get Studiendaten for a student
 * https://stubei-q.portal.at/rws/0.6/studium.xml
 * @param request
 * @returns promise
 */
export async function requestBrzStudiendaten(session: Session, queryString: string): Promise<string | void> {
  const token = session.get('brz_auth').access_token;

  const uuid = v4();

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_STUDIENDATEN}?be=FL&${queryString}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: 'get',
    headers,
  });
  const XMLResponse = await response.text();
  const responseBody = handleXMLResponse(XMLResponse);

  handleErrors(response, responseBody);

  return responseBody;
}

/**
 * Get Stammdaten for a student
 * https://stubei-q.portal.at/rws/0.6/stammdaten.xml
 * @param request
 * @returns promise
 */
export async function requestBrzStammdaten(session: Session, queryString: string): Promise<string | void> {
  const token = session.get('brz_auth').access_token;

  const uuid = v4();

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_STAMMDATEN_URL}?be=FL&${queryString}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: 'get',
    headers,
  });
  const XMLResponse = await response.text();
  const responseBody = handleXMLResponse(XMLResponse);

  handleErrors(response, responseBody);

  return responseBody;
}

/**
 * Check if matrikel number exists
 * https://stubei-q.portal.at/rws/0.6/matrikelpruefung.xml
 * @param request
 * @returns Promise
 */
export async function requestBrzMatrikelNumber(session: Session, queryString: string): Promise<string | void> {
  const token = session.get('brz_auth').access_token;

  const uuid = v4();

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_MATRIKEL_CHECK_URL}?${queryString}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: 'get',
    headers,
  });

  const XMLResponse = await response.text();
  const responseBody = handleXMLResponse(XMLResponse);

  handleErrors(response, responseBody);

  return responseBody;
}

/**
 * Get reserved matrikel numbers
 * https://stubei-q.portal.at/rws/0.6/matrikelreservierung.xml
 * @param session
 * @returns Promise
 */

export async function requestGetReservedMatrikel(session: Session, year: string): Promise<string | void> {
  const token = session.get('brz_auth').access_token;
  const uuid = v4();

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_RESERVED_MATRIKEL_URL}?be=FL&sj=${year}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: 'get',
    headers,
  });

  const XMLResponse = await response.text();
  const responseBody = handleXMLResponse(XMLResponse);

  handleErrors(response, responseBody);

  return responseBody;
}

/**
 * Request new matrikel number
 * https://stubei-q.portal.at/rws/matrikelnummern/1.0/reservierung.xml
 * @param session
 * @returns Promise
 */
export async function requestNewMatrikel(session: Session, year: FormDataEntryValue): Promise<string | void> {
  const token = session.get('brz_auth').access_token;
  const uuid = v4();

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/xml');

  const XMLdata = `<?xml version="1.0" encoding="UTF-8"?> <matrikelnummernanfrage><uuid>${uuid}</uuid><kontingentblock><anzahl>1</anzahl><be>FL</be><sj>${year}</sj></kontingentblock></matrikelnummernanfrage>`;

  const requestURL = `${process.env.BRZ_GET_NEW_MATRIKEL_URL}`;

  const response = await fetch(requestURL, {
    method: 'post',
    headers,
    body: XMLdata,
  });

  const XMLResponse = await response.text();
  const responseBody = handleXMLResponse(XMLResponse);

  handleErrors(response, responseBody);

  return responseBody;
}

/**
 * Post Stammdaten
 * https://stubei-q.portal.at/rws/0.6/stammdaten.xml
 * @param session
 * @returns Promise
 */
export async function postStammDaten(
  session: Session,
  stammDatenData: BRZ_FlattendedStammDatenProfile
): Promise<string | void> {
  const {
    matrikelnummer,
    semester,
    vorname,
    nachname,
    geburtsdatum,
    email,
    homeStrasse,
    homePlz,
    homeOrt,
    homeTyp,
    homeLand,
    semesterStrasse,
    semesterPlz,
    semesterOrt,
    semesterTyp,
    semesterLand,
    staatsangehoerigkeit,
    anrede,
    akadgrad,
    akadnach,
    svnr,
    bpk,
    ekz,
    perskz,
  } = stammDatenData;

  const token = session.get('brz_auth').access_token;
  const uuid = v4();

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Content-Type', 'application/xml');

  const XMLdata = `<?xml version="1.0" encoding="UTF-8"?>
  <stammdatenanfrage xmlns="http://www.brz.gv.at/datenverbund-unis" xmlns:xjc="http://java.sun.com/xml/ns/jaxb/xjc" xsi:schemaLocation="http://www.brz.gv.at/datenverbund-unis schema.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
      <uuid>${uuid}</uuid>
      <studierendenkey>
          <matrikelnummer>${matrikelnummer}</matrikelnummer>
          <be>FL</be>
          <semester>${semester}</semester>
      </studierendenkey>
      <stammdaten xsi:type="studentInfoMitbelegung">
          <vorname>${vorname}</vorname>
          <nachname>${nachname}</nachname>
          <akadnach>${akadnach}</akadnach>
          <akadgrad>${akadgrad}</akadgrad>
          {${bpk && `<bpk>${bpk}</bpk>`}}
          {${svnr && `<svnr>${svnr}</svnr>`}}
          {${ekz && `<ekz>${ekz}</ekz>`}}
          <geburtsdatum>${geburtsdatum}</geburtsdatum>
          <geschlecht>${anrede}</geschlecht>
          <staatsbuergerschaft>${staatsangehoerigkeit}</staatsbuergerschaft>
          <adressen>
              <adresse>
                  <strasse>${homeStrasse}</strasse>
                  <plz>${homePlz}</plz>
                  <ort>${homeOrt}</ort>
                  <staat>${homeLand}</staat>
                  <typ>${homeTyp}</typ>
              </adresse>
              <adresse>
                  <strasse>${semesterStrasse}</strasse>
                  <plz>${semesterPlz}</plz>
                  <ort>${semesterOrt}</ort>
                  <staat>${semesterLand}</staat>
                  <typ>${semesterTyp}</typ>
              </adresse>
          </adressen>
          <beitragstatus>X</beitragstatus>
          <emailliste>
              <email>
                  <emailadresse>${email}</emailadresse>
                  <emailtyp>BE</emailtyp>
              </email>
          </emailliste>
          <studienliste>
              <studiengang>
                  <stgkz>022${perskz?.substring(3, 7)}</stgkz>
                  <perskz>${perskz}</perskz>
                  <bmwfwfoerderrelevant>j</bmwfwfoerderrelevant>
              </studiengang>
          </studienliste>
      </stammdaten>
      <vorschreibung>
          <oehbeitrag>2070</oehbeitrag>
          <sonderbeitrag>0</sonderbeitrag>
          <studienbeitrag>0</studienbeitrag>
          <valutadatum>2021-08-30</valutadatum>
          <studienbeitragnachfrist>0</studienbeitragnachfrist>
          <valutadatumnachfrist>2021-10-31</valutadatumnachfrist>
      </vorschreibung>
  </stammdatenanfrage>`;

  const requestURL = `${process.env.BRZ_POST_STAMMDATEN}`;

  const response = await fetch(requestURL, {
    method: 'post',
    headers,
    body: XMLdata,
  });

  const XMLResponse = await response.text();
  const responseBody = handleXMLResponse(XMLResponse);

  handleErrors(response, responseBody);

  return responseBody;
}
