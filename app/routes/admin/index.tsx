import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  throw new Response("404 Not Found", {
    status: 404,
  });
};
