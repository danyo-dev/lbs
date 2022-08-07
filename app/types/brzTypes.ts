import type { Session } from "@remix-run/node"

export interface BrzLoginResponse {
  responseData: {
    access_token: string
    token_type: string
    expires_in: number
    scope: string
  }
  session: Session
}

export interface BrzMatrikelRequestType {
  firstName: string | null
  lastName: string | null
  birthDate: string | null
  svnr?: string | null
}

export type BrzReservedMatrikel = { _text: string }

export interface BrzMatrikelStudent {
  matrikelStudentData?: BrzMatrikelStudentData
  matrikelStatusCode: number
  matrikelStatusText: string
}
export interface BrzMatrikelStudentData {
  matrikelnummer: { _text: string }
  be?: { _text: string }
  semester?: { _text: string }
  matrikelstatus: { _text: string }
  fullstudentlink: { _text: string }
}
export interface BrzGeneralDataBoxItem {
  vorname: { _text: string }
  name: { _text: string }
  geb: { _text: string }
  svnr: { _text: string }
  geschlecht: { _text: string }
  staatsbuergerschaft: { _text: string }
  akadnach: { _text: string }
  bpk: { _text: string }
  adressen: {
    adresse: {
      strasse: { _text: string }
      plz: { _text: string }
      ort: { _text: string }
      staat: { _text: string }
      typ: { _text: string }
    }[]
  }
  beitragstatus: { _text: string }
  zaehlungPePn: { _text: string }
  zaehlungPo: { _text: string }
  emailliste: { email: { emailadresse: { _text: string } } }
}

export interface BrzStudienDaten {
  studiengang: {
    stgkz: { _text: string }
    orgformcode: { _text: string }
    ausbildungssemester: { _text: string }
    perskz: { _text: string }
    studstatuscode: { _text: string }
    meldestatus: { _text: string }
    standortcode: { _text: string }
    zulassungsdatum: { _text: string }
    zugangsberechtigung: {
      voraussetzung: { _text: string }
      datum: { _text: string }
      staat: { _text: string }
    }
    studstatuscodestichtag: { _text: string }
    bmwfwfoerderrelevant: { _text: string }
  }
}

export type EmailList = BrzGeneralDataBoxItem["emailliste"]
export type Addresses = BrzGeneralDataBoxItem["adressen"]

export type BrzGeneralData = BrzMatrikelStudent & BrzGeneralDataBoxItem
