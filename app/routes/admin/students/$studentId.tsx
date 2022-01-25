import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Link, NavLink, Outlet, useMatches, useParams } from "remix";
import { studentDetailRoutes } from "~/config/routes";

export default function EditStudent() {
  const data = useMatches().find((m) => m.pathname === "/admin/students")?.data;
  const params = useParams();

  const pathName = useMatches().find(
    (m) => m.pathname === "/admin/students"
  )?.pathname;

  const student = data?.find((student) => student.id === params.studentId);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/admin/students">
            <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
          </Link>

          <h1 className=" font-extrabold text-slate-800 ml-10 ">
            Details zu {student.name}
          </h1>
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
