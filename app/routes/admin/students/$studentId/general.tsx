import { Form, useCatch, useFetcher } from "remix";
import BrzStammDatenBox from "~/components/BrzStammDatenBox";

export default function StudentGeneralRoute() {
  const brzDataFetcher = useFetcher();
  // TODO: clean up components and reduce code in file
  return (
    <div className="w-3/4 my-12">
      <section className=" border-slate-200 gap-6 ">
        <h2 className="text-xl text-slate-600 my-2 ml-2">Academy 5 Daten</h2>
        <brzDataFetcher.Form
          method="get"
          action={`/admin/api/brz/general`}
          className=" bg-white col-span-6 shadow overflow-hidden rounded-lg"
        >
          <div className="px-6 py-5 bg-white col-span-6 shadow overflow-hidden ">
            <div className="grid grid-cols-8 gap-6">
              <div className="col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-slate-600"
                >
                  Vorname
                </label>
                <input
                  type="text"
                  name="first-name"
                  defaultValue="Anna"
                  id="first-name"
                  autoComplete="given-name"
                  className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-slate-600"
                >
                  Nachname
                </label>
                <input
                  type="text"
                  name="last-name"
                  defaultValue="Burtakova"
                  id="last-name"
                  autoComplete="family-name"
                  className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-slate-600"
                >
                  Geburtsdatum
                </label>
                <input
                  type="text"
                  name="birthdate"
                  defaultValue="1995-07-03"
                  id="email-address"
                  autoComplete="email"
                  className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-slate-600"
                >
                  Svnr:
                </label>
                <input
                  type="text"
                  name="svnr"
                  id="svnr"
                  className="mt-1 focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-slate-50 text-right">
            <button
              disabled={brzDataFetcher.state === "submitting" ? true : false}
              type="submit"
              className="disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              BRZ Stammdaten Abfragen
            </button>
          </div>
        </brzDataFetcher.Form>
      </section>

      <section className="border-slate-200 gap-6 mt-6">
        <h2 className="text-xl text-slate-600 my-2 ml-2">BRZ Matrikeldaten</h2>
        <div className="bg-white py-6 px-6 shadow border-slate-200 rounded-lg text-sm ">
          <>
            {brzDataFetcher.state === "submitting" && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </>
          {brzDataFetcher.type === "done" && (
            <>
              {brzDataFetcher.data.matrikelStatusCode === 1 ? (
                <div className="flex justify-between items-center">
                  <p>Keine Matrikelnummer gefunden</p>
                  <Form method="post">
                    <button
                      type="submit"
                      className=" justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Reservieren
                    </button>
                  </Form>
                </div>
              ) : (
                <div className="grid grid-cols-4">
                  <div>
                    <p className="text-slate-500">Matrikelnummer</p>
                    <div className="block text-2xl font-medium text-sky-600">
                      {
                        brzDataFetcher.data.matrikelStudentData.matrikelnummer
                          ._text
                      }
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500">Semester</p>
                    <div className="block text-2xl font-medium text-sky-600">
                      {brzDataFetcher.data.matrikelStudentData.semester._text}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500">Bildungseinrichtung</p>
                    <div className="block text-2xl font-medium text-sky-600">
                      {brzDataFetcher.data.matrikelStudentData.be._text}
                    </div>
                  </div>
                  <div>
                    <p className="text-slate-500">Matrikelstatus</p>
                    <div className="block text-2xl font-medium text-sky-600">
                      {
                        brzDataFetcher.data.matrikelStudentData.matrikelstatus
                          ._text
                      }
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {brzDataFetcher.state === "idle" &&
            brzDataFetcher.type !== "done" && (
              <div className="text-slate-600">
                Ergebnisse werden nach abrufen der Daten angezeigt.
              </div>
            )}
        </div>
        <h2 className="text-xl text-slate-600 mt-6 mb-2 ml-2">
          BRZ Stammdaten
        </h2>
        <div className="px-6 py-5 bg-white shadow overflow-hidden rounded-lg text-sm">
          <>
            {brzDataFetcher.state === "submitting" && (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </>

          {brzDataFetcher.type === "done" && (
            <BrzStammDatenBox stammDaten={brzDataFetcher.data.stammDaten} />
          )}
          {brzDataFetcher.state === "idle" &&
            brzDataFetcher.type !== "done" && (
              <div className="text-slate-600">
                Bitte BRZ Abfrage betätigen um Ergebnisse anzuzeigen!
              </div>
            )}
        </div>
      </section>
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
  const parseData = JSON.parse(caught.data);

  const errorMsg =
    parseData.FehlerAntwort?.fehlerliste?.fehler?.massnahme?._text;

  return (
    <div className="error-container">
      <div className="text-2xl font-bold mb-2">
        Error: Status {caught.status}
      </div>
      <div className="text-slate-700 ">{errorMsg}</div>
    </div>
  );
}
