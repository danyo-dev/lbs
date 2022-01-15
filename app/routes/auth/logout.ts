import { redirect } from "remix";
import type { ActionFunction } from "remix";
import { destroySession, getSession } from "~/services/session.server";

export let action: ActionFunction = async ({ request }): Promise<Response> => {
  const session = await getSession(request);

  const logoutURL = new URL("https://dev-jp67y3j5.us.auth0.com/v2/logout");

  logoutURL.searchParams.set("client_id", "P2kCIEBbNaeHT2ssCo8cefdUWKENO0z6");
  logoutURL.searchParams.set("returnTo", "http://localhost:3000/login");

  return redirect(logoutURL.toString(), {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};
