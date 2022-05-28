import { Fragment } from 'react';
import { ActionFunction, Form, json, useCatch, useMatches, useParams, useTransition } from 'remix';
import { InputField } from '~/components/InputField';
import { requireAuthentication } from '~/services/auth.server';
import { brzAuthenticationHandler, postStudienDaten } from '~/services/brzService';
import { BRZ_FlattenedStudienDaten } from '~/types/StudentTypes';
import { getCurrentSemester, getSemesterSelection } from '~/utils/dateUtils';

// Kunde muss sich noch genau alle studiendaten ansehen die da mitgeschickt werden.
// Bis dahin ist dieses modul NOT READY
export const action: ActionFunction = async ({ request }) => {
  await requireAuthentication(request);
  const session = await brzAuthenticationHandler(request);
  const formData = await request.formData();

  const formDataToObjectMapping = ['matrikelnummer', 'ausbildungssemester', 'semester'].reduce((total, curr) => {
    return { ...total, [curr]: formData.get(curr) };
  }, {});

  const data = await postStudienDaten(session, formDataToObjectMapping as BRZ_FlattenedStudienDaten);

  if (!data) {
    throw new Response('this should not be possible', { status: 500 });
  }

  return json({
    status: 200,
  });
};

export default function StudiendatenRoute() {
  const params = useParams();
  const transition = useTransition();
  const data = useMatches().find((m) => m.pathname === `/admin/${params.studentId}`)?.data;

  return (
    <div className="w-full my-12">
      <section className="border-slate-200 ">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">Studiendaten Melden</h2>
        <Form method="post" className="bg-white shadow overflow-hidden rounded-lg p-4 ">
          <h3 className="text-xl font-bold  text-slate-600 my-4">Studiendaten</h3>
          <div className="grid grid-cols-3 gap-4 gap-y-1">
            <InputField
              key="matrikel"
              label="matrikelnummer"
              name="matrikelnummer"
              value={data?.matrikelnummer || ''}
              required
            />
            <div>
              <label htmlFor="semester" className="block text-sm font-medium text-slate-600">
                Semester
              </label>
              <select className="dropDown" name="semester" defaultValue={getCurrentSemester()}>
                {getSemesterSelection().map((el, key) => {
                  return (
                    <Fragment key={key}>
                      <option value={`${el}S`} key={`${el}S`}>{`${el}S`}</option>
                      <option value={`${el}W`} key={`${el}W`}>{`${el}W`}</option>
                    </Fragment>
                  );
                })}
              </select>
            </div>
            <InputField
              key="ausbildungssemester"
              label="ausbildungssemester"
              name="ausbildungssemester"
              value=""
              inputType="number"
              required
            />
          </div>
          <InputField key="perskz" name="perskz" label="perskz" value={data?.perskz || ''} />
          <div className="grid grid-cols-3 gap-4"></div>
          <button type="submit" className="submitBtn mt-6">
            {transition.state === 'submitting' ? 'Studiendaten werden gemeldet...' : 'Studiendaten melden'}
          </button>
        </Form>
      </section>
    </div>
  );
}
export function CatchBoundary() {
  const caught = useCatch();
  const parseData = JSON.parse(caught.data);

  const errors: { fehlertext: { _text: string } } = parseData.FehlerAntwort?.fehlerliste?.fehler;

  return (
    <div className="error-container">
      <div className="text-2xl font-bold mb-2">Error: Status {caught.status}</div>
      <div>{errors.fehlertext._text}</div>
    </div>
  );
}
