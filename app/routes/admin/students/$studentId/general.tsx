import { useCatch, useFetcher, useMatches, useParams } from "remix";
import BrzGeneralDataBox from "~/components/BrzGeneralDataBox";
import BrzGeneralDataForm from "~/components/BrzGeneralDataForm";
import { withFetcherLoader } from "~/components/hoc/withFetcherLoader";
import { StudentProfile } from "~/types/responseTypes";

export default function StudentGeneralRoute() {
  const fetcherData = useFetcher();

  const { state, type, data, Form } = fetcherData;

  const BrzGeneralDataBoxWithLoader = withFetcherLoader(
    BrzGeneralDataBox,
    type
  );

  const params = useParams();
  const studentData = useMatches().find(
    (m) => m.pathname === "/admin/students"
  )?.data;

  const student = studentData?.find(
    (student: StudentProfile) => student.id === params.studentId
  );

  return (
    <div className="w-3/4 my-12">
      <section className=" border-slate-200 gap-6 ">
        <BrzGeneralDataForm Form={Form} state={state} student={student} />
      </section>

      <section className="border-slate-200 gap-6 mt-6">
        <h2 className="text-xl text-slate-600 mt-6 mb-2 ml-2">
          BRZ Stammdaten
        </h2>
        <BrzGeneralDataBoxWithLoader data={data} />
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
