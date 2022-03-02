import { Form, LoaderFunction } from "remix";
import logo from "~/assets/logo.svg";
import university from "~/assets/university.jpg";
import { authenticator } from "~/services/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/admin/dashboard",
  });
};

export default function Index() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col flex-1 px-4 py-4 sm:justify-center sm:py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-48">
        <div className="w-full max-w-lg mx-auto ">
          <div>
            <div className="flex items-center">
              <img className="w-80 rounded-lg" src={logo} />
            </div>
            <h1 className="mt-12 text-2xl font-extrabold text-gray-900 ">
              Student Management Platform
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              AcademyFive and Datenverbund (BRZ) Management Interface
            </p>
          </div>

          <div className="mt-12">
            <Form action="/auth/login" method="post">
              <button className="h-10 px-5 w-6/12 text-stone-50 transition-colors duration-150 bg-blue-500 rounded-lg focus:shadow-outline hover:bg-blue-400">
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
      <div className="relative flex-1 hidden w-0 lg:block">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src={university}
          alt="university"
        />
      </div>
    </div>
  );
}
