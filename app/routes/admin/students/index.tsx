import { useState } from "react";
import { Link, LoaderFunction, useMatches } from "remix";
import SearchBar from "~/components/SearchBar";
import { getStudentProfiles } from "~/services/academy5Service";
import type { StudentProfile } from "~/types/responseTypes";

export const loader: LoaderFunction = async () => {
  const studentProfiles = await getStudentProfiles();

  return studentProfiles;
};

// simulating API Student data to intgrate search fuction -> needs to be adjusted when actual data is received

export default function StudentsIndex() {
  const studentProfiles = useMatches().find(
    (m) => m.pathname === "/admin/students"
  )?.data;
  const [filterBy, setFilterBy] = useState("");

  // only filter when filterBy is set
  const students = filterBy
    ? studentProfiles?.filter(
        ({ firstname, lastname, email }: StudentProfile) =>
          // other search options can be added here
          [firstname, lastname, email].some((entry) =>
            entry.toLowerCase().includes(filterBy.toLowerCase())
          )
      )
    : studentProfiles;

  return (
    <>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Students</h1>
      <SearchBar setFilterBy={setFilterBy} />

      <div className="align-middle">
        <div className=" overflow-hidden border border-slate-200 rounded-lg">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th scope="col" className="tableHeader">
                  Student ID
                </th>
                <th scope="col" className="tableHeader">
                  Name
                </th>
                <th scope="col" className="tableHeader">
                  eMail
                </th>
                <th scope="col" className="tableHeader">
                  Semester
                </th>
                <th scope="col" className="tableHeader">
                  Payment Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {students.map((student: StudentProfile) => (
                <tr key={student?.id}>
                  <td className="tableCell">
                    <p className="tableContent text-slate-900">{student.id}</p>
                  </td>
                  <td className="tableCell">
                    <p className="tableContent text-slate-900">
                      {student.title} {student.firstname} {student.lastname}
                    </p>
                  </td>
                  <td className="tableCell">
                    <p className="text-sm text-slate-500">{student.email}</p>
                  </td>
                  <td className="tableCell">
                    <p className="text-sm text-slate-500 text-center">-</p>
                  </td>
                  <td className="tableCell">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="tableCell text-right text-sm font-medium">
                    <Link
                      to={`${student.id}/matrikel`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
