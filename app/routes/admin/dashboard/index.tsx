import { NavLink } from "remix";

export default function DashboardIndexRoute() {
  return (
    <>
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">BRZ Abfragen</h2>
        <ul className="grid grid-cols-3 gap-8">
          <li>
            <NavLink
              to="matrikel"
              className="h-40 bg-white flex justify-center items-center rounded-lg px-2 text-xl hover:shadow "
            >
              Matrikel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="stammdaten"
              className=" h-40 bg-white flex justify-center items-center rounded-lg text-xl hover:shadow"
            >
              Stammdaten
            </NavLink>
          </li>
          <li>
            <NavLink
              to="studiendaten"
              className=" h-40 bg-white flex justify-center items-center rounded-lg text-xl hover:shadow"
            >
              Studiendaten
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
}
