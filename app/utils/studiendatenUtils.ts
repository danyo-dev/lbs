import { BrzStudienDaten } from "~/types/brzTypes";

/**
 * Extract Studiendaten Data from response
 */
export function cleanupStudiendaten({
  stgkz,
  orgformcode,
  ausbildungssemester,
  perskz,
  studstatuscode,
  meldestatus,
  standortcode,
  zulassungsdatum,
  zugangsberechtigung,
  studstatuscodestichtag,
  bmwfwfoerderrelevant,
}: BrzStudienDaten["studiengang"]) {
  return {
    stgkz,
    orgformcode,
    ausbildungssemester,
    perskz,
    studstatuscode,
    meldestatus,
    standortcode,
    zulassungsdatum,
    zugangsberechtigung,
    studstatuscodestichtag,
    bmwfwfoerderrelevant,
  };
}
