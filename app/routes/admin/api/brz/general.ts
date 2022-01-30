import { LoaderFunction, json } from "remix";
import {
  convertMatrikelStudentData,
  convertGeneralStudentData,
  buildQueryString,
} from "~/utils/brzUtils";
import { requireAuthentication } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestBrzMatrikelNumber,
  requestBrzStammdaten,
} from "~/services/brzService";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request);
  const url = new URL(request.url);

  if (url.search === "") {
    return null;
  }

  const queryString = buildQueryString(url.searchParams);

  const brzSession = await brzAuthenticationHandler(request);
  const matrikelData = await requestBrzMatrikelNumber(brzSession, queryString);
  const stammDatenData = await requestBrzStammdaten(brzSession);

  const { matrikelStudentData, matrikelStatusCode } =
    convertMatrikelStudentData(matrikelData);

  const { generalData } = convertGeneralStudentData(stammDatenData);

  return json({ matrikelStatusCode, matrikelStudentData, generalData });
};
