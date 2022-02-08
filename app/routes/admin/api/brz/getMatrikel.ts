import { LoaderFunction, json } from "remix";
import { convertMatrikelStudentData } from "~/utils/brzUtils";
import { requireAuthentication } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestBrzMatrikelNumber,
} from "~/services/brzService";
import useQueryString from "~/hooks/useQueryString";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request);

  const { cleanedQueryString } = useQueryString(request);

  const brzSession = await brzAuthenticationHandler(request);
  const matrikelData = await requestBrzMatrikelNumber(
    brzSession,
    cleanedQueryString
  );

  const { matrikelStudentData, matrikelStatusCode } =
    convertMatrikelStudentData(matrikelData);

  return json({ matrikelStatusCode, matrikelStudentData });
};
