import { LoaderFunction, json } from "remix";
import { getParsedMatrikelStudentData } from "~/utils/brzUtils";
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

  if (!matrikelData) {
    throw json("this should not be possible", { status: 500 });
  }
  return json(getParsedMatrikelStudentData(matrikelData));
};
