import { LoaderFunction, Outlet, json } from "remix"
import { requireAuthentication } from "~/services/auth.server"
import { getProfiles } from "~/services/db.server"

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request)
  const studentProfiles = await getProfiles()
  if (!studentProfiles) {
    throw new Response("no studentProfiles found", {
      status: 404,
    })
  }
  return json(studentProfiles)
}

export default function Students() {
  return <Outlet />
}
