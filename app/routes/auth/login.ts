import type { LoaderFunction, ActionFunction } from "remix";

import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate("auth0", request);
};

export const loader: LoaderFunction = () => {
  throw new Response("404 Not Found", {
    status: 404,
  });
};
