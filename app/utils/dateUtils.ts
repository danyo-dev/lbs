export const currentYear = new Date().getFullYear();

export function getSemesterSelection() {
  return [...Array(4)].map((_, idx) => currentYear - idx);
}

export function getCurrentSemester() {
  var today = new Date();
  return today.getMonth() > 0 && today.getMonth() < 9
    ? `${currentYear}S`
    : `${currentYear}W`;
}

export function formatBirthdates(
  timeDate: string | number | bigint | boolean | Date | null | undefined
): string | null {
  if (!timeDate) {
    return null;
  }
  return typeof timeDate === "string"
    ? new Date(timeDate).toISOString().slice(0, 10)
    : null;
}
