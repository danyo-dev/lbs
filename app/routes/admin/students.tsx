import { LoaderFunction, json } from "@remix-run/node";
import {  Outlet } from "@remix-run/react";
import { requireAuthentication } from "~/services/auth.server";
import { withDatabase, getProfiles, getRelevantProfiles } from "~/services/db.server";

export const loader: LoaderFunction = async ({ request }) => {
  return withDatabase(async () => {
    await requireAuthentication(request);
    const studentProfilesToRender = await getRelevantProfiles();
    if (!studentProfilesToRender) {
      throw new Response("no studentProfiles found", {
        status: 404,
      });
    }
    const mapStudentProfiles = studentProfilesToRender.map((profile) => {
      return { id: profile.pid };
    });
    const studentProfiles = await getProfiles(mapStudentProfiles);

    if (!studentProfiles) {
      throw new Response("no studentProfiles found", {
        status: 404,
      });
    }
    return json(studentProfiles);
  });
};

export default function Students() {
  return <Outlet />;
}
