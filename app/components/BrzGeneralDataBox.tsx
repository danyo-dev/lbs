import { BrzGeneralDataBoxItem } from "~/types/brzTypes";
import { Fetcher } from "~/types/generalTypes";
import { LbsLoader } from "~/components/shared/LbsLoader";

export default function BrzGeneralDataBox({
  data,
  type,
}: Fetcher<BrzGeneralDataBoxItem>) {
  function NoDataFound() {
    return (
      <div className="flex justify-between items-center">
        <p>Keine Daten vorhanden</p>
      </div>
    );
  }

  return (
    <LbsLoader
      type={type}
      hasData={Boolean(data)}
      noDataFound={<NoDataFound />}
    >
      <ul className="text-slate-500 text-sm ">
        {data &&
          Object.entries(data).map(([key, value]) => {
            return (
              <li key={`${key}`} className="grid grid-cols-3 py-1 px-5">
                <div className="mr-2 text-slate-600 font-medium capitalize">{`${key}:`}</div>
                <div className="px-2">{value._text}</div>
              </li>
            );
          })}
      </ul>
    </LbsLoader>
  );
}
