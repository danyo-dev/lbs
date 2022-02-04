import { NavLink, useTransition } from "remix";
import { routes } from "~/config/routes";
import logo from "~/assets/logo.svg";
import PendingLink from "./PendingLink";

export default function Sidebar() {
  let transition = useTransition();
  console.log(transition);
  return (
    <aside>
      <div className="pb-4 flex flex-col">
        <img className="w-40 rounded-lg" src={logo} />
      </div>

      <ul className="text-slate-600 ">
        {routes.map((route, idx) => (
          <li className="relative" key={idx}>
            <PendingLink
              to={route.path}
              className={({ isActive }: { isActive: boolean }) =>
                `inline-flex w-full text-sm font-medium transition-colors duration-150 hover:text-slate-800 px-3 py-3 ${
                  isActive && "bg-slate-100 rounded-lg text-slate-800 "
                }`
              }
            >
              <route.icon className="h-5 w-5" />
              <span className="mx-4">{route.name}</span>
            </PendingLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
