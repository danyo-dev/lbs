import { v4 } from "uuid";
import { BrzLoginResponse } from "~/types/brzTypes";
import { getSession } from "./session.server";
import converter from "xml-js";
import { json } from "remix";

export async function brzLoginRequestHandler(): Promise<BrzLoginResponse> {
  const user = process.env.BRZ_USER;
  const password = process.env.BRZ_PASSWORD;
  const base64Output = Buffer.from(`${user}:${password}`).toString("base64");

  const headers = new Headers();
  headers.set("Authorization", `Basic ${base64Output}`);
  headers.set("Content-Type", "Application/x-www-form-urlencoded");
  headers.set("Accept", "Application/json");

  const response = await fetch(
    "https://stubei-q.portal.at/dvb/oauth/token?grant_type=client_credentials",
    {
      method: "post",
      headers,
    }
  );
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Response("error occured", {
      status: response.status,
    });
  }
}

// TODO: accept user data to create fetch rURL dynamically
export async function brzRequestMatrikelNumber(request: Request): Promise<any> {
  const session = await getSession(request);
  const bearerToken = await session.get("brz_auth").access_token;

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${bearerToken}`);

  const uuid = v4();
  const requestURL = `https://stubei-q.portal.at/rws/0.6/matrikelpruefung.xml?geburtsdatum=1995-07-03&nachname=Burtakova&vorname=Anna&uuid=${uuid}`;

  const response = await fetch(requestURL, {
    method: "get",
    headers,
  });

  if (response.status === 200) {
    const XMLResponse = await response.text();
    return converter.xml2json(XMLResponse, { compact: true });
  } else {
    throw new Response("error occured", {
      status: response.status,
    });
  }
}
