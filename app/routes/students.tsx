import { LoaderFunction, Outlet, useLoaderData } from "remix";
import { checkAuthStatus } from "~/services/checkAuthStatus";

export const loader: LoaderFunction = async ({ request }) => {
  return await checkAuthStatus(request);
};

export default function Index() {
  return (
    <>
      <h1>students</h1>
      <Outlet />
    </>
  );
}
