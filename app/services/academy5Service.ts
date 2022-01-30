import soapRequest from "easy-soap-request";
import convert from "xml-js";
import {
  getAuthXML,
  getPersonIdXML,
  getStudentProfilesXML,
  handleSoapResponseError
} from "~/utils/soapUtils";

import { cleanupStudentAttributes } from "~/utils/studentUtils";

import {
  SoapAuthResponse,
  SoapProfileResponse,
  SoapStudentResponse,
} from "~/types/responseTypes";

// all authentication has to happen with this endpoint
const coreAuthEndpoint = `${process.env.ACADEMY5_BASE_URL}/core`;
const profileEndpoint = `${process.env.ACADEMY5_BASE_URL}/profile`;

const headers = {
  "Content-Type": "text/xml;charset=UTF-8",
  SOAPAction: "#POST",
};

/**
 * authentication on the core service of academy 5
 * @returns string - auth token
 */
export async function authenticateSoap() {
  try {
    const { ACADEMY5_USERNAME: username, ACADEMY5_PASSWORD: password } =
      process.env;

    if (!username || !password) {
      throw new Error(
        "ACADEMY5_USERNAME and ACADEMY5_PASSWORD must be set in .env"
      );
    }

    const request = await soapRequest({
      url: coreAuthEndpoint,
      headers,
      xml: getAuthXML(username, password),
    });

    const { response } = handleSoapResponseError(request);

    // convert response to json
    const responseBody = convert.xml2js(response.body, {
      compact: true,
    }) as SoapAuthResponse;

    const authToken =
      responseBody["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["ns1:loginResponse"]
        .loginResponse._text;

    return authToken;
  } catch (error) {
    console.log(error);
  }
}

/**
 * fetch person by id from academy 5, authenticate first
 * @param profileId number
 * @returns
 */
export async function fetchProfileSoap(profileId = 5555) {
  try {
    const authToken = await authenticateSoap();

    const request = await soapRequest({
      url: profileEndpoint,
      headers: {
        ...headers,
        Cookie: `PHPSESSID=${authToken}`,
      },
      xml: getPersonIdXML(profileId),
    });

    const { response } = handleSoapResponseError(request);

    // convert response to json
    const responseBody = convert.xml2js(response.body, {
      compact: true,
    }) as SoapProfileResponse;

    return responseBody["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
      "ns1:fetchProfileByIdResponse"
    ].fetchProfileByIdResponse._attributes;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchStudentProfiles() {
  try {
    const authToken = await authenticateSoap();

    const request = await soapRequest({
      url: profileEndpoint,
      headers: {
        ...headers,
        Cookie: `PHPSESSID=${authToken}`,
      },
      xml: getStudentProfilesXML(),
    });

    const { response } = handleSoapResponseError(request);
    // convert response to json
    const responseBody = convert.xml2js(response.body, {
      compact: true,
    }) as SoapStudentResponse;

    /**
     * cleanup response and remove unwanted soap key
     * send back only necessary profile data
     */
    const students = responseBody["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][
      "ns1:fetchProfileByAccessGroupIdsResponse"
    ].fetchProfileByAccessGroupIdsResponse.profile
      .slice(0, 50) // strip them down to 50 for now
      .map(cleanupStudentAttributes);

    return students;
  } catch (error) {
    console.log(error);
  }
}
