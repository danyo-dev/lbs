import { ArrowLeftIcon } from "@heroicons/react/outline";
import {
  json,
  Link,
  LoaderFunction,
  NavLink,
  Outlet,
  useLoaderData,
} from "remix";
import { studentDetailRoutes } from "~/config/routes";
import { StudentProfile } from "~/types/responseTypes";
import { getProfile } from "~/services/db.server";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.studentId) {
    throw new Response("no student ID has been set");
  }
  const studentProfile = await getProfile(params.studentId);
  if (!studentProfile) {
    throw new Response("No profile corresponding with given ID found");
  }
  return json(studentProfile);
};

export default function EditStudent() {
  const data = useLoaderData<StudentProfile>();
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
                to={`/admin/students/${data.id}/${route.path}`}
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
