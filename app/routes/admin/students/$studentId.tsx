import { ArrowLeftIcon } from "@heroicons/react/outline"
import {
  json,
  Link,
  LoaderFunction,
  NavLink,
  Outlet,
  useLoaderData,
} from "remix"
import { studentDetailRoutes } from "~/config/routes"
import { getAddresses, getCountry, getProfile } from "~/services/db.server"
import {
  AC5_StammDatenProfile,
  BRZ_StammDatenProfile,
} from "~/types/StudentTypes"

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.studentId) {
    throw new Response("no student ID has been set")
  }
  const studentProfileData = await getProfile(params.studentId)
  const countryData = await getCountry(Number(studentProfileData?.land))
  const citizenship = await getCountry(
    Number(studentProfileData?.staatsangehoerigkeit)
  )
  const addresses = await getAddresses(params.studentId)

  const mapStudentprofile = {
    ...studentProfileData,
    land: countryData?.bis_code,
    staatsangehoerigkeit: citizenship?.bis_code,
    addresses: addresses,
  }

  console.log(mapStudentprofile)
  if (!studentProfileData) {
    throw new Response("No profile corresponding with given ID found")
  }
  return json(mapStudentprofile)
}

export default function EditStudent() {
  const data = useLoaderData<BRZ_StammDatenProfile>()
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
  )
}
