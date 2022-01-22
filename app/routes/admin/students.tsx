import { json, LoaderFunction, Outlet, useCatch, useLoaderData } from "remix";
import { people } from "~/data/students";
import { brzLoginRequestHandler } from "~/services/brz.server";
import { getSession, commitSession } from "~/services/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const brzLoginResponse = await brzLoginRequestHandler();

  const session = await getSession(request);
  session.set("brz_auth", brzLoginResponse);

  return json(people, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
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
        status: {caught.status}
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
