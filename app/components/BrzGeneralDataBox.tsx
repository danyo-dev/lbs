import { BrzGeneralData } from "~/types/brzTypes";
import { Fetcher } from "~/types/generalTypes";

export default function BrzGeneralDataBox({ data }: Fetcher<BrzGeneralData>) {
  return (
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
  );
}
