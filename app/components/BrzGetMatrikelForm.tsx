import { ForwardRefExoticComponent, RefAttributes } from "react";
import { FormProps } from "remix";
import { StateTypes } from "~/types/generalTypes";
import { StudentProfile } from "~/types/responseTypes";

interface Props {
  Form: ForwardRefExoticComponent<FormProps & RefAttributes<HTMLFormElement>>;
  state: StateTypes;
  student?: Partial<StudentProfile>;
}
export default function BrzGetMatrikelForm({ Form, state, student }: Props) {
  return (
    <Form
      method="get"
      action={`/admin/api/brz/getMatrikel`}
      className=" bg-white  shadow overflow-hidden rounded-lg"
    >
      <div className="px-6 py-3 bg-white  shadow overflow-hidden ">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <label
              htmlFor="vorname"
              className="block text-sm font-medium text-slate-600"
            >
              Vorname
            </label>
            <input
              type="text"
              name="vorname"
              defaultValue={student?.firstname || ""}
              id="vorname"
              required
              autoComplete="given-name"
              className="inputField"
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="nachname"
              className="block text-sm font-medium text-slate-600"
            >
              Nachname
            </label>
            <input
              type="text"
              name="nachname"
              defaultValue={student?.lastname || ""}
              id="nachname"
              required
              autoComplete="family-name"
              className="inputField"
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="geburtsdatum"
              className="block text-sm font-medium text-slate-600"
            >
              Geburtsdatum
            </label>
            <input
              type="date"
              name="geburtsdatum"
              defaultValue={student?.birthdate || ""}
              id="geburtsdatum"
              required
              autoComplete="email"
              className="inputField"
            />
          </div>
          <div className="col-span-6">
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
              className="inputField"
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
          Abfragen
        </button>
      </div>
    </Form>
  );
}
