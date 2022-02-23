import { BrzStudienDaten } from "~/types/brzTypes";
import { Fetcher } from "~/types/generalTypes";
import { LbsLoader } from "~/components/shared/LbsLoader";

export default function BrzStudiendatenBox({
  data,
  type,
}: Fetcher<BrzStudienDaten>) {
  return (
    <LbsLoader type={type} hasData={Boolean(data)}>
      <ul className="text-slate-500 text-sm list ">
        {data &&
          Object.entries(data).map(([key, value]) => {
            if (key === "zugangsberechtigung") {
              return (
                <li key={`${key}`} className="grid grid-cols-2 py-1 px-5">
                  <div className="mr-2 text-slate-600 font-medium capitalize">{`${key}:`}</div>
                  <ul className="ml-2">
                    <li>{`Voraussetzung: ${value.voraussetzung._text}`}</li>
                    <li>{`Datum: ${value.datum._text}`}</li>
                    <li>{`Staat: ${value.staat._text}`}</li>
                  </ul>
                </li>
              );
            }

            return (
              <li key={`${key}`} className="grid grid-cols-2 py-1 px-5">
                <div className="mr-2 text-slate-600 font-medium capitalize">{`${key}:`}</div>
                <div className="px-2">{value._text}</div>
              </li>
            );
          })}
      </ul>
    </LbsLoader>
  );
}
