import { LoaderFunction, Outlet, json } from "remix";
import { getProfiles } from "~/services/db.server";

export const loader: LoaderFunction = async () => {
  const studentProfiles = await getProfiles();
  if (!studentProfiles) {
    throw new Response("no studentProfiles found", {
      status: 404,
    });
  }
  return json(studentProfiles);
};

export default function Students() {
  return <Outlet />;
}
