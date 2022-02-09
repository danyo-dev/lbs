import { LoaderFunction, json } from "remix";
import { convertGeneralStudentData } from "~/utils/brzUtils";
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
  const generalData = convertGeneralStudentData(stammDatenData);

  if (!generalData) {
    return null;
  }
  return json(generalData);
};
