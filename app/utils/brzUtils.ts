import { BrzMatrikelStudent } from "~/types/brzTypes";
import { cleanupStudiendaten } from "./studiendatenUtils";

export function getParsedMatrikelStudentData(
  matrikelData: string
): BrzMatrikelStudent {
  const parsedData = JSON.parse(matrikelData);

  const matrikelStudentData =
    parsedData.matrikelpruefungantwort.matrikelpruefergebnis.matrikelliste
      .extendedstudierendenkey;

  const matrikelStatusCode = parseInt(
    parsedData.matrikelpruefungantwort.matrikelpruefergebnis.statuscode._text
  );

  const matrikelStatusText =
    parsedData.matrikelpruefungantwort.matrikelpruefergebnis.statusmeldung
      ._text;

  return { matrikelStudentData, matrikelStatusText, matrikelStatusCode };
}

export function getParsedStammdaten(data: string) {
  return JSON.parse(data);
}

export function getParsedStudiendaten(data: string) {
  const parsedData = JSON.parse(data);
  const cleanedStudiendaten = cleanupStudiendaten(
    parsedData.studienantwort.studienliste.studiengang
  );

  return cleanedStudiendaten;
}

export function getParsedReservedMatrikelData(
  data: string
): { _text: string }[] {
  const parsedData = JSON.parse(data);
  const reservedMatrikelNumbersList =
    parsedData.matrikelnummernantwort.matrikelnummernliste.matrikelnummer;
  return reservedMatrikelNumbersList;
}

export function getParsedNewMatrikelData(data: string): string {
  const parsedData = JSON.parse(data);
  const reservedMatrikelNumber =
    parsedData.matrikelnummernantwort.matrikelnummernliste.matrikelnummer._text;
  return reservedMatrikelNumber;
}
