import { LoaderFunction, Outlet } from "remix";
import {
  checkAuthStatus,
  handleAuthFailureRedirect,
} from "~/services/checkAuthStatus";
import Sidebar from "~/components/Sidebar";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await checkAuthStatus(request);
  if (await checkAuthStatus(request)) return user;
  return await handleAuthFailureRedirect(request);
};

export default function Index() {
  return (
    <div className="flex">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5 px-10 pt-10">
        <Outlet />
      </div>
    </div>
  );
}
