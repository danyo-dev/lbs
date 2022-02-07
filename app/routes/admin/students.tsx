import { LoaderFunction, Outlet } from "remix";
import { getStudentProfiles } from "~/services/academy5Service";

export const loader: LoaderFunction = async () => {
  const studentProfiles = await getStudentProfiles();

  return studentProfiles;
};

export default function Students() {
  return <Outlet />;
}
