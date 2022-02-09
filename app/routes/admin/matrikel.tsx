import { useEffect, useState } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  useActionData,
  useLoaderData,
} from "remix";
import Snackbar from "~/components/shared/Snackbar";

import { requireAuthentication } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestGetReservedMatrikel,
  requestNewMatrikel,
} from "~/services/brzService";
import {
  convertNewMatrikelData,
  convertReservedMatrikelData,
} from "~/utils/brzUtils";

export const action: ActionFunction = async ({ request }) => {
  await requireAuthentication(request);

  const brzSession = await brzAuthenticationHandler(request);
  const newMatrikelNumberResponse = await requestNewMatrikel(brzSession);

  return convertNewMatrikelData(newMatrikelNumberResponse);
};

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request);

  const brzSession = await brzAuthenticationHandler(request);
  const reservedMatrikelResponse = await requestGetReservedMatrikel(brzSession);

  return convertReservedMatrikelData(reservedMatrikelResponse);
};

export default function Matrikel() {
  const matrikelData = useLoaderData();
  const newReservedMatrikelData = useActionData();

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
              Reservieren
            </button>
          </Form>
        </div>
      </div>

      <ul className="bg-white py-4 mb-4 px-6 shadow border-slate-200 rounded-lg text-sm mt-6 divide-y divide-gray-100 w-1/4 max-h-80 overflow-y-auto">
        {matrikelData.map((matrikelNumber: { _text: string }) => (
          <li key={matrikelNumber._text} className="py-2">
            {matrikelNumber._text}
          </li>
        ))}
      </ul>

      <Snackbar hasData={Boolean(newReservedMatrikelData)}>
        <span className="font-medium">
          Matrikelnummer {newReservedMatrikelData} erfolgreich reserviert!
        </span>
      </Snackbar>
    </>
  );
}
