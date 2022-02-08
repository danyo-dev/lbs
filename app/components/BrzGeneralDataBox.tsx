import { BrzGeneralData } from "~/types/brzTypes";
import { Fetcher } from "~/types/generalTypes";
import LoadingIcon from "./shared/LoadingIcon";

export default function BrzGeneralDataBox({
  data,
  type,
}: Fetcher<BrzGeneralData>) {
  return (
    <div className="bg-white py-6 px-6 shadow border-slate-200 rounded-lg text-sm ">
      {type === "init" && (
        <div className="text-slate-600">
          Ergebnisse werden nach überprüfung der Daten geladen.
        </div>
      )}
      {type === "loaderSubmission" && <LoadingIcon />}
      {type === "done" && data.generalData && (
        <ul className="text-slate-500 text-sm ">
          {Object.entries(data.generalData).map(([key, value]) => {
            return (
              <li key={`${key}`} className="grid grid-cols-3 py-1 px-5">
                <div className="mr-2 text-slate-600 font-medium">{`${key}:`}</div>
                <div className="px-2">{value._text}</div>
              </li>
            );
          })}
        </ul>
      )}
      {type === "done" && !data.generalData && (
        <div>Keine Stammdaten Gefunden</div>
      )}
    </div>
  );
}
