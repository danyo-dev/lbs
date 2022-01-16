import type { ActionFunction, LoaderFunction } from "remix";

import { authenticator } from "~/services/auth.server";

export let action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/admin",
  });
};
