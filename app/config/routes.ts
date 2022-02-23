import {
  AcademicCapIcon,
  ClipboardListIcon,
  HomeIcon,
  DocumentTextIcon,
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
    path: "matrikel",
    icon: DocumentTextIcon,
    name: "Reservierte Matrikelnummern",
  },
  {
    path: "logs",
    icon: ClipboardListIcon,
    name: "Logs",
  },
];
export const studentDetailRoutes = [
  {
    path: "matrikeldaten",
    name: "Matrikeldaten",
  },
  {
    path: "stammdaten",
    name: "Stammdaten",
  },
  {
    path: "studiendaten",
    name: "Studiendaten",
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
