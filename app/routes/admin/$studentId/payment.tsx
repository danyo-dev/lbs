import { Fragment } from 'react';
import { Form, useTransition, useMatches, useParams, useActionData, json, ActionFunction } from 'remix';
import { InputField } from '~/components/InputField';
import { requireAuthentication } from '~/services/auth.server';
import { brzAuthenticationHandler, postZahlungsDaten } from '~/services/brzService';
import { BRZ_FlattenedZahlungsDaten } from '~/types/StudentTypes';
import { getCurrentSemester, getDateFromISOString, getSemesterSelection } from '~/utils/dateUtils';

export const action: ActionFunction = async ({ request }) => {
  await requireAuthentication(request);

  const session = await brzAuthenticationHandler(request);
  const formData = await request.formData();

  const formDataToObjectMapping = [
    'semester',
    'matrikelnummer',
    'buchungsdatum',
    'betrag',
    'referenznummer',
  ].reduce((total, curr) => {
    return { ...total, [curr]: formData.get(curr) };
  }, {});

  const data = await postZahlungsDaten(session, formDataToObjectMapping as BRZ_FlattenedZahlungsDaten);

  if (!data) {
    throw new Response('this should not be possible', { status: 500 });
  }

  // the server can respond with 200 but still return an error,
  // if array is empty it is valid
  const parsedData = JSON.parse(data);
  const hasError = parsedData.stammdatenantwort?.fehlerliste?._attributes?.fehleranzahl !== '0';

  if (hasError || parsedData?.FehlerAntwort) {
    return json({
      error: parsedData?.FehlerAntwort || parsedData?.stammdatenantwort,
      status: 400,
    });
  }

  return json({
    status: 200,
  });
};

export default function StudentPaymentRoute() {
  const params = useParams();
  const transition = useTransition();
  const data = useMatches().find((m) => m.pathname === `/admin/${params.studentId}`)?.data;

  const { financialData, stammDaten } = data ?? {};

  return (
    <div className="w-full my-12">
      <section className="border-slate-200 ">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">Stammdaten Melden</h2>
        <Form method="post" className="bg-white shadow overflow-hidden rounded-lg p-4 ">
          <h3 className="text-xl font-bold  text-slate-600 my-4">Zahlungsdaten</h3>
          <div className="grid grid-cols-5 gap-4 gap-y-1">
            <InputField
              key="matrikelnummer"
              label="matrikelnummer"
              name="matrikelnummer"
              value={stammDaten?.matrikelnummer || ''}
              required
            />
            <div key="semester">
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
              key="betrag"
              label="betrag"
              name="betrag"
              value={financialData?.amount || ''}
              required
            />
            <InputField
              key="referenznummer"
              label="referenznummer"
              name="referenznummer"
              value={financialData?.invoice_number || ''}
              required
            />
            <InputField
              key="buchungsdatum"
              label="buchungsdatum"
              name="buchungsdatum"
              value={getDateFromISOString(financialData?.due_date) || ''}
              required
            />

          </div>
          <button type="submit" className="submitBtn mt-6">
            {transition.state === 'submitting' ? 'Zahlungsdaten werden gemeldet...' : 'Zahlungsdaten melden'}
          </button>
        </Form>
      </section>
    </div>
  );
}
