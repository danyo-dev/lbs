import { LoaderFunction, json } from "@remix-run/node";
import { getParsedStudiendaten } from "~/utils/brzUtils";
import { requireAuthentication } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestBrzStudiendaten,
} from "~/services/brzService";
import getCleanQueryString from "~/utils/getCleanQueryString";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request);

  const url = new URL(request.url);

  if (url.search === "") {
    throw Error("Bad Request");
  }

  const { cleanedQueryString } = getCleanQueryString(url);

  const brzSession = await brzAuthenticationHandler(request);
  const studienDatenData = await requestBrzStudiendaten(
    brzSession,
    cleanedQueryString
  );

  if (!studienDatenData) {
    throw json("this should not be possible", { status: 500 });
  }

  const parsedData = getParsedStudiendaten(studienDatenData);

  if (parsedData) {
    return json(parsedData);
  }

  return null;
};
