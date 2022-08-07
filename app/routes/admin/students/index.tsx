import { useState } from "react";
import { useMatches } from "@remix-run/react";
import PendingLink from "~/components/PendingLink";
import SearchBar from "~/components/SearchBar";
import { StudentProfileList } from "~/types/StudentTypes";

export default function StudentsIndex() {
  const studentProfiles = useMatches().find((m) => m.pathname === "/admin/students")?.data;
  const [filterBy, setFilterBy] = useState("");

  // only filter when filterBy is set
  const students: StudentProfileList[] = filterBy
    ? studentProfiles?.filter(({ vorname, name, email }: StudentProfileList) =>
        // other search options can be added here
        [vorname, name, email].some((entry) => entry?.toLowerCase().includes(filterBy.toLowerCase()))
      )
    : studentProfiles;

  return (
    <>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">{students?.length} Students</h1>
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
                  Semester
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {students.map((student: StudentProfileList) => (
                <tr key={Number(student?.id)}>
                  <td className="tableCell">
                    <p className="tableContent text-slate-900">{student.id}</p>
                  </td>
                  <td className="tableCell">
                    <p className="tableContent text-slate-900">
                      {student.titel} {student.vorname} {student.name}
                    </p>
                  </td>
                  <td className="tableCell">
                    <p className="text-sm text-slate-500">{student.email}</p>
                  </td>

                  <td className="tableCell text-right text-sm font-medium">
                    <PendingLink
                      to={`/admin/${student.id}/matrikeldaten`}
                      className={({ isActive }: { isActive: boolean }) =>
                        `inline-flex w-full text-sm font-medium transition-colors duration-150 hover:text-slate-800 px-3 py-3 ${
                          isActive && "bg-slate-100 rounded-lg text-slate-800 "
                        }`
                      }
                    >
                      Edit
                    </PendingLink>
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
