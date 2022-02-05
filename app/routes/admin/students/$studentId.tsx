import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Link, NavLink, Outlet, useMatches, useParams } from "remix";
import { studentDetailRoutes } from "~/config/routes";
import { StudentProfile } from "~/types/responseTypes";

export default function EditStudent() {
  const params = useParams();
  const data = useMatches().find((m) => m.pathname === "/admin/students")?.data;

  const student = data?.find(
    (student: StudentProfile) => student.id === params.studentId
  );

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
                  isActive ? "activeLink" : "inactiveLink "
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
