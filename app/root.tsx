import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "./tailwind.css";

import { verifyUserRole } from "~/auth/authenticateUser";
import { authenticator } from "./services/auth.server";
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction = () => {
  return { title: "LBS Student Management System" };
};

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request);
  return user ? "authenticated" : "not authenticated";
};

export default function App() {
  const message = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {message}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
