import { Form, json, Link, LoaderFunction, useMatches, useParams } from "remix";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { requestBrzMatrikelNumber } from "~/services/brzService";
import MatrikelBox from "~/components/MatrikelBox";

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

export default function EditStudent() {
  const data = useMatches().find((m) => m.pathname === "/admin/students")?.data;
  const params = useParams();

  const pathName = useMatches().find(
    (m) => m.pathname === "/admin/students"
  )?.pathname;

  const student = data?.find((student) => student.id === params.id);

  return (
    <>
      <div className="flex items-center mb-6">
        <Link to="/admin/students">
          <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
        </Link>

        <h1 className="text-2xl font-extrabold text-slate-800 ml-10 ">
          Details zu Student
        </h1>
      </div>
      <MatrikelBox />

      <form action="#" method="POST">
        <div className="shadow overflow-hidden rounded-lg border-slate-200 w-1/3">
          <div className="px-6 py-5 bg-white ">
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      <Form action="/auth/brzRefresh" method="post">
        <input type="hidden" name="origin" value={pathName} />
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Refresh Token
        </button>
      </Form>
    </>
  );
}
