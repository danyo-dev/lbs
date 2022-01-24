import { v4 } from "uuid";
import { BrzLoginResponse } from "~/types/brzTypes";
import { getSession } from "./session.server";
import converter from "xml-js";
import { Session } from "remix";

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
export async function requestBrzMatrikelNumber(
  request: Request
): Promise<string> {
  const session = await brzAuthenticationHandler(request);
  const token = session.get("brz_auth").access_token;

  const uuid = v4();

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${token}`);

  const requestURL = `${process.env.BRZ_MATRIKEL_CHECK_URL}?geburtsdatum=1995-07-03&nachname=Burtakova&vorname=Anna&uuid=${uuid}`;
  const response = await fetch(requestURL, {
    method: "get",
    headers,
  });
  if (!response.ok) {
    throw new Response("error occured", {
      status: response.status,
    });
  }
  const XMLResponse = await response.text();

  return converter.xml2json(XMLResponse, { compact: true });
}
