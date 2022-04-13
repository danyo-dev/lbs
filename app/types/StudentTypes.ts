import { profil, pm_fields, bis_profile_property, profil_studium } from '@prisma/client';

export type AC5_AdressFields = Pick<pm_fields, 'strasse' | 'plz' | 'ort' | 'land' | 'typ'>;

export type BRZ_AdressFields = Omit<AC5_AdressFields, 'land'> & { land: string };

export type BisProfileProperties = Pick<
  bis_profile_property,
  'matriculation_number' | 'sector_specific_pin' | 'social_insurance_number' | 'replacement_label'
>;

export type StudentProfileList = Pick<profil, 'id' | 'titel' | 'vorname' | 'name' | 'email'>;

export type AC5_MNR = Pick<profil_studium, 'mnr'>;

export type AC5_StammDatenProfile = Pick<
  profil,
  | 'id'
  | 'vorname'
  | 'middlename'
  | 'name'
  | 'geb'
  | 'email'
  | 'staatsangehoerigkeit'
  | 'anrede'
  | 'titel'
  | 'title_postposed'
>;

export type BRZ_StammDatenProfile = Omit<AC5_StammDatenProfile, 'staatsangehoerigkeit' | 'id'> & {
  staatsangehoerigkeit?: string | undefined | null;
  id?: number;
  addresses: BRZ_AdressFields[] | undefined;
  semester?: string;
  titel?: string | null;
  title_postposed?: string | null;
  matrikelnummer: string;
  bpk?: string | null;
  svnr?: string | null;
  ekz?: string | null;
  perskz: string | null | undefined;
};

export type BRZ_FlattendedStammDatenProfile = Omit<
  BRZ_StammDatenProfile,
  'addresses' | 'bpk' | 'svnr' | 'perskz' | 'ekz' | 'titel' | 'title_postposed' | 'geb' | 'name'
> & {
  homeStrasse: string;
  homePlz: string;
  homeOrt: string;
  homeLand: string;
  homeTyp: string;
  semesterStrasse: string;
  semesterPlz: string;
  semesterOrt: string;
  semesterLand: string;
  semesterTyp: string;
  akadnach?: string;
  akadgrad?: string;
  bpk?: string;
  svnr?: string;
  ekz?: string;
  perskz?: string;
  geburtsdatum: string;
  nachname: string;
};

export type BRZ_MatrikelRequest = Pick<AC5_StammDatenProfile, 'vorname' | 'name' | 'geb'>;

export interface BRZ_MatrikelStudent {
  matrikelStudentData?: BRZ_MatrikelStudentData;
  matrikelStatusCode: number;
  matrikelStatusText: string;
}
export interface BRZ_MatrikelStudentData {
  matrikelnummer: { _text: string };
  be?: { _text: string };
  semester?: { _text: string };
  matrikelstatus: { _text: string };
  fullstudentlink: { _text: string };
}
