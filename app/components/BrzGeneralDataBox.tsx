import { BrzGeneralDataBoxItem } from "~/types/brzTypes";

interface Props {
  data: BrzGeneralDataBoxItem;
  type: string;
  state: string;
}
export default function BrzGeneralDataBox({ state, type, data }: Props) {
  const { generalData } = data;

  const mapTextToItem: BrzGeneralDataBoxItem = {
    vorname: "Vorname",
    nachname: "Nachname",
    geburtsdatum: "Geburtsdatum",
    svnr: "Svnr",
    geschlecht: "Geschlecht",
    staatsbuergerschaft: "Staat",
  };

  return (
    <>
      <h2 className="text-xl text-slate-600 mt-6 mb-2 ml-2">BRZ Stammdaten</h2>
      <div className="px-6 py-5 bg-white shadow overflow-hidden rounded-lg text-sm">
        {state === "submitting" && (
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
          <ul className="text-slate-500 text-sm ">
            {Object.keys(generalData).map((dataItem, idx) => {
              return (
                <li
                  key={`${idx}-${dataItem}`}
                  className="grid grid-cols-4 py-1"
                >
                  <div className="mr-2 text-slate-600 font-medium">{`${mapTextToItem[dataItem]}:`}</div>
                  {`${dataItem}._text`}
                </li>
              );
            })}
          </ul>
        )}
        {state === "idle" && type !== "done" && (
          <div className="text-slate-600">
            Ergebnisse werden nach abrufen der Daten angezeigt.
          </div>
        )}
      </div>
    </>
  );
}
