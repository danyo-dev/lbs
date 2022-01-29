import soapRequest from "easy-soap-request";

export function getAuthXML(username: string, password: string) {
  return `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:core="http://ac5.simovative.de/core/">
      <soap:Header/>
      <soap:Body>
        <core:login>
            <username>${username}</username>
            <password>${password}</password>
        </core:login>
      </soap:Body>
    </soap:Envelope>
`;
}

export function getPersonIdXML(profileId: number) {
  return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prof="http://ac5.simovative.de/profile/">
      <soapenv:Header/>
      <soapenv:Body>
        <prof:fetchProfileById>
          <profileId>${profileId}</profileId>
        </prof:fetchProfileById>
      </soapenv:Body>
    </soapenv:Envelope>
  `;
}

export function getStudentProfilesXML() {
  return `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:prof="http://ac5.simovative.de/profile/">
      <soapenv:Header/>
        <soapenv:Body>
          <prof:fetchProfileByAccessGroupIds>
            <accessGroupIds/>
          </prof:fetchProfileByAccessGroupIds>
        </soapenv:Body>
    </soapenv:Envelope>
  `;
}

/**
 * take in soap response, return body or throw statusCode error
 * @param soapResponse
 * @returns soapResponse
 */
export function handleSoapResponseError(
  soapResponse: Awaited<ReturnType<typeof soapRequest>>
) {
  if (soapResponse.response.statusCode >= 200 && soapResponse.response.statusCode <= 299) {
    return soapResponse;
  } else {
    throw Error(`${soapResponse.response.statusCode}`);
  }
}
