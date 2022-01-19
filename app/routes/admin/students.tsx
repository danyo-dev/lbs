import { Outlet } from "remix";

export default function Students() {
  return (
    <>
      <h1>Students</h1>
      <Outlet />
    </>
  );
}
