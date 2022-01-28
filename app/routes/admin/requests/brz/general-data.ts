import { LoaderFunction, ActionFunction, json } from "remix";

import { authenticator } from "~/services/auth.server";
import {
  brzAuthenticationHandler,
  requestBrzMatrikelNumber,
  requestBrzStammdaten,
} from "~/services/brzService";

export const loader: LoaderFunction = async ({ request }) => {
  // Will optimise this in next PR
  const url = new URL(request.url);
  const user = await authenticator.isAuthenticated(request);
  if (!user || url.search === "") {
    return null;
  }

  const vorname = url.searchParams.get("first-name");
  const nachname = url.searchParams.get("last-name");
  const birthdate = url.searchParams.get("birthdate");

  const userData = { vorname, nachname, birthdate };

  const brzSession = await brzAuthenticationHandler(request);
  const matrikelData = await requestBrzMatrikelNumber(brzSession, userData);
  const stammDatenData = await requestBrzStammdaten(brzSession);

  const parseMatrikelData = JSON.parse(matrikelData);
  const parseStammDatenData = JSON.parse(stammDatenData);
  const matrikelStatusCode = parseInt(
    parseMatrikelData.matrikelpruefungantwort.matrikelpruefergebnis.statuscode
      ._text
  );
  console.log(
    parseMatrikelData.matrikelpruefungantwort.matrikelpruefergebnis
      .matrikelliste.extendedstudierendenkey
  );
  const matrikelStudentData =
    parseMatrikelData.matrikelpruefungantwort.matrikelpruefergebnis
      .matrikelliste.extendedstudierendenkey;

  const stammDaten = parseStammDatenData.stammdatenanfrage.stammdaten;

  return json({ matrikelStatusCode, matrikelStudentData, stammDaten });
};
