const currentYear = new Date().getFullYear();

export function getSemesterSelection() {
  return [...Array(4)].map((_, idx) => currentYear - idx);
}

export function getCurrentSemester() {
  var today = new Date();
  return today.getMonth() > 0 && today.getMonth() < 9
    ? `${currentYear}S`
    : `${currentYear}W`;
}
