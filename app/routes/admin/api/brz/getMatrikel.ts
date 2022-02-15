import { LoaderFunction, json } from "remix";
import { getParsedMatrikelStudentData } from "~/utils/brzUtils";
import { requireAuthentication } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestBrzMatrikelNumber,
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
  const matrikelData = await requestBrzMatrikelNumber(
    brzSession,
    cleanedQueryString
  );

  if (!matrikelData) {
    throw json("this should not be possible", { status: 500 });
  }
  return json(getParsedMatrikelStudentData(matrikelData));
};
