import { PrismaClient } from '@prisma/client';
import { SSHConnection } from 'node-ssh-forward';
import { handleCache } from '~/utils/cacheUtils';
require('~/patches/patches.js');
// useing require here because TS yells when importing and no Types are defined
const portUsed = require('port-used');

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  db = global.__db;
}

const sshConfig = {
  endHost: process.env.AC5_SSH_HOST as string,
  username: process.env.AC5_SSH_USER as string,
  privateKey: process.env.AC5_SSH_KEY ? Buffer.from(process.env.AC5_SSH_KEY, 'base64').toString('utf-8') : undefined,
  passphrase: process.env.AC5_SSH_PASSPHRASE as string,
};

const forwardConfig = {
  fromPort: 3306,
  toHost: process.env.AC5_DB_HOST as string,
  toPort: 3306, // sql default
};

/**
 * establishes ssh connecton and tunnel
 * returns connection to close it manually

 * @return {sshConnection}
 */
export async function connectDB<DBQueryFn extends (...args: any) => any>(
  dbQueryFn: DBQueryFn
): Promise<ReturnType<DBQueryFn>> {
  // check if port is in use
  const tunnelOpen = await portUsed.check(3306, '127.0.0.1');
  const sshConnection = new SSHConnection(sshConfig);

  // only run forwarding when port is not used
  if (!tunnelOpen) {
    await sshConnection.forward(forwardConfig).catch((err) => {
      console.log('SSH Connection error', err);
    });
  }

  const result = await dbQueryFn();

  // disconnect SSH to avoid opening multiple connections
  sshConnection.shutdown();

  return result;
}
function queryRelevantStudents() {
  return db.profil_semester.findMany({
    where: {
      term: 1,
      jahr: 2022,
    },
    select: {
      pid: true,
    },
  });
}

function queryStudentProfiles(profiles: { id: bigint }[]) {
  return db.profil.findMany({
    where: {
      OR: [...profiles],
    },
    select: {
      id: true,
      vorname: true,
      name: true,
      email: true,
    },
  });
}

function queryProfile(id: number) {
  return db.profil.findUnique({
    where: {
      id,
    },
    select: {
      titel: true,
      title_postposed: true,
      staatsangehoerigkeit: true,
      anrede: true,
      geb: true,
      name: true,
      middlename: true,
      vorname: true,
      email: true,
    },
  });
}

function queryBisProfileProperties(id: number) {
  return db.bis_profile_property.findUnique({
    where: {
      profile_id: id,
    },
    select: {
      matriculation_number: true,
      replacement_label: true,
      sector_specific_pin: true,
      social_insurance_number: true,
    },
  });
}

function queryCountries(ids: number[]) {
  return db.laender.findMany({
    where: { id: { in: [...ids] } },
  });
}

function queryAddresses(id: number) {
  return db.pm_fields.findMany({
    where: {
      OR: [{ adresstyp: 4 }, { adresstyp: 5 }],
      AND: [{ pid: id }],
    },
    select: {
      strasse: true,
      plz: true,
      ort: true,
      land: true,
      typ: true,
    },
  });
}

function queryMnr(id: number) {
  return db.profil_studium.findMany({
    where: {
      pid: id,
      NOT: {
        mnr: '',
      },
    },
    select: {
      mnr: true,
    },
  });
}

function queryFinancials(id: number) {
  return db.financial_invoice.findFirst({
    where: {
      profile_id: id,
    },
    select: {
      due_date: true,
    },
  });
}

export async function getMnr(profileId: string) {
  try {
    return await connectDB(() => queryMnr(parseInt(profileId)));
  } catch (error) {
    console.log(error);
  }
}
export async function getFinancials(profileId: string) {
  try {
    return await connectDB(() => queryFinancials(parseInt(profileId)));
  } catch (error) {
    console.log(error);
  }
}

export async function getAddresses(profileId: string) {
  try {
    return await connectDB(() => queryAddresses(parseInt(profileId)));
  } catch (error) {
    console.log(error);
  }
}

export async function getBisProfileProperties(profileId: string) {
  try {
    return await connectDB(() => queryBisProfileProperties(parseInt(profileId)));
  } catch (error) {
    console.log(error);
  }
}

export async function getCountries(...countries: number[]) {
  try {
    return await connectDB(() => queryCountries(countries.filter(Boolean)));
  } catch (error) {
    console.log(error);
  }
}

export async function getProfile(profileId: string) {
  return handleCache(`studentProfile_${profileId}`, async () => {
    try {
      return await connectDB(() => queryProfile(parseInt(profileId)));
    } catch (error) {
      console.log(error);
    }
  });
}

export async function getProfiles(profiles: { id: bigint }[]) {
  return handleCache('students', async () => {
    try {
      return await connectDB(() => queryStudentProfiles(profiles));
    } catch (error) {
      console.log(error);
    }
  });
}

export async function getRelevantProfiles() {
  return handleCache('studentRelevantProfiles', async () => {
    try {
      return await connectDB(queryRelevantStudents);
    } catch (error) {
      console.log(error);
    }
  });
}
