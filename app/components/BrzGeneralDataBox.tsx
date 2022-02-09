import { BrzGeneralData } from "~/types/brzTypes";
import { Fetcher } from "~/types/generalTypes";
import { LoadingScreen } from '~/components/shared/LoadingScreen';

export default function BrzGeneralDataBox({
  data,
  type,
}: Fetcher<BrzGeneralData>) {
  return (
    <LoadingScreen type={type} hasData={Boolean(data.generalData)}>
      <ul className="text-slate-500 text-sm ">
        {Object.entries(data.generalData).map(([key, value]) => {
          return (
            <li key={`${key}`} className="grid grid-cols-3 py-1 px-5">
              <div className="mr-2 text-slate-600 font-medium capitalize">{`${key}:`}</div>
              <div className="px-2">{value._text}</div>
            </li>
          );
        })}
      </ul>
    </LoadingScreen>
  );
};
