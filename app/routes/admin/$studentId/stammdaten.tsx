import { useEffect, Fragment } from 'react';
import { ActionFunction, Form, json, useTransition, useMatches, useParams, useActionData } from 'remix';
import { BRZ_FlattendedStammDatenProfile } from '~/types/StudentTypes';
import { InputField } from '~/components/InputField';
import { formatBirthdates, getCurrentSemester, getSemesterSelection } from '~/utils/dateUtils';
import { brzAuthenticationHandler, postStammDaten } from '~/services/brzService';
import { requireAuthentication } from '~/services/auth.server';
import { toast } from 'react-toastify';
import { toastConfig } from '~/config/settings';

export const action: ActionFunction = async ({ request }) => {
  await requireAuthentication(request);

  const brzSession = await brzAuthenticationHandler(request);
  const formData = await request.formData();

  const formDataToObjectMapping = [
    'matrikelnummer',
    'semester',
    'vorname',
    'nachname',
    'geburtsdatum',
    'email',
    'homeStrasse',
    'homePlz',
    'homeOrt',
    'homeTyp',
    'homeLand',
    'semesterStrasse',
    'semesterPlz',
    'semesterOrt',
    'semesterTyp',
    'semesterLand',
    'staatsangehoerigkeit',
    'anrede',
    'akadgrad',
    'akadnach',
    'svnr',
    'bpk',
    'ekz',
    'perskz',
  ].reduce((total, curr) => {
    return { ...total, [curr]: formData.get(curr) };
  }, {});

  const stammDaten = await postStammDaten(brzSession, formDataToObjectMapping as BRZ_FlattendedStammDatenProfile);

  if (!stammDaten) {
    throw new Response('this should not be possible', { status: 500 });
  }

  // the server can respond with 200 but still return an error,
  // if array is empty it is valid
  const parsedData = JSON.parse(stammDaten);
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

type ErrorResponse = {
  datenfeld: { _text: string };
  fehlernummer: { _text: string };
  fehlertext: { _text: string };
  massnahme: { _text: string };
};

export default function StudentStammdatenRoute() {
  const params = useParams();
  const actionData = useActionData();
  const transition = useTransition();
  const data = useMatches().find((m) => m.pathname === `/admin/${params.studentId}`)?.data;

  useEffect(() => {
    if (actionData?.status === 200) {
      toast.success('Successfully saved Stammdaten to BRZ', toastConfig);
    }
    if (actionData?.status === 400) {
      toast.error('Error while saving Stammdaten to BRZ, please see errors above', toastConfig);
    }
  }, [actionData]);

  function renderError(data: any) {
    if (Array.isArray(data?.fehlerliste?.fehler)) {
      return data.fehlerliste.fehler.map((el: ErrorResponse) => {
        return (
          <>
            <div className=" text-sm mb-4">
              <p className="font-bold text-red-600">
                Fehler: {el.fehlernummer._text} in {el.datenfeld._text}
              </p>
              <p>Fehler: {el.fehlertext._text}</p>
            </div>
          </>
        );
      });
    }
    return (
      <>
        <div className=" text-sm mb-4">
          <p className="font-bold text-red-600">Fehler: {data?.fehlerliste.fehler.fehlernummer._text}</p>
          <p>Fehler: {data?.fehlerliste.fehler.fehlertext._text}</p>
        </div>
      </>
    );
  }

  return (
    <div className="w-full my-12">
      <section className="border-slate-200 ">
        <h2 className="text-xl text-slate-600 mb-2 ml-2">Stammdaten Melden</h2>
        {actionData?.error && <p className="text-red-500 text-sm">{renderError(actionData.error)}</p>}
        <Form method="post" className="bg-white shadow overflow-hidden rounded-lg p-4 ">
          <h3 className="text-xl font-bold  text-slate-600 my-4">Basisdaten</h3>
          <div className="grid grid-cols-3 gap-4 gap-y-1">
            <InputField
              key="matrikel"
              label="matrikelnummer"
              name="matrikelnummer"
              value={data?.matrikelnummer || ''}
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
            <div key="anrede">
              <label htmlFor="anrede" className="block text-sm font-medium text-slate-600">
                Anrede
              </label>
              <select key="anrede" className="dropDown" name="anrede" defaultValue={data?.anrede === 1 ? 'M' : 'W'}>
                <option value="M" key="anrede-M">
                  M
                </option>
                <option value="W" key="anrede-W">
                  W
                </option>
              </select>
            </div>

            <InputField key="titel" name="akadgrad" label="titel" value={data?.titel || ''} />
            <InputField
              key="title-postposed"
              name="akadnach"
              label="Titel Postposed"
              value={data?.title_postposed || ''}
            />
            <InputField key="vorname" label="vorname" name="vorname" value={data?.vorname || ''} required />
            <InputField
              key="nachname"
              label="nachname"
              name="nachname"
              value={`${data?.name} ${data?.middlename}` || ''}
              required
            />
            <InputField
              key="birthdate"
              label="geburtsdatum"
              name="geburtsdatum"
              value={formatBirthdates(data?.geb) || ''}
              inputType="date"
              required
            />
            <InputField key="email" label="email" name="email" value={data?.email || ''} required />
            <InputField
              key="staatsangehoerigkeit"
              label="staatsangehoerigkeit"
              name="staatsangehoerigkeit"
              value={data?.staatsangehoerigkeit || ''}
              required
            />
            <InputField key="bpk" name="bpk" label="bpk" value={data?.bpk || ''} />
            <InputField key="perskz" name="perskz" label="perskz" value={data?.perskz || ''} />
            <InputField key="svnr" name="svnr" label="svnr" value={data?.svnr || ''} />
            <InputField key="ekz" name="ekz" label="ekz" value={data?.ekz || ''} />
            <div key="home-address" className="col-span-3 grid grid-cols-3 gap-4 gap-y-1">
              <h3 className="text-xl font-bold text-slate-600 my-4 col-span-3">Heim Adresse</h3>
              <InputField
                key="home-strasse"
                name="homeStrasse"
                label="strasse"
                value={data?.addresses?.[0]?.strasse || ''}
                required
              />
              <InputField key="home-plz" label="plz" name="homePlz" value={data?.addresses?.[0]?.plz || ''} required />
              <InputField key="home-ort" label="ort" name="homeOrt" value={data?.addresses?.[0]?.ort || ''} required />
              <InputField
                key="home-land"
                label="land"
                name="homeLand"
                value={data?.addresses?.[0]?.land || ''}
                required
              />
              <div key="typ">
                <label htmlFor="homeTyp" className="block text-sm font-medium text-slate-600">
                  Typ
                </label>
                <select
                  key="home-address-type"
                  className="dropDown"
                  name="homeTyp"
                  defaultValue={data?.addresses?.[0]?.typ === 1 ? 'S' : 'H'}
                >
                  <option value="S" key="typ-s">
                    S
                  </option>
                  <option value="H" key="typ-h">
                    H
                  </option>
                </select>
              </div>
            </div>
            <div key="semester-address" className="col-span-3 grid grid-cols-3 gap-4 gap-y-1">
              <h3 className="text-xl font-bold text-slate-600 my-4 col-span-3">Semester Adresse</h3>
              <InputField
                key="semester-strasse"
                label="strasse"
                name="semesterStrasse"
                value={data?.addresses?.[1]?.strasse || ''}
                required
              />
              <InputField
                key="semester-plz"
                name="semesterPlz"
                label="plz"
                value={data?.addresses?.[1]?.plz || ''}
                required
              />
              <InputField
                key="semester-ort"
                name="semesterOrt"
                label="ort"
                value={data?.addresses?.[1]?.ort || ''}
                required
              />
              <InputField
                key="semester-land"
                label="land"
                name="semesterLand"
                value={data?.addresses?.[1]?.land || ''}
                required
              />
              <div>
                <label htmlFor="semesterTyp" className="block text-sm font-medium text-slate-600">
                  Typ
                </label>
                <select
                  key="semester-address-type"
                  className="dropDown"
                  name="semesterTyp"
                  defaultValue={data?.addresses?.[1]?.typ === 1 ? 'S' : 'H'}
                >
                  <option value="S" key="typ-s">
                    S
                  </option>
                  <option value="H" key="typ-h">
                    H
                  </option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="submitBtn mt-6">
            {transition.state === 'submitting' ? 'Stammdaten werden gemeldet...' : 'Stammdaten melden'}
          </button>
        </Form>
      </section>
    </div>
  );
}
