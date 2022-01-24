import { useEffect } from "react";
import { Form, LoaderFunction, Outlet, useCatch, useFetcher } from "remix";
import { people as data } from "~/data/students";

export const loader: LoaderFunction = () => {
  return data;
};

export default function Students() {
  return (
    <>
      <Outlet />
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="error-container">
      <div>
        Problems connecting to remote API (BRZ). Unexpected caught response with
        status: {caught.status}.
      </div>
      <div>
        Please contact
        <a className="text-blue-600" href='mailTo="#"'>
          support{" "}
        </a>
        for assistance
      </div>
    </div>
  );
}
