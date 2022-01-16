import { Outlet } from "remix";

export default function Logs() {
  return (
    <>
      <h1>Logs</h1>
      <Outlet />
    </>
  );
}
