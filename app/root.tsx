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
import { ToastContainer } from "react-toastify";
import toastStyles from "react-toastify/dist/ReactToastify.css";
import { EnvVars } from "~/types/envTypes";
import { brzAuthenticationHandler } from "./services/brzService";
import { commitSession } from "./services/session.server";
import styles from "~/styles/tailwind-build.css";

export const loader: LoaderFunction = async ({ request }) => {
  const brzSession = await brzAuthenticationHandler(request);
  return json(
    {
      ENV: {
        AUTH0_SESSION_TIMEOUT: process.env.AUTH0_SESSION_TIMEOUT,
      },
    },
    {
      headers: {
        "Set-Cookie": await commitSession(brzSession),
      },
    }
  );
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    {
      rel: "stylesheet",
      href: toastStyles,
    },
  ];
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
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
