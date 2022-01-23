import {
  json,
  Links,
  LinksFunction,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction, LoaderFunction } from "remix";
import { EnvVars } from "~/types/envTypes";
import styles from "./tailwind.css";
import { commitSession, getSession } from "./services/session.server";
import { brzLoginRequestHandler } from "./services/brzService";

export const loader: LoaderFunction = async ({ request }) => {
  const brzLoginResponse = await brzLoginRequestHandler();
  const session = await getSession(request);
  session.set("brz_auth", brzLoginResponse);
  return json(
    {
      ENV: {
        AUTH0_SESSION_TIMEOUT: process.env.AUTH0_SESSION_TIMEOUT,
      },
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  return { title: "LBS Student Management System" };
};

export default function App() {
  const data = useLoaderData<EnvVars>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
