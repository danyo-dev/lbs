import { StudentProfile, FullStudentProfile } from "~/types/responseTypes";

/**
 * extract only needed attributes from student profile
 */
export function cleanupStudentAttributes({
  _attributes,
}: {
  _attributes: FullStudentProfile;
}): StudentProfile {
  const {
    birthName,
    birthdate,
    email,
    firstname,
    id,
    lastname,
    phone,
    street,
    street2,
    title,
    username,
    zip,
  } = _attributes;

  return {
    birthName,
    birthdate,
    email,
    firstname,
    id,
    lastname,
    phone,
    street,
    street2,
    title,
    username,
    zip,
  };
}
