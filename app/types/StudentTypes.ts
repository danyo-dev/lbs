import { profil } from "@prisma/client"

export type StudentProfileList = Pick<
  profil,
  "id" | "titel" | "vorname" | "name" | "email"
>

export type AC5_StammDatenProfile = Pick<
  profil,
  | "id"
  | "vorname"
  | "name"
  | "geb"
  | "email"
  | "staatsangehoerigkeit"
  | "anrede"
>

export type BRZ_StammDatenProfile = Omit<
  AC5_StammDatenProfile,
  "staatsangehoerigkeit" | "id"
> & {
  staatsangehoerigkeit: string
  id?: number
}

export type BRZ_MatrikelRequest = Pick<
  AC5_StammDatenProfile,
  "vorname" | "name" | "geb"
>

export interface BRZ_MatrikelStudent {
  matrikelStudentData?: BRZ_MatrikelStudentData
  matrikelStatusCode: number
  matrikelStatusText: string
}
export interface BRZ_MatrikelStudentData {
  matrikelnummer: { _text: string }
  be?: { _text: string }
  semester?: { _text: string }
  matrikelstatus: { _text: string }
  fullstudentlink: { _text: string }
}
