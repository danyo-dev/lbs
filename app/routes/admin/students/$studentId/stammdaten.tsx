import { useCatch, useFetcher, useMatches, useParams } from "remix";
import BrzStammdatenBox from "~/components/BrzStammdatenBox";
import BrzGetStammdatenForm from "~/components/BrzGetStammdatenForm";
import UpdateStammdatenForm from "~/components/UpdateStammdatenForm";
import { BrzGeneralDataBoxItem } from "~/types/brzTypes";

export default function StudentGeneralRoute() {
  const fetcherData = useFetcher<BrzGeneralDataBoxItem>();
  const { state, type, data, Form } = fetcherData;

  const params = useParams();

  const studentData = useMatches().find(
    (m) => m.pathname === `/admin/students/${params.studentId}`
  )?.data;

  console.log(studentData);

  return (
    <div className="w-full my-12 grid grid-areas-overview grid-cols-2 gap-8">
      <section className=" border-slate-200">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">
          BRZ Stammdaten Abfragen
        </h2>
        <BrzGetStammdatenForm
          FetcherForm={Form}
          isSubmitting={state === "submitting"}
        />
      </section>

      <section className="border-slate-200 mt-4">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">BRZ Stammdaten</h2>
        <BrzStammdatenBox data={data} type={type} />
      </section>

      <section className="border-slate-200 grid-in-form">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">Stammdaten Melden</h2>
        <UpdateStammdatenForm data={studentData} />
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
