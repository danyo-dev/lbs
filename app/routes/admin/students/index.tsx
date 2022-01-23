import { useState } from "react";
import { Link, useLoaderData, useMatches } from "remix";
import SearchBar from "~/components/SearchBar";

// simulating API Student data to intgrate search fuction -> needs to be adjusted when actual data is received
export default function StudentsIndex() {
  const data = useMatches().find((m) => m.pathname === "/admin/students")?.data;

  const [filterBy, setFilterBy] = useState("");

  const filteredStudents = data?.filter((entry: any) => {
    return filterBy
      ? entry.name.toLowerCase().startsWith(filterBy.toLowerCase())
      : data;
  });

  return (
    <>
      <h1 className="text-2xl font-extrabold text-slate-800 mb-6">Students</h1>
      <SearchBar setFilterBy={setFilterBy} />

      <div className="align-middle">
        <div className=" overflow-hidden border border-slate-200 rounded-lg">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Semester
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Payment Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                >
                  Student Number
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredStudents.map((person, idx) => (
                <tr key={`${person.email}-${idx}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={person.image}
                          alt="image"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">
                          {person.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {person.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{person.title}</div>
                    <div className="text-sm text-slate-500">
                      {person.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {person.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={person.id}
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
