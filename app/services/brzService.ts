import { v4 } from "uuid";
import { BrzLoginResponse } from "~/types/brzTypes";
import { getSession } from "./session.server";
import converter from "xml-js";

export async function brzLoginRequestHandler(
  request: Request
): Promise<BrzLoginResponse> {
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

  const session = await getSession(request);
  session.set("brz_auth", responseData);

  return { responseData, session };
}

// TODO: accept user data to create fetch rURL dynamically
export async function requestBrzMatrikelNumber(request: Request): Promise<any> {
  const accessToken = await handleBrzAuthSession(request);

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${accessToken}`);

  const uuid = v4();
  const requestURL = `${process.env.BRZ_MATRIKEL_CHECK_URL}?geburtsdatum=1996-07-03&nachname=Burtakova&vorname=Anna&uuid=${uuid}`;

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

async function handleBrzAuthSession(request: Request) {
  const session = await getSession(request);
  const brzSession = await session.get("brz_auth");

  if (brzSession.expires_in <= 0) {
    const { responseData } = await brzLoginRequestHandler(request);
    return responseData.access_token;
  }

  return brzSession.access_token;
}
