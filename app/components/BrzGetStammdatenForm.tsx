import React from "react"
import { useFetcher } from "remix"
import { getCurrentSemester, getSemesterSelection } from "~/utils/dateUtils"
import { InputField } from "./InputField"

interface Props {
  FetcherForm: ReturnType<typeof useFetcher>["Form"]
  isSubmitting: Boolean
}

export default function BrzGeneralDataForm({
  FetcherForm,
  isSubmitting,
}: Props) {
  return (
    <FetcherForm
      method="get"
      action={`/admin/api/brz/getStammdaten`}
      className=" bg-white overflow-hidden rounded-lg  p-3"
    >
      <div className="px-6 py-3 bg-white  overflow-hidden">
        <div className="grid grid-cols-12 gap-6 ">
          <div className="col-span-6">
            <InputField label="matrikelnummer" required />
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
              {getSemesterSelection().map((el, idx) => {
                return (
                  <React.Fragment key={`el-${idx}`}>
                    <option value={`${el}S`} key={`${el}S`}>{`${el}S`}</option>
                    <option value={`${el}W`} key={`${el}W`}>{`${el}W`}</option>
                  </React.Fragment>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 text-right">
        <button
          disabled={Boolean(isSubmitting)}
          type="submit"
          className="submitBtn"
        >
          Abfragen
        </button>
      </div>
    </FetcherForm>
  )
}
