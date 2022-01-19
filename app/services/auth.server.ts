// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { Auth0Strategy, Auth0Profile } from "remix-auth-auth0";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<Auth0Profile>(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: "http://localhost:3000/auth/callback",
    clientID: "P2kCIEBbNaeHT2ssCo8cefdUWKENO0z6",
    clientSecret:
      "CbCKYSuF5suGGoQ7Zt9h6g6kU8V1xH5AvvuU1NUZmr95T0sFkexNP6JB8B9qDXc7",
    domain: "dev-jp67y3j5.us.auth0.com",
  },
  async ({ profile }) => {
    return profile;
  }
);

authenticator.use(auth0Strategy);
