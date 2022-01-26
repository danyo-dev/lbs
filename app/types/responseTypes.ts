interface SoapBody<SoapContent extends {}> {
  "SOAP-ENV:Envelope": {
    "SOAP-ENV:Body": SoapContent;
  };
}

interface AuthResponse {
  "ns1:loginResponse": {
    loginResponse: {
      _text: string;
    };
  };
}

interface ProfileResponse {
  "ns1:fetchProfileByIdResponse": {
    fetchProfileByIdResponse: {
      _attributes: {
        active: string;
        community: string;
        countryId: string;
        createdTime: string;
        createdUserId: string;
        currentLoginTime: string;
        dispatchRouteLetter: string;
        dispatchRouteEmail: string;
        dispatchRoutePhone: string;
        editTime: string;
        editUserId: string;
        email: string;
        firstname: string;
        grade: string;
        id: string;
        infopoolFolderId: string;
        languageOfCorrespondence: string;
        lastname: string;
        locked: string;
        loginAttempts: string;
        password: string;
        salutationId: string;
        successfulLogins: string;
        username: string;
        hasNewsletter: string;
      };
    };
  };
}

export type SoapAuthResponse = SoapBody<AuthResponse>;
export type SoapProfileResponse = SoapBody<ProfileResponse>;