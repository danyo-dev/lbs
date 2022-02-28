import { useEffect } from 'react';
import { useActionData, Form, useFetcher } from "remix";
import { toast } from "react-toastify";

import { toastConfig } from '~/config/settings';
import { BrzGeneralDataBoxItem } from "~/types/brzTypes";
import { InputField } from '~/components/InputField';

interface Props {
  data: BrzGeneralDataBoxItem | undefined;
}

export default function UpdateStammdatenForm({ data }: Props) {
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data) {
      const { vorname, nachname } = fetcher.data._fields;
      toast.success(
        `Stammdaten für ${vorname[0]} ${nachname[0]} erfolgreich aktualisiert`,
        toastConfig
      );
    }
  }, [fetcher.data]);

  if (!data) {
    return <>Ergebnisse werden nach überprüfung der Daten geladen.</>
  }

  return (
    <fetcher.Form
      method="post"
      action="/admin/api/brz/updateStammdaten"
      className="bg-white shadow overflow-hidden rounded-lg p-4"
    >
      {Object.entries(data).map(([label, value], idxA) => {
        if (label === "adressen") {
          return (value as BrzGeneralDataBoxItem["adressen"]).adresse.map((adresse, idxB) => {
            return (
              <fieldset key={`adresses-${idxB + 1}`}>
                <legend className="border-b-2 mb-2">Adresse {idxB + 1}</legend>
                {Object.entries(adresse).map(([label, value], idxC) => {
                  return <InputField key={`label-${idxB}-${idxC}`} label={label} value={value._text} />
                })}
              </fieldset>
            )
          });
        }

        if (label === 'emailliste') {
          return <InputField key={`label-${idxA}`} label={label} value={value.email.emailadresse._text} inputType="email" />
        }

        return <InputField key={`label-${idxA}`} label={label} value={value._text} />
      })}
      <button
        type="submit"
        className="submitBtn"
      >
        Daten aktualisieren
      </button>
    </fetcher.Form>
  );
}
