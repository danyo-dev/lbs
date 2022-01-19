import {
  AcademicCapIcon,
  ClipboardListIcon,
  HomeIcon,
} from "@heroicons/react/outline";

export const routes = [
  {
    path: "/admin/",
    icon: HomeIcon,
    name: "Overview",
  },
  {
    path: "/admin/students/",
    icon: AcademicCapIcon,
    name: "Students",
  },
  {
    path: "/admin/logs/",
    icon: ClipboardListIcon,
    name: "Logs",
  },
];
