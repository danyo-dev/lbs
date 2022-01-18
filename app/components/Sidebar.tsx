import { NavLink } from "remix";
import { routes } from "~/config/routes";
import logo from "~/assets/logo.svg";

export default function Sidebar() {
  return (
    <aside>
      <div className="pb-4 flex flex-col">
        <img className="w-40 rounded-lg" src={logo} />
      </div>

      <ul className="text-slate-600 ">
        {routes.map((route, idx) => (
          <li className="relative" key={idx}>
            <NavLink
              to={route.path}
              className={({ isActive }) =>
                `inline-flex w-full text-sm font-medium transition-colors duration-150 hover:text-slate-800 px-3 py-3 ${
                  isActive && "bg-slate-100 rounded-lg text-slate-800 "
                }`
              }
            >
              <route.icon className="h-5 w-5" />
              <span className="ml-4">{route.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
