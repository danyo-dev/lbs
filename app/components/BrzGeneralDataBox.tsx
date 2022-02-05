import { BrzGeneralData } from "~/types/brzTypes";
import { Fetcher } from "~/types/generalTypes";

export default function BrzGeneralDataBox({
  type,
  data,
}: Fetcher<BrzGeneralData>) {
  return (
    <>
      <h2 className="text-xl text-slate-600 mt-6 mb-2 ml-2">BRZ Stammdaten</h2>
      <div className="px-6 py-5 bg-white shadow overflow-hidden rounded-lg text-sm">
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
        {type === "done" && (
          <>
            {data.matrikelStatusCode !== 1 ? (
              <ul className="text-slate-500 text-sm ">
                {Object.entries(data.generalData).map(([key, value]) => {
                  return (
                    <li key={`${key}`} className="grid grid-cols-4 py-1">
                      <div className="mr-2 text-slate-600 font-medium">{`${key}:`}</div>
                      {value._text}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p>Keine Stammdaten gefunden</p>
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
