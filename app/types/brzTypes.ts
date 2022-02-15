import type { Session } from "remix";

export interface BrzLoginResponse {
  responseData: {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
  };
  session: Session;
}

export interface BrzMatrikelRequestType {
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  svnr?: string | null;
}

export type BrzReservedMatrikel = { _text: string };

export interface BrzMatrikelStudent {
  matrikelStudentData?: BrzMatrikelStudentData;
  matrikelStatusCode: number;
  matrikelStatusText: string;
}
export interface BrzMatrikelStudentData {
  matrikelnummer: { _text: string };
  be?: { _text: string };
  semester?: { _text: string };
  matrikelstatus: { _text: string };
  fullstudentlink: { _text: string };
}
export interface BrzGeneralDataBoxItem {
  vorname: { _text: string };
  nachname: { _text: string };
  geburtsdatum: { _text: string };
  svnr: { _text: string };
  geschlecht: { _text: string };
  staatsbuergerschaft: { _text: string };
  akadnach: { _text: string };
  bpk: { _text: string };
  adressen: { _text: string };
  beitragstatus: { _text: string };
  zaehlungPePn: { _text: string };
  zaehlungPo: { _text: string };
  emailliste: { _text: string };
}

export type BrzGeneralData = BrzMatrikelStudent & BrzGeneralDataBoxItem;
