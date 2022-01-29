import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Link, NavLink, Outlet, useMatches, useParams } from "remix";
import { studentDetailRoutes } from "~/config/routes";

export default function EditStudent() {
  const params = useParams();
  const data = useMatches().find((m) => m.pathname === "/admin/students")?.data;

  // Demo Data -> will use Academy 5 data in future
  const student = data?.find((student: any) => student.id === params.studentId);

  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex items-center mr-6">
          <Link to="/admin/students">
            <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
          </Link>
        </div>

        <ul className="text-slate-600 flex ">
          {studentDetailRoutes.map((route, idx) => (
            <li key={idx} className="mr-2">
              <NavLink
                to={`/admin/students/${student.id}/${route.path}`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-sky-600 inline-flex w-full rounded-lg text-sm font-medium transition-colors duration-150 px-6 py-2 text-white shadow"
                    : "inline-flex w-full rounded-lg text-sm font-medium transition-colors duration-150 px-6 py-2 text-slate-600 hover:text-white hover:bg-sky-600 "
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
}
