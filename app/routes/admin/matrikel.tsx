import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
  useCatch,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "remix";
import { toast } from "react-toastify";
import { requireAuthentication } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestGetReservedMatrikel,
  requestNewMatrikel,
} from "~/services/brzService";
import {
  getParsedNewMatrikelData,
  getParsedReservedMatrikelData,
} from "~/utils/brzUtils";
import { useEffect } from "react";
import { toastConfig } from "~/config/settings";
import { currentYear, getSemesterSelection } from "~/utils/dateUtils";

export const action: ActionFunction = async ({ request }) => {
  await requireAuthentication(request);

  const body = await request.formData();
  const year = body.get("year") || currentYear.toString();
  const brzSession = await brzAuthenticationHandler(request);
  const newMatrikelNumberResponse = await requestNewMatrikel(brzSession, year);

  if (!newMatrikelNumberResponse) {
    throw json("this should not be possible", { status: 500 });
  }
  return json(getParsedNewMatrikelData(newMatrikelNumberResponse));
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request);

  const brzSession = await brzAuthenticationHandler(request);
  const url = new URL(request.url);
  const year = url.searchParams.get("year") || currentYear.toString();

  console.log(year);
  const reservedMatrikelResponse = await requestGetReservedMatrikel(
    brzSession,
    year
  );

  if (!reservedMatrikelResponse) {
    throw json("this should not be possible", { status: 500 });
  }
  return json(getParsedReservedMatrikelData(reservedMatrikelResponse));
};

export default function Matrikel() {
  const data = useLoaderData();
  const newMatrikelNumber = useActionData();
  const [searchParams] = useSearchParams();

  let submit = useSubmit();

  useEffect(() => {
    if (newMatrikelNumber) {
      toast.success(
        `Matrikelnummer ${newMatrikelNumber} für das Jahr ${searchParams.get(
          "year"
        )} erfolgreich reserviert`,
        toastConfig
      );
    }
  }, [newMatrikelNumber]);

  return (
    <div className="grid grid-cols-12 gap-24">
      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
          Reservierte Matrikelnummern
        </h2>

        <Form method="get" onChange={(e) => submit(e.currentTarget)}>
          <select
            className="dropDown"
            name="year"
            defaultValue={searchParams.get("year") || currentYear}
          >
            {getSemesterSelection().map((el) => {
              return (
                <>
                  <option value={`${el}`} key={`${el}`}>{`${el}`}</option>
                </>
              );
            })}
          </select>
        </Form>

        <ul className="listWithOverflow">
          {data.length ? (
            data.map((matrikelNumber: { _text: string }) => (
              <li key={matrikelNumber._text} className="py-2">
                {matrikelNumber._text}
              </li>
            ))
          ) : (
            <li key={data._text} className="py-2">
              {data._text}
            </li>
          )}
        </ul>
      </div>
      <div className="col-span-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">
          Neue Matrikelnummer reservieren
        </h2>
        <Form method="post">
          <select
            className="dropDown col-span-6"
            name="year"
            defaultValue={currentYear}
          >
            {getSemesterSelection().map((el) => {
              return (
                <>
                  <option value={`${el}`} key={`${el}`}>{`${el}`}</option>
                </>
              );
            })}
          </select>
          <button type="submit" className="submitBtn mt-4">
            Matrikelnummer reservieren
          </button>
        </Form>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  function renderErrorMessage() {
    try {
      const parsedData = JSON.parse(caught.data);
      return parsedData.FehlerAntwort.fehlerliste.fehler.fehlertext._text;
    } catch {
      return caught.data;
    }
  }

  return (
    <div className="error-container">
      <div className="text-2xl font-bold mb-2">{renderErrorMessage()}</div>
      <div className="text-xl font-bold mb-2">Error: {caught.status}</div>
    </div>
  );
}
