import { Form } from "remix";
import { BrzMatrikelStudent } from "~/types/brzTypes";
import { Fetcher } from "~/types/generalTypes";

export default function BrzMatrikelDataBox({
  type,
  data,
}: Fetcher<BrzMatrikelStudent>) {
  return (
    <>
      <h2 className="text-xl text-slate-600 my-2 ml-2">BRZ Matrikeldaten</h2>
      <div className="bg-white py-6 px-6 shadow border-slate-200 rounded-lg text-sm ">
        <>
          {type === "loaderSubmission" && (
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
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </>
        {type === "done" && (
          <>
            {data.matrikelStatusCode === 1 ? (
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
                    {data.matrikelStudentData.matrikelnummer._text}
                  </div>
                </div>
                <div>
                  <p className="text-slate-500">Semester</p>
                  <div className="block text-2xl font-medium text-sky-600">
                    {data.matrikelStudentData.semester._text}
                  </div>
                </div>
                <div>
                  <p className="text-slate-500">Bildungseinrichtung</p>
                  <div className="block text-2xl font-medium text-sky-600">
                    {data.matrikelStudentData.be._text}
                  </div>
                </div>
                <div>
                  <p className="text-slate-500">Matrikelstatus</p>
                  <div className="block text-2xl font-medium text-sky-600">
                    {data.matrikelStudentData.matrikelstatus._text}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {type === "init" && (
          <div className="text-slate-600">
            Ergebnisse werden nach abrufen der Daten angezeigt.
          </div>
        )}
      </div>
    </>
  );
}
