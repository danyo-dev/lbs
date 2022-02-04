import { useCatch, useFetcher } from "remix";
import BrzGeneralDataBox from "~/components/BrzGeneralDataBox";
import BrzGeneralDataForm from "~/components/BrzGeneralDataForm";
import BrzMatrikelDataBox from "~/components/BrzMatrikelDataBox";

export default function StudentGeneralRoute() {
  const fetcherData = useFetcher();

  const { state, type, data, Form } = fetcherData;

  return (
    <div className="w-3/4 my-12">
      <section className=" border-slate-200 gap-6 ">
        <h2 className="text-xl text-slate-600 my-2 ml-2">Academy 5 Daten</h2>
        <BrzGeneralDataForm Form={Form} state={state} />
      </section>

      <section className="border-slate-200 gap-6 mt-6">
        <BrzMatrikelDataBox state={state} type={type} data={data} />
        <BrzGeneralDataBox state={state} type={type} data={data} />
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
