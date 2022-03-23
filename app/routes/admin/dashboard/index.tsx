import { NavLink } from "remix";

export default function DashboardIndexRoute() {
  return (
    <>
      <section>
        <h2 className="text-3xl font-bold text-slate-900 mb-6">BRZ Abfragen</h2>
        <ul className="grid grid-cols-3 gap-8">
          <li>
            <NavLink
              to="matrikel"
              className="h-40 bg-white flex flex-col justify-center items-center rounded-lg px-2 text-xl shadow hover:shadow-md "
            >
              <h3 className="text-xl font-bold text-slate-600 mb-2">
                Matrikel
              </h3>
              <div className="text-sm text-slate-400">
                Matrikelabfrage vom BRZ DV vornehmen
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="stammdaten"
              className=" h-40 bg-white flex flex-col justify-center items-center rounded-lg text-xl shadow hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-slate-600 mb-2">
                Stammdaten
              </h3>
              <div className="text-sm text-slate-400">
                Stammdatenabfrage vom BRZ DV vornehmen
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="studiendaten"
              className=" h-40 bg-white flex flex-col justify-center items-center rounded-lg text-xl shadow hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-slate-600 mb-2">
                Studiendaten
              </h3>
              <div className="text-sm text-slate-400">
                Studiendatenabfrage vom BRZ DV vornehmen
              </div>
            </NavLink>
          </li>
        </ul>
      </section>
    </>
  );
}
