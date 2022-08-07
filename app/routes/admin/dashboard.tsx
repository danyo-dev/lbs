import { Outlet } from "@remix-run/react"
import type {LoaderFunction } from "@remix-run/node"
import { requireAuthentication } from "~/services/auth.server"

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request)
  return null
}

export default function DashboardRoute() {
  return <Outlet />
}
