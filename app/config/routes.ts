import {
  AcademicCapIcon,
  ClipboardListIcon,
  HomeIcon,
} from "@heroicons/react/outline";

export const routes = [
  {
    path: "overview",
    icon: HomeIcon,
    name: "Overview",
  },
  {
    path: "students",
    icon: AcademicCapIcon,
    name: "Students",
  },
  {
    path: "logs",
    icon: ClipboardListIcon,
    name: "Logs",
  },
];
export const studentDetailRoutes = [
  {
    path: "general",
    name: "Studiendaten",
  },
  {
    path: "personal",
    name: "Stammdaten",
  },
  {
    path: "payment",
    name: "Zahlungsdaten",
  },
  {
    path: "exams",
    name: "Prüfungsdaten",
  },
];
