export function convertMatrikelStudentData(matrikelData: string) {
  const parseMatrikelData = JSON.parse(matrikelData);

  const matrikelStudentData =
    parseMatrikelData.matrikelpruefungantwort.matrikelpruefergebnis
      .matrikelliste.extendedstudierendenkey;
  const matrikelStatusCode = parseInt(
    parseMatrikelData.matrikelpruefungantwort.matrikelpruefergebnis.statuscode
      ._text
  );

  const matrikelStatusText =
    parseMatrikelData.matrikelpruefungantwort.matrikelpruefergebnis
      .statusmeldung._text;

  return { matrikelStudentData, matrikelStatusText, matrikelStatusCode };
}

export function convertGeneralStudentData(stammDatenData: string) {
  const parseStammDatenData = JSON.parse(stammDatenData);

  return parseStammDatenData.stammdatenanfrage.stammdaten;
}

export function convertReservedMatrikelData(reservedMatrikelData: string) {
  const parseReservedMatrikel = JSON.parse(reservedMatrikelData);
  return parseReservedMatrikel.matrikelnummernantwort.matrikelnummernliste
    .matrikelnummer;
}

export function convertNewMatrikelData(newMatrikelNumberResponse: string) {
  const parseData = JSON.parse(newMatrikelNumberResponse);

  return parseData.matrikelnummernantwort.matrikelnummernliste.matrikelnummer
    ._text;
}
