import { ForwardRefExoticComponent, RefAttributes } from "react";
import { FormProps, useMatches, useParams } from "remix";
import { StudentProfile } from "~/types/responseTypes";

interface Props {
  Form: ForwardRefExoticComponent<FormProps & RefAttributes<HTMLFormElement>>;
  state: string;
}
export default function BrzGeneralDataForm({ Form, state }: Props) {
  const params = useParams();
  const data = useMatches().find((m) => m.pathname === "/admin/students")?.data;

  const student = data?.find(
    (student: StudentProfile) => student.id === params.studentId
  );

  const { firstname, lastname, birthdate } = student;
  return (
    <Form
      method="get"
      action={`/admin/api/brz/general`}
      className=" bg-white col-span-6 shadow overflow-hidden rounded-lg"
    >
      <div className="px-6 py-5 bg-white col-span-6 shadow overflow-hidden ">
        <div className="grid grid-cols-8 gap-6">
          <div className="col-span-2">
            <label
              htmlFor="vorname"
              className="block text-sm font-medium text-slate-600"
            >
              Vorname
            </label>
            <input
              type="text"
              name="vorname"
              defaultValue={firstname}
              id="vorname"
              required
              autoComplete="given-name"
              className="mt-1 p-2 border focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm  border-gray-300 rounded-lg"
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="nachname"
              className="block text-sm font-medium text-slate-600"
            >
              Nachname
            </label>
            <input
              type="text"
              name="nachname"
              defaultValue={lastname}
              id="nachname"
              required
              autoComplete="family-name"
              className="mt-1 p-2 border focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
            />
          </div>

          <div className="col-span-2">
            <label
              htmlFor="geburtsdatum"
              className="block text-sm font-medium text-slate-600"
            >
              Geburtsdatum
            </label>
            <input
              type="text"
              name="geburtsdatum"
              defaultValue={birthdate}
              id="geburtsdatum"
              required
              autoComplete="email"
              className="mt-1 p-2 border focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="svnr"
              className="block text-sm font-medium text-slate-600"
            >
              Svnr:
            </label>
            <input
              type="text"
              name="svnr"
              id="svnr"
              defaultValue=""
              className="mt-1 p-2 border focus:ring-sky-500 focus:border-sky-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-slate-50 text-right">
        <button
          disabled={state === "submitting" ? true : false}
          type="submit"
          className="disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          BRZ Stammdaten Abfragen
        </button>
      </div>
    </Form>
  );
}
