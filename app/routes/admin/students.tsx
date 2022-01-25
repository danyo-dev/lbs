import { LoaderFunction, Outlet, useCatch } from "remix";
import { people as data } from "~/data/students";

export const loader: LoaderFunction = () => {
  return data;
};

export default function Students() {
  return <Outlet />;
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="error-container">
      <div>
        Problems fetching data. Unexpected caught response with status:{" "}
        {caught.status}.
      </div>
      <div>
        Please try refreshing the browser or contact
        <a className="text-sky-600 mx-2" href='mailTo="#"'>
          support
        </a>
        for assistance
      </div>
    </div>
  );
}
