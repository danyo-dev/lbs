import { json } from "remix";

export function getParsedMatrikelStudentData(matrikelData: string) {
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

export function getParsedGeneralStudentData(stammDatenData: string) {
  const parsedData = JSON.parse(stammDatenData);
  const stammDaten = parsedData.stammdatenanfrage.stammdaten;
  return stammDaten;
}

export function getParsedReservedMatrikelData(
  reservedMatrikelData: string
): { _text: string }[] {
  const parsedData = JSON.parse(reservedMatrikelData);
  const reservedMatrikelNumbersList =
    parsedData.matrikelnummernantwort.matrikelnummernliste.matrikelnummer;
  return reservedMatrikelNumbersList;
}

export function getParsedNewMatrikelData(
  newMatrikelNumberResponse: string
): string {
  const parsedData = JSON.parse(newMatrikelNumberResponse);
  const reservedMatrikelNumber =
    parsedData.matrikelnummernantwort.matrikelnummernliste.matrikelnummer._text;
  return reservedMatrikelNumber;
}

export function handleParsingData(
  parseFn: Function,
  dataToParse: string | void,
  error: { message: string; code: number } = {
    message: "Problem parsing response",
    code: 500,
  }
) {
  try {
    return json(parseFn(dataToParse));
  } catch {
    throw json(error.message, {
      status: error.code,
    });
  }
}
