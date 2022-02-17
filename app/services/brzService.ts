import { v4 } from "uuid";
import { getSession } from "./session.server";
import converter from "xml-js";
import { Session } from "remix";

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

export function handleErrors(
  response: Response,
  responseMsg = "error occured"
) {
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

export async function brzAuthenticationHandler(
  request: Request
): Promise<Session> {
  const session = await getSession(request);
  if (
    !session.has("brz_auth_expiration") ||
    session.get("brz_auth_expiration") <= Date.now()
  ) {
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

  const requestURL = process.env.BRZ_AUTH_URL || "";
  const { BRZ_USER: user, BRZ_PASSWORD: password } = process.env;

  const base64Output = Buffer.from(`${user}:${password}`).toString("base64");
  const headers = new Headers();

  headers.set("Authorization", `Basic ${base64Output}`);
  headers.set("Content-Type", "Application/x-www-form-urlencoded");
  headers.set("Accept", "Application/json");

  const response = await fetch(requestURL, {
    method: "post",
    headers,
  });

  handleErrors(response);

  const responseData = await response.json();

  session.set("brz_auth", responseData);
  session.set(
    "brz_auth_expiration",
    Date.now() + responseData.expires_in * 1000
  );

  return session;
}

/**
 * Get Studiendaten for a student
 * https://stubei-q.portal.at/rws/0.6/studium.xml
 * @param request
 * @returns promise
 */
export async function requestBrzStudiendaten(
  session: Session,
  queryString: string
): Promise<string | void> {
  const token = session.get("brz_auth").access_token;

  const uuid = v4();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_STUDIENDATEN}?be=FL&${queryString}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: "get",
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
export async function requestBrzStammdaten(
  session: Session,
  queryString: string
): Promise<string | void> {
  const token = session.get("brz_auth").access_token;

  const uuid = v4();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_STAMMDATEN_URL}?be=FL&${queryString}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: "get",
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
export async function requestBrzMatrikelNumber(
  session: Session,
  queryString: string
): Promise<string | void> {
  const token = session.get("brz_auth").access_token;

  const uuid = v4();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_MATRIKEL_CHECK_URL}?${queryString}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: "get",
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

export async function requestGetReservedMatrikel(
  session: Session,
  year: string
): Promise<string | void> {
  const token = session.get("brz_auth").access_token;
  const uuid = v4();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_RESERVED_MATRIKEL_URL}?be=FL&sj=${year}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: "get",
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
export async function requestNewMatrikel(
  session: Session,
  year: FormDataEntryValue
): Promise<string | void> {
  const token = session.get("brz_auth").access_token;
  const uuid = v4();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  headers.set("Content-Type", "application/xml");

  const XMLdata = `<?xml version="1.0" encoding="UTF-8"?> <matrikelnummernanfrage><uuid>${uuid}</uuid><kontingentblock><anzahl>1</anzahl><be>FL</be><sj>${year}</sj></kontingentblock></matrikelnummernanfrage>`;

  const requestURL = `${process.env.BRZ_GET_NEW_MATRIKEL_URL}`;

  const response = await fetch(requestURL, {
    method: "post",
    headers,
    body: XMLdata,
  });

  const XMLResponse = await response.text();
  const responseBody = handleXMLResponse(XMLResponse);

  handleErrors(response, responseBody);

  return responseBody;
}
