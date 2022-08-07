import { ArrowLeftIcon } from "@heroicons/react/outline";
import { Link, useFetcher } from "@remix-run/react";

import BrzGetStammdatenForm from "~/components/BrzGetStammdatenForm";

import BrzStammdatenBox from "~/components/BrzStammdatenBox";
import { BrzGeneralDataBoxItem } from "~/types/brzTypes";

export default function StammdatenQueryRoute() {
  const stammdatenFetcher = useFetcher<BrzGeneralDataBoxItem>();
  return (
    <>
      <div className="flex items-center mr-6">
        <Link to="/admin/dashboard">
          <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
        </Link>
      </div>
      <div className="w-full my-6 grid grid-areas-overview grid-cols-2 gap-8">
        <section className=" border-slate-200">
          <h2 className="text-xl text-slate-600 mb-2 ml-2">
            BRZ Stammdaten Abfragen
          </h2>
          <BrzGetStammdatenForm
            FetcherForm={stammdatenFetcher.Form}
            isSubmitting={stammdatenFetcher.state === "submitting"}
          />
        </section>

        <section className="border-slate-200 ">
          <h2 className="text-xl text-slate-600 mb-2 ml-2">
            BRZ Stammdaten Antwort
          </h2>
          <BrzStammdatenBox
            data={stammdatenFetcher.data}
            type={stammdatenFetcher.type}
          />
        </section>
      </div>
    </>
  );
}
