import { json } from "@remix-run/server-runtime";
import { authenticator } from "./auth.server";

export async function checkAuthStatus(request: Request) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return user;
  // throw json({ message: "Forbidden" }, { status: 403 });
}
