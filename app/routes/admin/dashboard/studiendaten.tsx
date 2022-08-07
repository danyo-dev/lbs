import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Link, useFetcher } from "@remix-run/react";
import BrzGetStudiendatenForm from "~/components/BrzGetStudiendatenForm";
import BrzStudiendatenBox from "~/components/BrzStudiendatenBox";
import { BrzStudienDaten } from "~/types/brzTypes";

export default function StudiendatenQueryRoute() {
  const fetcherData = useFetcher<BrzStudienDaten>();
  return (
    <>
      <div className="flex items-center mr-6">
        <Link to="/admin/dashboard">
          <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
        </Link>
      </div>
      <div className="w-full my-6 grid grid-areas-overview grid-cols-2 gap-8">
        <section className=" border-slate-200 ">
          <div className=" border-slate-200 ">
            <h2 className="text-xl text-slate-600 mb-2 ml-2">
              BRZ Studiendaten Abfragen
            </h2>
            <BrzGetStudiendatenForm
              FetcherForm={fetcherData.Form}
              isSubmitting={fetcherData.state === "submitting"}
            />
          </div>
        </section>

        <section className="border-slate-200">
          <h2 className="text-xl text-slate-600 mb-2 ml-2">BRZ Studiendaten</h2>
          <BrzStudiendatenBox data={fetcherData.data} type={fetcherData.type} />
        </section>
      </div>
    </>
  );
}
