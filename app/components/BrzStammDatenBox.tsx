export default function BrzStammDatenBox({ stammDaten }) {
  const {
    vorname,
    nachname,
    geburtsdatum,
    svnr,
    geschlecht,
    staatsbuergerschaft,
  } = stammDaten;

  return (
    <ul className="text-slate-500 text-sm ">
      <li className="grid grid-cols-4 py-1">
        <div className="mr-2 text-slate-600 font-medium">Vorname:</div>
        {vorname._text}
      </li>
      <li className="grid grid-cols-4 py-1">
        <span className="mr-2 text-slate-600 font-medium">Nachname:</span>
        {nachname._text}
      </li>
      <li className="grid grid-cols-4 py-1">
        <span className="mr-4 text-slate-600 font-medium">Geburtsdatum:</span>
        {geburtsdatum._text}
      </li>
      <li className="grid grid-cols-4 py-1">
        <span className="mr-2 text-slate-600 font-medium">Svnr:</span>
        {svnr._text}
      </li>
      <li className="grid grid-cols-4 py-1">
        <span className="mr-2 text-slate-600 font-medium">Geschlecht:</span>
        {geschlecht._text}
      </li>
      <li className="grid grid-cols-4 py-1">
        <span className="mr-2 text-slate-600 font-medium">Staat:</span>
        {staatsbuergerschaft._text}
      </li>
    </ul>
  );
}
