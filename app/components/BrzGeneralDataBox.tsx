import { BrzGeneralDataBoxItem } from "~/types/brzTypes";

interface Props {
  generalData: BrzGeneralDataBoxItem;
}
export default function BrzGeneralDataBox({ generalData }: Props) {
  const mapTextToItem: BrzGeneralDataBoxItem = {
    vorname: "Vorname",
    nachname: "Nachname",
    geburtsdatum: "Geburtsdatum",
    svnr: "Svnr",
    geschlecht: "Geschlecht",
    staatsbuergerschaft: "Staat",
  };

  return (
    <ul className="text-slate-500 text-sm ">
      {}
      {Object.keys(generalData).map((dataItem, idx) => {
        return (
          <li key={`${idx}-${dataItem}`} className="grid grid-cols-4 py-1">
            <div className="mr-2 text-slate-600 font-medium">{`${mapTextToItem[dataItem]}:`}</div>
            {`${dataItem}._text`}
          </li>
        );
      })}
    </ul>
  );
}
