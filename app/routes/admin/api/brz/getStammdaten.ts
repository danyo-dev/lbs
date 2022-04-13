import { LoaderFunction, json } from 'remix';
import { getParsedStammdaten } from '~/utils/brzUtils';
import { requireAuthentication } from '~/services/auth.server';
import { brzAuthenticationHandler, requestBrzStammdaten } from '~/services/brzService';
import getCleanQueryString from '~/utils/getCleanQueryString';

export const loader: LoaderFunction = async ({ request }) => {
  await requireAuthentication(request);

  const url = new URL(request.url);

  console.log(url);

  if (url.search === '') {
    throw Error('Bad Request');
  }

  const { cleanedQueryString } = getCleanQueryString(url);

  const brzSession = await brzAuthenticationHandler(request);
  const stammDatenData = await requestBrzStammdaten(brzSession, cleanedQueryString);

  if (!stammDatenData) {
    throw json('this should not be possible', { status: 500 });
  }

  const parsedStammdaten = getParsedStammdaten(stammDatenData);
  const stammDaten = parsedStammdaten.stammdatenanfrage.stammdaten;

  if (stammDaten) {
    return json(stammDaten);
  }
  return null;
};
