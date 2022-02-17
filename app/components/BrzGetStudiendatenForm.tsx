import { ForwardRefExoticComponent, RefAttributes } from "react";
import { FormProps } from "remix";
import { getCurrentSemester, getSemesterSelection } from "~/utils/dateUtils";

interface Props {
  Form: ForwardRefExoticComponent<FormProps & RefAttributes<HTMLFormElement>>;
  isSubmitting: Boolean;
}

export default function BrzGetStudiendatenForm({ Form, isSubmitting }: Props) {
  return (
    <Form
      method="get"
      action={`/admin/api/brz/getStudiendaten`}
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
            <select
              className="dropDown"
              name="semester"
              defaultValue={getCurrentSemester()}
            >
              {getSemesterSelection().map((el) => {
                return (
                  <>
                    <option value={`${el}S`} key={`${el}S`}>{`${el}S`}</option>
                    <option value={`${el}W`} key={`${el}W`}>{`${el}W`}</option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-slate-50 text-right">
        <button
          disabled={isSubmitting ? true : false}
          type="submit"
          className="submitBtn"
        >
          Abfragen
        </button>
      </div>
    </Form>
  );
}
