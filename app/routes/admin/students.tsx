import { LoaderFunction, Outlet, useCatch } from "remix";
import { people as data } from "~/data/students";

export const loader: LoaderFunction = () => {
  return data;
};

export default function Students() {
  return <Outlet />;
}
