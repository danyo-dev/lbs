import { ArrowLeftIcon } from '@heroicons/react/outline';
import { json, Link, LoaderFunction, NavLink, Outlet, useCatch } from 'remix';
import { studentDetailRoutes } from '~/config/routes';

import {
  withDatabase,
  getAddresses,
  getBisProfileProperties,
  getProfile,
  getCountries,
  getMnr,
  getFinancialDueDate,
  getFinancialProfile,

} from '~/services/db.server';
import { CompleteStudentProfile } from '~/types/StudentTypes';

export const loader: LoaderFunction = ({ params }) => {
  return withDatabase(async () => {
    if (!params.studentId) {
      throw new Response('no student ID has been set');
    }

    const [
      studentProfileData,
      // fetch matrikel number, bpk, svnr, ekz
      bisProfileProperties,
      // fetch student Financial profile
      financialProfile,
      // fetch dueDate, financials
      dueDate,
      // fetch Address data from AC5_DB
      addresses,
      // fetch MNR number
      mnr,
    ] = await Promise.all([
      getProfile(params.studentId),
      getBisProfileProperties(params.studentId),
      getFinancialProfile(params.studentId),
      getFinancialDueDate(params.studentId),
      getAddresses(params.studentId),
      getMnr(params.studentId),
    ]);

    if (!studentProfileData) {
      throw new Response(`No profile found with ID Nr: ${params.studentId}`, {
        status: 404,
      });
    }

    // Every profile needs two addresses , so if only one is in the database a second one is created with the first address
    const countryId_1 = Number(addresses?.[0]?.land);
    const countryId_2 = addresses?.[1]?.land ? Number(addresses?.[1]?.land) : Number(addresses?.[0]?.land);
    const citizenshipId = Number(studentProfileData?.staatsangehoerigkeit);

    // fetch  country data  with bis_code
    const countryData = await getCountries(countryId_1, countryId_2, citizenshipId);

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

    const completeStudentProfile: CompleteStudentProfile = {
      stammDaten: {
        ...studentProfileData,
        matrikelnummer: bisProfileProperties?.matriculation_number || '',
        bpk: bisProfileProperties?.sector_specific_pin,
        svnr: bisProfileProperties?.social_insurance_number,
        staatsangehoerigkeit: getCountryBisCode(Number(citizenshipId)),
        addresses: mappedAdressesWithBisCode,
        ekz: bisProfileProperties?.replacement_label,
        perskz: mnr?.[0]?.mnr,
        valutadatum: dueDate?.due_date,
      },
      financialData: [...(financialProfile || [])],
    };

    return json(completeStudentProfile);
  })
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
