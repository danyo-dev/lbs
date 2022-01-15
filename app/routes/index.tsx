import { LoaderFunction } from "@remix-run/server-runtime";
import { checkAuthStatus } from "~/services/checkAuthStatus";

export const loader: LoaderFunction = async ({ request }) => {
  return await checkAuthStatus(request);
};

export default function Index() {
  return <>Dashboard</>;
}
