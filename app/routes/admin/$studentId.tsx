import { ArrowLeftIcon } from '@heroicons/react/outline';
import { json, Link, LoaderFunction, NavLink, Outlet, useCatch } from 'remix';
import { studentDetailRoutes } from '~/config/routes';

import { getAddresses, getBisProfileProperties, getProfile, getCountries, getMnr } from '~/services/db.server';
import { BRZ_StammDatenProfile, BisProfileProperties } from '~/types/StudentTypes';

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.studentId) {
    throw new Response('no student ID has been set');
  }

  // fetch matrikel number, bpk, svnr, ekz
  const bisProfileProperties: BisProfileProperties | undefined | null = await getBisProfileProperties(params.studentId);

  const studentProfileData = await getProfile(params.studentId);

  if (!studentProfileData) {
    throw new Response(`No profile found with ID Nr: ${params.studentId}`, {
      status: 404,
    });
  }

  // fetches Address data from AC5_DB
  const addresses = await getAddresses(params.studentId);

  // Every profile needs two addresses , so if only one is in the database a second one is created with the first address
  const countryId_1 = Number(addresses?.[0]?.land);
  const countryId_2 = addresses?.[1]?.land ? Number(addresses?.[1]?.land) : Number(addresses?.[0]?.land);
  const citizenshipId = Number(studentProfileData?.staatsangehoerigkeit);

  // Fetches the country data from AC5_DB with bis_code
  const countryData = await getCountries(countryId_1, countryId_2, citizenshipId);

  // fetch MNR number from AC5_DB
  const mnr = await getMnr(params.studentId);

  function getCountryBisCode(countryId: number) {
    return countryData?.find((country) => Number(country.id) === countryId)?.bis_code;
  }

  // map addresses to country bis code
  const mappedAdressesWithBisCode = addresses?.map((address) => {
    return {
      ...address,
      land: getCountryBisCode(Number(address.land)) || '',
    };
  });

  // push the same address to the end of the array
  if (mappedAdressesWithBisCode?.length === 1) {
    mappedAdressesWithBisCode.push(mappedAdressesWithBisCode[0]);
  }

  const fullStudentProfile: BRZ_StammDatenProfile = {
    ...studentProfileData,
    matrikelnummer: bisProfileProperties?.matriculation_number || '',
    bpk: bisProfileProperties?.sector_specific_pin,
    svnr: bisProfileProperties?.social_insurance_number,
    staatsangehoerigkeit: getCountryBisCode(Number(citizenshipId)),
    addresses: mappedAdressesWithBisCode,
    ekz: bisProfileProperties?.replacement_label,
    perskz: mnr?.[0]?.mnr,
  };

  return json(fullStudentProfile);
};

export default function EditStudent() {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="flex items-center mr-6">
          <Link to="/admin/students">
            <ArrowLeftIcon className="h-5 w-5 text-slate-600" />
          </Link>
        </div>

        <ul className="text-slate-600 flex ">
          {studentDetailRoutes.map((route, idx) => (
            <li key={idx} className="mr-2">
              <NavLink to={`${route.path}`} className={({ isActive }) => (isActive ? 'activeLink' : 'inactiveLink ')}>
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </>
  );
}
export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div className="error-container">
      <div className="text-2xl font-bold mb-2">{caught.data}</div>
      <div className="text-xl font-bold mb-2">Error: {caught.status}</div>
    </div>
  );
}
