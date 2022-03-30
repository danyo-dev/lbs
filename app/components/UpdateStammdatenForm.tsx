import { useEffect } from "react";
import { useFetcher } from "remix";
import { toast } from "react-toastify";

import { toastConfig } from "~/config/settings";
import { StammdatenProfile } from "~/types/brzTypes";
import { InputField } from "~/components/InputField";
import { formatBirthdates } from "~/utils/dateUtils";

interface Props {
  data: StammdatenProfile | undefined;
}

export default function UpdateStammdatenForm({ data }: Props) {
  const fetcher = useFetcher();

  // create object from BrzGeneralDataBoxItem
  const stammdatenFormFields: StammdatenProfile = {
    vorname: data?.vorname || "",
    geb: formatBirthdates(data?.geb) || "",
    name: data?.name || "",
    email: data?.email || "",
    strasse: data?.strasse || "",
    strasse2: data?.strasse2 || "",
    plz: data?.plz || "",
    ort: data?.ort || "",
    land: data?.land || "",
  };

  useEffect(() => {
    if (fetcher.data) {
      const { vorname, nachname } = fetcher.data._fields;
      toast.success(
        `Stammdaten für ${vorname[0]} ${nachname[0]} erfolgreich aktualisiert`,
        toastConfig
      );
    }
  }, [fetcher.data]);

  const formfieldsToRender = stammdatenFormFields;

  return (
    <fetcher.Form
      method="post"
      action="/admin/api/brz/updateStammdaten"
      className="bg-white shadow overflow-hidden rounded-lg p-4"
    >
      {Object.entries(formfieldsToRender).map(([label, value], idxA) => {
        console.log(value);

        if (label === "geb") {
          return (
            <InputField
              key={`label-${idxA}`}
              label={label}
              value={value}
              inputType="date"
            />
          );
        }

        return <InputField key={`label-${idxA}`} label={label} value={value} />;
      })}
      <button type="submit" className="submitBtn">
        Daten aktualisieren
      </button>
    </fetcher.Form>
  );
}
