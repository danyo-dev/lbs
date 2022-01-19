import { LoaderFunction, Outlet, useLoaderData } from "remix";
import type { Auth0Profile } from "remix-auth-auth0";
import Sidebar from "~/components/Sidebar";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, { failureRedirect: "/" });
};

export default function Admin() {
  const { displayName } = useLoaderData<Auth0Profile>();

  return (
    <div className="flex">
      <div className="w-1/6">
        <Sidebar displayName={displayName} />
      </div>
      <div className="w-5/6 px-10 pt-10">
        <Outlet />
      </div>
    </div>
  );
}
