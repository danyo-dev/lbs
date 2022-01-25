import { Form, useLoaderData } from "remix";

export default function MatrikelBox() {
  const data = useLoaderData();

  return (
    <>
      {data.matrikelStatusCode === 1 ? (
        <div className="flex justify-between items-center">
          <p>Keine Matrikelnummer gefunden</p>
          <Form method="post">
            <button
              type="submit"
              className=" justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reservieren
            </button>
          </Form>
        </div>
      ) : (
        <div>
          <p className="block text-sm font-medium text-slate-600">
            Matrikelnummer:
          </p>
          <p>{data.matrikelNummer}</p>
        </div>
      )}
    </>
  );
}
