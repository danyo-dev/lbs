import { LogoutIcon, BellIcon } from "@heroicons/react/outline";
import { Form, LoaderFunction, Outlet, useLoaderData } from "remix";
import type { Auth0Profile } from "remix-auth-auth0";
import Sidebar from "~/components/Sidebar";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, { failureRedirect: "/" });
};

export default function Admin() {
  const { displayName } = useLoaderData<Auth0Profile>();

  return (
    <div className="flex bg-slate-100">
      <div className="w-1/6 h-screen overflow-y-auto bg-white p-6 shadow-lg z-10">
        <Sidebar />
      </div>
      <div className="w-5/6">
        <div className=" px-10 h-20 flex items-center justify-between bg-white shadow-md">
          <p className=" text-slate-800 text-md">Hi, {displayName}</p>
          <div className="flex ">
            <BellIcon className="h-5 w-5 text-slate-800 mr-6" />
            <Form action="/auth/logout" method="post">
              <button>
                <LogoutIcon className="h-5 w-5 text-slate-800" />
              </button>
            </Form>
          </div>
        </div>
        <div className="pt-10 px-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
