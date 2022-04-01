import { PrismaClient } from "@prisma/client"
import { SSHConnection } from "node-ssh-forward"
import { handleCache } from "~/utils/cacheUtils"
require("~/patches/patches.js")
// useing require here because TS yells when importing and no Types are defined
const portUsed = require("port-used")

const prisma = new PrismaClient()

const sshConfig = {
  endHost: process.env.AC5_SSH_HOST as string,
  username: process.env.AC5_SSH_USER as string,
  privateKey: process.env.AC5_SSH_KEY
    ? Buffer.from(process.env.AC5_SSH_KEY, "base64").toString("utf-8")
    : undefined,
  passphrase: process.env.AC5_SSH_PASSPHRASE as string,
}

const forwardConfig = {
  fromPort: 3306,
  toHost: process.env.AC5_DB_HOST as string,
  toPort: 3306, // sql default
}

/**
 * establishes ssh connecton and tunnel
 * returns connection to close it manually

 * @return {sshConnection}
 */
export async function connectDB<DBQueryFn extends (...args: any) => any>(
  dbQueryFn: DBQueryFn
): Promise<ReturnType<DBQueryFn>> {
  // check if port is in use
  const tunnelOpen = await portUsed.check(3306, "127.0.0.1")
  const sshConnection = new SSHConnection(sshConfig)

  // only run forwarding when port is not used
  if (!tunnelOpen) {
    await sshConnection.forward(forwardConfig).catch((err) => {
      console.log("SSH Connection error", err)
    })
  }

  const result = await dbQueryFn()

  // disconnect SSH to avoid opening multiple connections
  sshConnection.shutdown()

  return result
}

function getStudentProfiles() {
  const db = prisma
  return db.profil.findMany({
    select: {
      id: true,
      vorname: true,
      name: true,
      email: true,
    },
    take: 100,
  })
}

function queryProfile(id: number) {
  const db = prisma
  return db.profil.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      titel: true,
      staatsangehoerigkeit: true,
      anrede: true,
      geb: true,
      name: true,
      vorname: true,
      email: true,
    },
  })
}

function queryCountry(id: number) {
  const db = prisma
  return db.laender.findUnique({
    where: {
      id,
    },
  })
}

function queryAddresses(id: number) {
  const db = prisma
  return db.pm_fields.findMany({
    where: {
      pid: id,
      NOT: [
        {
          strasse: null,
        },
      ],
    },
    select: {
      strasse: true,
      plz: true,
      ort: true,
      land: true,
      typ: true,
    },
  })
}

export async function getAddresses(profileId: string) {
  try {
    return await connectDB(() => queryAddresses(parseInt(profileId)))
  } catch (error) {
    console.log(error)
  }
}

export async function getCountry(countryId: number) {
  try {
    return await connectDB(() => queryCountry(countryId))
  } catch (error) {
    console.log(error)
  }
}

export async function getProfile(profileId: string) {
  return handleCache(`studentProfile_${profileId}`, async () => {
    try {
      return await connectDB(() => queryProfile(parseInt(profileId)))
    } catch (error) {
      console.log(error)
    }
  })
}

export async function getProfiles() {
  return handleCache("studentProfiles", async () => {
    try {
      return await connectDB(getStudentProfiles)
    } catch (error) {
      console.log(error)
    }
  })
}
