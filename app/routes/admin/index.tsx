import { json, LoaderFunction } from "remix";

export const loader: LoaderFunction = () => {
  throw json("404 Not Found", {
    status: 404,
  });
};
