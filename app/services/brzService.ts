import { v4 } from "uuid";
import { BrzLoginResponse } from "~/types/brzTypes";
import { getSession } from "./session.server";
import converter from "xml-js";
import { Session } from "remix";

/**
 * handelrr for XML 2 JSON conversion
 * @param response
 * @returns JSON string
 */

function handleXMLResponse(response: string) {
  return converter.xml2json(response, {
    compact: true,
  });
}

/**
 * handler for responses from BRZ
 * @param status
 * @param statusText
 */
function handleErrors(status: number, statusText: string) {
  throw new Response(statusText, {
    status,
  });
}

/**
 * Check if Authentication needs to be run
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
    return await authenticate(request);
  }
  return session;
}

/**
 * Authenticates BRZ user against API
 * @param request
 * @returns Session as Promise
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
  if (!response.ok) {
    throw new Response("error occured", {
      status: response.status,
    });
  }
  const responseData = await response.json();

  session.set("brz_auth", responseData);
  session.set(
    "brz_auth_expiration",
    Date.now() + responseData.expires_in * 1000
  );

  return session;
}

// TODO: accept user data to create fetch rURL dynamically
/**
 *
 * @param request
 * @returns a xml to JSON converted string as Promise
 */
export async function requestBrzStammdaten(session: Session): Promise<string> {
  const token = session.get("brz_auth").access_token;

  const uuid = v4();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);
  const requestURL = `${process.env.BRZ_STAMMDATEN_URL}?be=FL&matrikelnummer=01329196&semester=2021W&uuid=${uuid}`;
  const response = await fetch(requestURL, {
    method: "get",
    headers,
  });
  const XMLResponse = await response.text();
  const StringResponse = handleXMLResponse(XMLResponse);

  if (!response.ok) {
    handleErrors(response.status, StringResponse);
  }

  return StringResponse;
}
/**
 *
 * @param request
 * @returns a xml to JSON converted string as Promise
 */
export async function requestBrzMatrikelNumber(
  session: Session,
  userData
): Promise<string> {
  const token = session.get("brz_auth").access_token;
  const { birthdate, vorname, nachname } = userData;
  const uuid = v4();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_MATRIKEL_CHECK_URL}?geburtsdatum=${birthdate}&nachname=${nachname}&vorname=${vorname}&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: "get",
    headers,
  });

  const XMLResponse = await response.text();
  const StringResponse = handleXMLResponse(XMLResponse);

  if (!response.ok) {
    handleErrors(response.status, StringResponse);
  }

  return StringResponse;
}