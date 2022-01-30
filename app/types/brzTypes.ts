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

export interface ObjKey {
  [key: string]: string;
}
export interface BrzGeneralDataBoxItem extends ObjKey {
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  svnr: string;
  geschlecht: string;
  staatsbuergerschaft: string;
}
