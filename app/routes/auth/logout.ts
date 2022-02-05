import { redirect } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import { destroySession, getSession } from "~/services/session.server";

export let action: ActionFunction = async ({ request }): Promise<Response> => {
  const session = await getSession(request);

  const logoutURL = new URL(process.env.AUTH0_LOGOUT_URL || "");

  logoutURL.searchParams.set("client_id", process.env.AUTH0_CLIENT_ID || "");
  logoutURL.searchParams.set("returnTo", process.env.AUTH0_BASE_URL || "/");

  return redirect(logoutURL.toString(), {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

export const loader: LoaderFunction = () => {
  throw new Response("404 Not Found", {
    status: 404,
  });
};
