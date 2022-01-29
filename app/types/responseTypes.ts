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

export interface FullStudentProfile {
  active: string;
  additionalAddress: string;
  birthCountryId: string;
  birthdate: string;
  birthName: string;
  city: string;
  cityOfBirth: string;
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
  lastLoginTime: string;
  lastname: string;
  locked: string;
  loginAttempts: string;
  middleName: string;
  mobile: string;
  nationality2Id: string;
  nationalityId: string;
  password: string;
  phone: string;
  salutationId: string;
  street: string;
  street2: string;
  successfulLogins: string;
  title: string;
  titlePostposed: string;
  username: string;
  zip: string;
  hasNewsletter: string;
}

export type StudentProfile = Pick<
  FullStudentProfile,
  | "birthName"
  | "birthdate"
  | "email"
  | "firstname"
  | "id"
  | "lastname"
  | "phone"
  | "street"
  | "street2"
  | "title"
  | "username"
  | "zip"
>;

export type SoapStudentResponse = SoapBody<{
  "ns1:fetchProfileByAccessGroupIdsResponse": {
    fetchProfileByAccessGroupIdsResponse: {
      profile: Array<{ _attributes: FullStudentProfile }>;
    };
  };
}>;

export type SoapAuthResponse = SoapBody<AuthResponse>;
export type SoapProfileResponse = SoapBody<ProfileResponse>;
