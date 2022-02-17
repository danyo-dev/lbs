import { useCatch, useFetcher } from "remix";
import BrzStammdatenBox from "~/components/BrzStammdatenBox";
import BrzGetStammdatenForm from "~/components/BrzGetStammdatenForm";
import { BrzGeneralDataBoxItem } from "~/types/brzTypes";

export default function StudentGeneralRoute() {
  const fetcherData = useFetcher<BrzGeneralDataBoxItem>();

  const { state, type, data, Form } = fetcherData;

  return (
    <div className="w-full my-12 grid grid-cols-12">
      <section className=" border-slate-200 grid grid-cols-12 col-span-12">
        <div className=" border-slate-200 col-span-6">
          <h2 className="text-xl text-slate-600 mb-2 ml-2">
            BRZ Stammdaten Abfragen
          </h2>
          <BrzGetStammdatenForm
            Form={Form}
            isSubmitting={state === "submitting"}
          />
        </div>
      </section>

      <section className="border-slate-200 col-span-6 mt-4">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">BRZ Stammdaten</h2>
        <BrzStammdatenBox data={data} type={type} />
      </section>
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
  const parseData = JSON.parse(caught.data);

  const errors: { fehlertext: { _text: string } } =
    parseData.FehlerAntwort?.fehlerliste?.fehler;

  return (
    <div className="error-container">
      <div className="text-2xl font-bold mb-2">
        Error: Status {caught.status}
      </div>
      <div>{errors.fehlertext._text}</div>
    </div>
  );
}
