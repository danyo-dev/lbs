import soapRequest from "easy-soap-request";
import convert from "xml-js";
import { getAuthXML, getPersonIdXML } from "~/utils/xmlUtils";

import { SoapAuthResponse, SoapProfileResponse } from "~/types/responseTypes";

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

    const { response } = await soapRequest({
      url: coreAuthEndpoint,
      headers,
      xml: getAuthXML(username, password),
    });
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

    const { response } = await soapRequest({
      url: profileEndpoint,
      headers: {
        ...headers,
        Cookie: `PHPSESSID=${authToken}`,
      },
      xml: getPersonIdXML(profileId),
    });

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
