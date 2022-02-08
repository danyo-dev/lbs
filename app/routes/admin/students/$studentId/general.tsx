import { useCatch, useFetcher, useMatches, useParams } from "remix";
import BrzGeneralDataBox from "~/components/BrzGeneralDataBox";

import BrzGetStammdatenForm from "~/components/BrzGetStammdatenForm";
import { StudentProfile } from "~/types/responseTypes";

export default function StudentGeneralRoute() {
  const fetcherData = useFetcher();

  const { state, type, data, Form } = fetcherData;

  const params = useParams();
  const studentData = useMatches().find(
    (m) => m.pathname === "/admin/students"
  )?.data;

  const student = studentData?.find(
    (student: StudentProfile) => student.id === params.studentId
  );

  return (
    <div className="w-full my-12 grid grid-cols-12 gap-6">
      <section className=" border-slate-200 col-span-6">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">
          BRZ Stammdaten Abfragen
        </h2>
        <BrzGetStammdatenForm Form={Form} state={state} student={student} />
      </section>

      <section className="border-slate-200 col-span-6 ">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">BRZ Stammdaten</h2>
        <BrzGeneralDataBox data={data} type={type} />
      </section>
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
  const parseData = JSON.parse(caught.data);
  const errors = parseData.FehlerAntwort?.fehlerliste?.fehler;

  const isMultipleErrors = Array.isArray(errors);

  return (
    <div className="error-container">
      <div className="text-2xl font-bold mb-2">
        Error: Status {caught.status}
      </div>
      {isMultipleErrors ? (
        errors.map((e) => {
          console.log(e);
          return <div className="text-slate-700 ">{e.fehlertext._text}</div>;
        })
      ) : (
        <div>{errors.fehlertext._text}</div>
      )}
    </div>
  );
}
