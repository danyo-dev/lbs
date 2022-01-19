import { Outlet } from "remix";

export default function Overview() {
  return (
    <>
      <h1>Overview</h1>
      <Outlet />
    </>
  );
}
