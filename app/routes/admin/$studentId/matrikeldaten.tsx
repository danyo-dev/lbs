import { useEffect } from 'react';
import { useFetcher, useParams, useMatches, useCatch } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import BrzGetMatrikelForm from '~/components/BrzGetMatrikelForm';
import BrzMatrikelDataBox from '~/components/BrzMatrikelDataBox';
import { getSession } from '~/services/session.server';
import { BRZ_MatrikelStudent, CompleteStudentProfile } from '~/types/StudentTypes';

export default function StudentMatrikelDataRoute() {
  const fetcher = useFetcher<BRZ_MatrikelStudent>();
  const { state, type, data, Form } = fetcher;
  const params = useParams();
  const studentData = useMatches().find((m) => m.pathname === `/admin/${params.studentId}`)
    ?.data as CompleteStudentProfile;

  return (
    <div className="w-full my-12 ">
      <section className=" border-slate-200 mb-10">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">BRZ Matrikeldaten Abfragen</h2>
        <BrzGetMatrikelForm Form={Form} state={state} student={studentData} />
      </section>

      <section className="border-slate-200">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">BRZ Matrikeldaten</h2>
        <BrzMatrikelDataBox data={data} type={type} />
      </section>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const parseData = JSON.parse(caught.data);

  const errorMsg = parseData.FehlerAntwort?.fehlerliste?.fehler?.massnahme?._text;

  return (
    <div className="error-container">
      <div className="text-2xl font-bold mb-2">Error: Status {caught.status}</div>
      <div className="text-slate-700 ">{errorMsg}</div>
    </div>
  );
}
