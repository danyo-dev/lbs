import { Form, json, LoaderFunction, useMatches, useParams } from "remix";
import MatrikelBox from "~/components/MatrikelBox";
import { requestBrzMatrikelNumber } from "~/services/brzService";

export const loader: LoaderFunction = async ({ request }) => {
  // get Student Data needed for matrikelNumber

  // get MatrikelNumber infos
  // TODO: fetch student data and pass as param
  const matrikelData = await requestBrzMatrikelNumber(request);
  const parseData = JSON.parse(matrikelData);

  // Extract data needed by Client
  const matrikelStatusCode = parseInt(
    parseData.matrikelpruefungantwort.matrikelpruefergebnis.statuscode._text
  );
  const matrikelNummer =
    parseData.matrikelpruefungantwort.matrikelpruefergebnis.matrikelliste
      .extendedstudierendenkey?.matrikelnummer._text;

  return json({ matrikelStatusCode, matrikelNummer });
};

export default function StudentGeneralRoute() {
  const data = useMatches().find((m) => m.pathname === "/admin/students")?.data;
  const params = useParams();

  const pathName = useMatches().find(
    (m) => m.pathname === "/admin/students"
  )?.pathname;

  const student = data?.find((student) => student.id === params.studentId);
  return (
    <div>
      <div className="bg-white py-6 px-6 my-6 shadow border-slate-200 rounded-lg w-1/2 text-sm text-slate-500">
        <MatrikelBox />
      </div>
      <div className="w-full grid grid-cols-2">
        <section className="shadow overflow-hidden rounded-lg border-slate-200 gap-6">
          <Form action="#" method="post">
            <div className="px-6 py-5 bg-white col-span-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-slate-600"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    defaultValue={student.name}
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                  />
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    defaultValue={student.name}
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autoComplete="email"
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-slate-600"
                  >
                    Street address
                  </label>
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autoComplete="street-address"
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-2 ">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-slate-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autoComplete="address-level2"
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-slate-600"
                  >
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autoComplete="address-level1"
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-slate-600"
                  >
                    ZIP / Postal code
                  </label>
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Save
              </button>
            </div>
          </Form>
        </section>
      </div>
    </div>
  );
}
