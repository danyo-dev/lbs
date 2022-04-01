import { useFetcher } from "remix"
import { InputField } from "~/components/InputField"
import { formatBirthdates } from "~/utils/dateUtils"
import { BRZ_StammDatenProfile } from "~/types/StudentTypes"

interface Props {
  data: BRZ_StammDatenProfile | undefined
}

export default function PostStammdatenForm({ data }: Props) {
  const fetcher = useFetcher()

  // create object from profil Type
  const stammdatenFormFields: BRZ_StammDatenProfile = {
    vorname: data?.vorname || "",
    name: data?.name || "",
    geb: data?.geb || null,
    email: data?.email || "",
    anrede: data?.anrede || null,
    staatsangehoerigkeit: data?.staatsangehoerigkeit || "",
  }

  const formfieldsToRender = stammdatenFormFields

  return (
    <fetcher.Form
      method="post"
      action="/admin/api/brz/postStammdaten"
      className="bg-white shadow overflow-hidden rounded-lg p-4"
    >
      {Object.entries(formfieldsToRender).map(([label, value], idxA) => {
        if (label === "anrede") {
          return (
            <InputField
              key={`label-${idxA}`}
              label={label}
              value={value === 1 ? "M" : "W"}
            />
          )
        }
        if (label === "geb") {
          return (
            <InputField
              key={`label-${idxA}`}
              label={label}
              value={formatBirthdates(value) || ""}
              inputType="date"
            />
          )
        }
        return (
          <InputField
            key={`label-${idxA}`}
            label={label}
            value={value ? value.toString() : ""}
          />
        )
      })}
      <button type="submit" className="submitBtn">
        Daten aktualisieren
      </button>
    </fetcher.Form>
  )
}
