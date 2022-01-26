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
