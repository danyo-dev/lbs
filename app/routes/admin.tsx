import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { LogoutIcon } from "@heroicons/react/outline";
import { Form, Outlet, useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import type { Auth0Profile } from "remix-auth-auth0";
import Sidebar from "~/components/Sidebar";
import { requireAuthentication } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await requireAuthentication(request);
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
          <div>
            <p className=" text-slate-700">Willkommen {displayName}</p>
          </div>
          <div className="inset-y-0 right-0 flex items-center static inset-auto ml-6 pr-0">
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex text-sm rounded-full focus:outline-none ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-700 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right px-3  absolute right-0 mt-2 w-48 rounded-md shadow-lg py-4 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    <div className="block px-2 py-2 text-sm text-slate-300 hover:bg-slate-100 hover:rounded-lg hover:text-slate-800">
                      Profile
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="block px-2 py-2 text-sm text-slate-300 hover:bg-slate-100 hover:rounded-lg hover:text-slate-800">
                      Settings
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <Form
                      action="/auth/logout"
                      method="post"
                      className="w-full px-2 py-2 text-sm text-slate-700 flex hover:bg-slate-100 hover:rounded-lg hover:text-slate-800"
                    >
                      <button
                        type="submit"
                        className="flex justify-between w-full"
                      >
                        <div>Logout</div>
                        <LogoutIcon className="h-5 w-5" />
                      </button>
                    </Form>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
        <div className="pt-10 px-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
