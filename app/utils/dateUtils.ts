export const currentYear = new Date().getFullYear();

export function getDateFromISOString(dateTime: string): string {
  const [date] = dateTime.split('T');
  return date;
}

export function getSemesterSelection() {
  return [...Array(4)].map((_, idx) => currentYear - idx);
}

export function getCurrentSemester() {
  var today = new Date();
  return today.getMonth() > 0 && today.getMonth() < 9 ? `${currentYear}S` : `${currentYear}W`;
}

export function formatBirthdates(timeDate: Date | null | undefined): string | null {
  if (!timeDate) {
    return null;
  }
  return new Date(timeDate).toISOString().slice(0, 10);
}

export function addDays(date: string | undefined, days: number): string | null {
  if (!date) {
    return null;
  }
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);

  return newDate.toISOString();
}
