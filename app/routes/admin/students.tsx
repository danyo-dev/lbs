import { Form, LoaderFunction, Outlet, useCatch } from "remix";
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
        {caught.status === 401 && (
          <Form method="post" action="/auth/logout">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Please Login again
            </button>
          </Form>
        )}
      </div>
      <div>
        Please contact{" "}
        <a className="text-blue-600" href='mailTo="#"'>
          support{" "}
        </a>
        for assistance
      </div>
    </div>
  );
}
