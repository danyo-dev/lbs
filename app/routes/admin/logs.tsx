import { Outlet } from "@remix-run/react";

export default function Logs() {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-gray-900 ">Logs</h1>
      <Outlet />
    </>
  );
}
