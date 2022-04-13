import { ArrowLeftIcon } from "@heroicons/react/outline"
import { Link, useFetcher } from "remix"
import BrzGetMatrikelForm from "~/components/BrzGetMatrikelForm"
import BrzMatrikelDataBox from "~/components/BrzMatrikelDataBox"
import { BRZ_MatrikelRequest } from "~/types/studentTypes"

export default function MatrikelQueryRoute() {
  const matrikelFetcher = useFetcher<BRZ_MatrikelRequest>()
  return (
    <>
      <div className="flex items-center mr-6">
        <Link to="/admin/dashboard">
          <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
        </Link>
      </div>
      <div className="w-full my-6 grid grid-cols-12 gap-6 ">
        <section className=" border-slate-200 col-span-6">
          <h2 className="text-xl text-slate-600 mb-2 ml-2">
            BRZ Matrikeldaten Abfragen
          </h2>
          <BrzGetMatrikelForm
            Form={matrikelFetcher.Form}
            state={matrikelFetcher.state}
            student={matrikelFetcher.data}
          />
        </section>

        <section className="border-slate-200 gap-6 col-span-6">
          <h2 className="text-xl text-slate-600 mb-2 ml-2">
            BRZ Matrikeldaten Antwort
          </h2>
          <BrzMatrikelDataBox
            data={matrikelFetcher.data}
            type={matrikelFetcher.type}
          />
        </section>
      </div>
    </>
  )
}
