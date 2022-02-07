import { LoaderFunction, Outlet } from "remix";
import { fetchStudentProfiles } from "~/services/academy5Service";

export const loader: LoaderFunction = async () => {
  const studentProfiles = await fetchStudentProfiles();

  return studentProfiles;
};

export default function Students() {
  return <Outlet />;
}
