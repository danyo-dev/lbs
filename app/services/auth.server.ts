// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { Auth0Strategy, Auth0Profile } from "remix-auth-auth0";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<Auth0Profile>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: process.env.AUTH0_CALLBACK_URL || "",
    clientID: process.env.AUTH0_CLIENT_ID || "",
    clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
    domain: process.env.AUTH0_ISSUER_BASE_URL || "",
  },
  async ({ profile }) => {
    return profile;
  }
);

authenticator.use(auth0Strategy);
