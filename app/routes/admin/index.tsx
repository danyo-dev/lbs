import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = () => {
  throw new Response("404 Not Found", {
    status: 404,
  });
};
