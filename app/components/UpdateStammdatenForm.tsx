import { useEffect } from "react";
import { useFetcher } from "remix";
import { toast } from "react-toastify";

import { toastConfig } from "~/config/settings";
import { BrzGeneralDataBoxItem } from "~/types/brzTypes";
import { InputField } from "~/components/InputField";

interface Props {
  data: BrzGeneralDataBoxItem | undefined;
}

export default function UpdateStammdatenForm({ data }: Props) {
  const fetcher = useFetcher();

  // create object from BrzGeneralDataBoxItem
  const stammdatenFormFields: BrzGeneralDataBoxItem = {
    vorname: { _text: "" },
    nachname: { _text: "" },
    geburtsdatum: { _text: "" },
    svnr: { _text: "" },
    geschlecht: { _text: "" },
    staatsbuergerschaft: { _text: "" },
    akadnach: { _text: "" },
    bpk: { _text: "" },
    adressen: {
      adresse: [
        {
          strasse: { _text: "" },
          plz: { _text: "" },
          ort: { _text: "" },
          staat: { _text: "" },
          typ: { _text: "" },
        },
      ],
    },
    beitragstatus: { _text: "" },
    zaehlungPePn: { _text: "" },
    zaehlungPo: { _text: "" },
    emailliste: {
      email: {
        emailadresse: { _text: "" },
      },
    },
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

  const formfieldsToRender = data ? data : stammdatenFormFields;

  return (
    <fetcher.Form
      method="post"
      action="/admin/api/brz/updateStammdaten"
      className="bg-white shadow overflow-hidden rounded-lg p-4"
    >
      {Object.entries(formfieldsToRender).map(([label, value], idxA) => {
        if (label === "adressen") {
          return (value as BrzGeneralDataBoxItem["adressen"]).adresse.map(
            (adresse, idxB) => {
              return (
                <fieldset key={`adresses-${idxB + 1}`}>
                  <legend className="border-b-2 mb-2">
                    Adresse {idxB + 1}
                  </legend>
                  {Object.entries(adresse).map(([label, value], idxC) => {
                    return (
                      <InputField
                        key={`label-${idxB}-${idxC}`}
                        label={label}
                        value={value._text}
                      />
                    );
                  })}
                </fieldset>
              );
            }
          );
        }

        if (label === "emailliste") {
          return (
            <InputField
              key={`label-${idxA}`}
              label={label}
              value={value.email.emailadresse._text}
              inputType="email"
            />
          );
        }

        return (
          <InputField key={`label-${idxA}`} label={label} value={value._text} />
        );
      })}
      <button type="submit" className="submitBtn">
        Daten aktualisieren
      </button>
    </fetcher.Form>
  );
}
