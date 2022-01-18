import { Outlet } from "remix";

export default function Overview() {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-gray-900 ">
        Student Management Platform
      </h1>
      <Outlet />
    </>
  );
}
