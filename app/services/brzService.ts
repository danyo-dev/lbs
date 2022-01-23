import { v4 } from "uuid";
import { BrzLoginResponse } from "~/types/brzTypes";
import { commitSession, getSession } from "./session.server";
import converter from "xml-js";
import { redirect, useSubmit } from "remix";

export async function brzLoginRequestHandler(): Promise<BrzLoginResponse> {
  const { BRZ_USER: user, BRZ_PASSWORD: password } = process.env;
  const base64Output = Buffer.from(`${user}:${password}`).toString("base64");

  const headers = new Headers();
  headers.set("Authorization", `Basic ${base64Output}`);
  headers.set("Content-Type", "Application/x-www-form-urlencoded");
  headers.set("Accept", "Application/json");

  const requestURL = process.env.BRZ_AUTH_URL || "";

  const response = await fetch(requestURL, {
    method: "post",
    headers,
  });

  if (!response.ok) {
    throw new Response("error occured", {
      status: response.status,
    });
  }

  return await response.json();
}

// TODO: accept user data to create fetch rURL dynamically
export async function brzRequestMatrikelNumber(request: Request): Promise<any> {
  const session = await getSession(request);
  const bearerToken = await session.get("brz_auth").access_token;

  console.log(session.get("brz_auth"));

  const headers = new Headers();
  headers.set("Authorization", `Bearer ${bearerToken}`);

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
