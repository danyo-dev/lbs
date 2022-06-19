import { PrismaClient } from '@prisma/client';
import { SSHConnection } from 'node-ssh-forward';
import { handleCache } from '~/utils/cacheUtils';
import { currentYear } from '~/utils/dateUtils';
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
 * establishes ssh connecton with ssh tunnel and establishes DB connection
 * returns function to close db and ssh connection manually

 * @return {closeDBConnection}
 */
export async function connectDB() {
  let connectionStatus = {
    db: false,
    ssh: false,
  }
  // check if port is in use
  const tunnelOpen = await portUsed.check(3306, '127.0.0.1');
  const sshConnection = new SSHConnection(sshConfig);

  // only run forwarding when port is not used
  if (!tunnelOpen) {
    await sshConnection.forward(forwardConfig).catch((err) => {
      console.log('SSH Connection error', err);
    });
    connectionStatus.ssh = true;
  }
  await db.$connect().catch((err) => {
    console.log('DB Connection error', err);
  });
  connectionStatus.db = true;

  async function closeConnection() {
    await db.$disconnect();
    sshConnection.shutdown();

    connectionStatus = {
      ssh: false,
      db: false,
    }
  }

  return { connectionStatus, closeConnection };
}

export function withDatabase(fn: () => Promise<any>) {
  return async () => {
    const { connectionStatus, closeConnection } = await connectDB();
    try {
      return await fn();
    } finally {
      closeConnection();
    }
  };
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

function queryFinancialDueDate(id: number) {
  return db.financial_invoice.findFirst({
    where: { AND: [{ profile_id: id }, { year: currentYear }] },
    select: {
      due_date: true,
    },
  });
}

function queryFinancialInfo(id: number) {
  return db.financial_invoice.findMany({
    where: {
      profile_id: id,
    },
    select: {
      amount: true,
      invoice_date: true,
      invoice_number: true,
      due_date: true,
      year: true,
      term: true,
    },
  });
}

export function getMnr(profileId: string) {
  try {
    return queryMnr(parseInt(profileId))
  } catch (error) {
    console.log(error);
  }
}
export function getFinancialDueDate(profileId: string) {
  try {
    return queryFinancialDueDate(parseInt(profileId));
  } catch (error) {
    console.log(error);
  }
}
export function getFinancialProfile(profileId: string) {
  try {
    return queryFinancialInfo(parseInt(profileId));
  } catch (error) {
    console.log(error);
  }
}

export function getAddresses(profileId: string) {
  try {
    return queryAddresses(parseInt(profileId));
  } catch (error) {
    console.log(error);
  }
}

export function getBisProfileProperties(profileId: string) {
  try {
    return queryBisProfileProperties(parseInt(profileId));
  } catch (error) {
    console.log(error);
  }
}

export function getCountries(...countries: number[]) {
  try {
    return queryCountries(countries.filter(Boolean))
  } catch (error) {
    console.log(error);
  }
}

export function getProfile(profileId: string) {
  return handleCache(`studentProfile_${profileId}`, () => {
    try {
      return queryProfile(parseInt(profileId));
    } catch (error) {
      console.log(error);
    }
  });
}

export function getProfiles(profiles: { id: bigint }[]) {
  return handleCache('students', () => {
    try {
      return queryStudentProfiles(profiles);
    } catch (error) {
      console.log(error);
    }
  });
}

export function getRelevantProfiles() {
  return handleCache('studentRelevantProfiles', () => {
    try {
      return queryRelevantStudents();
    } catch (error) {
      console.log(error);
    }
  });
}
