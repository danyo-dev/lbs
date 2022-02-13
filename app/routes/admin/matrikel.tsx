import {
  ActionFunction,
  Form,
  LoaderFunction,
  useActionData,
  useCatch,
  useLoaderData,
  useTransition,
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
  handleParsingData,
} from "~/utils/brzUtils";

import { useEffect } from "react";
import { toastConfig } from "~/config/settings";

export const action: ActionFunction = async ({ request }) => {
  await requireAuthentication(request);

  const brzSession = await brzAuthenticationHandler(request);
  const newMatrikelNumberResponse = await requestNewMatrikel(brzSession);

  return handleParsingData(getParsedNewMatrikelData, newMatrikelNumberResponse);
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request);

  const brzSession = await brzAuthenticationHandler(request);
  const reservedMatrikelResponse = await requestGetReservedMatrikel(brzSession);

  return handleParsingData(
    getParsedReservedMatrikelData,
    reservedMatrikelResponse
  );
};

export default function Matrikel() {
  const data = useLoaderData();
  const newMatrikelNumber = useActionData();
  const transition = useTransition();

  useEffect(() => {
    if (newMatrikelNumber) {
      toast.success(
        `Matrikelnummer ${newMatrikelNumber} erfolgreich reserviert`,
        toastConfig
      );
    }
  }, [newMatrikelNumber]);

  const ButtonText =
    transition.state === "submitting"
      ? "Anfrage wird ausgeführt..."
      : "Matrikelnummer reservieren";

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-extrabold text-gray-900 ">
          Reservierte Matrikelnummern
        </h1>
        <div className="flex justify-between items-center">
          <Form method="post">
            <button
              type="submit"
              className=" justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {ButtonText}
            </button>
          </Form>
        </div>
      </div>

      <ul className="bg-white py-4 mb-4 px-6 shadow border-slate-200 rounded-lg text-sm mt-6 divide-y divide-gray-100 w-1/4 max-h-96 overflow-y-auto">
        {data.map((matrikelNumber: { _text: string }) => (
          <li key={matrikelNumber._text} className="py-2">
            {matrikelNumber._text}
          </li>
        ))}
      </ul>
    </>
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
