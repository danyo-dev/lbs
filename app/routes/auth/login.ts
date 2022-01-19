import type { ActionFunction } from "remix";

import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate("auth0", request, {
    successRedirect: "/admin/overview",
  });
};
