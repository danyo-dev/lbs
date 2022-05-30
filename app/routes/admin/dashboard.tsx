import { Outlet, LoaderFunction } from "remix"
import { requireAuthentication } from "~/services/auth.server"

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request)
  return null
}

export default function DashboardRoute() {
  return <Outlet />
}
