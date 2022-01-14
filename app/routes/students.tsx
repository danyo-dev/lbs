import { Outlet, useLoaderData } from "remix";

export default function Index() {
  return (
    <>
      <h1>Overview</h1>
      <Outlet />
    </>
  );
}
