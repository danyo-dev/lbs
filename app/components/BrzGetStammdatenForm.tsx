import { ForwardRefExoticComponent, RefAttributes } from "react";
import { FormProps } from "remix";
import { StateTypes } from "~/types/generalTypes";
import { StudentProfile } from "~/types/responseTypes";

interface Props {
  Form: ForwardRefExoticComponent<FormProps & RefAttributes<HTMLFormElement>>;
  state: StateTypes;
  student?: Partial<StudentProfile>;
}
export default function BrzGeneralDataForm({ Form, state, student }: Props) {
  return (
    <Form
      method="get"
      action={`/admin/api/brz/getStammdaten`}
      className=" bg-white shadow overflow-hidden rounded-lg"
    >
      <div className="px-6 py-3 bg-white  shadow overflow-hidden ">
        <div className="grid grid-cols-12 gap-6 ">
          <div className="col-span-6">
            <label
              htmlFor="matrikelnummer"
              className="block text-sm font-medium text-slate-600"
            >
              Matrikelnr.
            </label>
            <input
              type="text"
              name="matrikelnummer"
              id="matrikelnummer"
              required
              className="inputField"
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="semester"
              className="block text-sm font-medium text-slate-600"
            >
              Semester
            </label>
            <select className="dropDown" name="semester">
              <option selected value="2021W">
                2021W
              </option>
              <option value="2021S">2021S</option>
              <option value="2020W">2020W</option>
              <option value="2020S">2020S</option>
            </select>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-slate-50 text-right">
        <button
          disabled={state === "submitting" ? true : false}
          type="submit"
          className="submitBtn"
        >
          Abfragen
        </button>
      </div>
    </Form>
  );
}
