import { LoaderFunction, json } from "remix";
import { getParsedGeneralStudentData } from "~/utils/brzUtils";
import { requireAuthentication } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestBrzStammdaten,
} from "~/services/brzService";
import useQueryString from "~/hooks/useQueryString";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request);

  const { cleanedQueryString } = useQueryString(request);
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
