import { useFetcher, useParams, useMatches, useCatch } from "remix";
import BrzGetMatrikelForm from "~/components/BrzGetMatrikelForm";
import BrzMatrikelDataBox from "~/components/BrzMatrikelDataBox";
import { BrzMatrikelStudent } from "~/types/brzTypes";

export default function StudentMatrikelDataRoute() {
  const fetcherData = useFetcher<BrzMatrikelStudent>();
  const { state, type, data, Form } = fetcherData;

  const params = useParams();

  const studentData = useMatches().find(
    (m) => m.pathname === `/admin/students/${params.studentId}`
  )?.data;

  return (
    <div className="w-full my-12 grid grid-cols-12 gap-6">
      <section className=" border-slate-200 col-span-6">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">
          BRZ Matrikeldaten Abfragen
        </h2>
        <BrzGetMatrikelForm Form={Form} state={state} student={studentData} />
      </section>

      <section className="border-slate-200 gap-6 col-span-6">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">BRZ Matrikeldaten</h2>
        <BrzMatrikelDataBox data={data} type={type} />
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
