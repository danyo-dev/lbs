import { Link, LoaderFunction, useLoaderData, useOutletContext } from "remix";
import { ArrowLeftIcon } from "@heroicons/react/outline";

export const loader: LoaderFunction = ({ params }) => {
  return params.id;
};

export default function EditStudent() {
  const studentId = useLoaderData();

  return (
    <>
      <div className="flex items-center mb-6">
        <Link to="/admin/students">
          <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
        </Link>

        <h1 className="text-2xl font-extrabold text-slate-800 ml-10 ">
          Details zu Student {studentId}
        </h1>
      </div>
      <div className="bg-slate-50 py-2 shadow border-slate-200 rounded-lg ">
        Hello
      </div>
    </>
  );
}
