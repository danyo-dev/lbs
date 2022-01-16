import { json } from "@remix-run/server-runtime";
import { authenticator } from "./auth.server";

export async function checkAuthStatus(request: Request) {
  return await authenticator.isAuthenticated(request);
}

export async function handleAuthFailureRedirect(request: Request) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
}

export function handleAuthFailureError() {
  throw json({ message: "Forbidden" }, { status: 403 });
}
