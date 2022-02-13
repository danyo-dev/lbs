import { LoaderFunction, json } from "remix";
import { getParsedGeneralStudentData } from "~/utils/brzUtils";
import { requireAuthentication } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestBrzStammdaten,
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
  const stammDatenData = await requestBrzStammdaten(
    brzSession,
    cleanedQueryString
  );

  if (!stammDatenData) {
    throw json("this should not be possible", { status: 500 });
  }
  return json(getParsedGeneralStudentData(stammDatenData));
};
