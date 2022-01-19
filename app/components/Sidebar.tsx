import { Form, NavLink } from "remix";
import { LogoutIcon } from "@heroicons/react/outline";
import { routes } from "~/config/routes";

export default function Sidebar({ displayName }: { displayName: string }) {
  return (
    <aside className="border flex-none overflow-y-auto bg-slate-50 lg:block ">
      <div className="pb-4 h-screen flex flex-col">
        <div className="relative px-6 py-6 bg-slate-100 ">
          <p className="text-xs text-slate-500">Welcome</p>
          <p className=" font-semibold text-slate-600">{displayName}</p>
        </div>

        <ul className="mt-6 text-slate-500 ">
          {routes.map((route, idx) => (
            <li className="relative px-6 py-3" key={idx}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                    isActive &&
                    "text-gray-800 before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-blue-500 before:rounded-tr-lg before:rounded-br-lg"
                  }`
                }
              >
                <route.icon className="h-5 w-5" />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto mb-10 px-6">
          <Form action="/auth/logout" method="post">
            <button>
              <LogoutIcon className="h-5 w-5 text-slate-500" />
            </button>
          </Form>
        </div>
      </div>
    </aside>
  );
}
