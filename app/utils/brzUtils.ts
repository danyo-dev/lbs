export function convertMatrikelStudentData(matrikelData: string) {
  const parseMatrikelData = JSON.parse(matrikelData);
  const matrikelStudentData =
    parseMatrikelData.matrikelpruefungantwort.matrikelpruefergebnis
      .matrikelliste.extendedstudierendenkey;
  const matrikelStatusCode = parseInt(
    parseMatrikelData.matrikelpruefungantwort.matrikelpruefergebnis.statuscode
      ._text
  );

  return { matrikelStudentData, matrikelStatusCode };
}

export function convertGeneralStudentData(stammDatenData: string) {
  const parseStammDatenData = JSON.parse(stammDatenData);
  const generalData = parseStammDatenData.stammdatenanfrage.stammdaten;

  return generalData;
}
