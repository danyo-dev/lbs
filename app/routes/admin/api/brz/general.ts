import { LoaderFunction, json } from "remix";
import {
  convertMatrikelStudentData,
  convertGeneralStudentData,
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
    throw Error("Bad Request");
  }

  const params = new URLSearchParams(url.search);

  [...params.entries()].forEach(([key, value]) => {
    if (!value) {
      params.delete(key);
    }
  });
  const cleanedQueryString = String(params);

  const brzSession = await brzAuthenticationHandler(request);
  const matrikelData = await requestBrzMatrikelNumber(
    brzSession,
    cleanedQueryString
  );
  const stammDatenData = await requestBrzStammdaten(
    brzSession,
    cleanedQueryString
  );

  const { matrikelStudentData, matrikelStatusCode } =
    convertMatrikelStudentData(matrikelData);

  const generalData = convertGeneralStudentData(stammDatenData);

  return json({ matrikelStatusCode, matrikelStudentData, generalData });
};
