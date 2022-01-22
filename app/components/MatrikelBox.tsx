import { useLoaderData, useMatches, useParams } from "remix";

export default function MatrikelBox() {
  const data = useLoaderData();

  return (
    <div className="bg-white py-6 px-6 my-6 shadow border-slate-200 rounded-lg w-1/3 text-sm text-slate-500">
      {data.matrikelStatusCode == 1 ? (
        <div className="flex justify-between items-center">
          <p>Keine Matrikelnummer gefunden</p>
          <button className=" justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Reservieren
          </button>
        </div>
      ) : (
        <div>
          <p>Matrikelnummer: </p>
          <p>{data.matrikelNummer}</p>
        </div>
      )}
    </div>
  );
}
