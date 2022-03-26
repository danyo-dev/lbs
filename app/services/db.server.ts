import { PrismaClient, PrismaPromise } from '@prisma/client'
import { SSHConnection } from 'node-ssh-forward';
import portUsed from 'port-used';

const sshConfig = {
  endHost: process.env.AC5_SSH_HOST as string,
  username: process.env.AC5_SSH_USER as string,
  privateKey: process.env.AC5_SSH_KEY ? Buffer.from(process.env.AC5_SSH_KEY, 'base64').toString('utf-8') : undefined,
  passphrase: process.env.AC5_SSH_PASSPHRASE as string,
}

const forwardConfig = {
  fromPort: 3306,
  toHost: process.env.AC5_DB_HOST as string,
  toPort: 3306 // sql default
}

/**
 * establishes ssh connecton and tunnel
 * returns connection to close it manually

 * @return {sshConnection}
 */
async function connectDB<DBQueryFn extends Function>(dbQueryFn: DBQueryFn) {
  // check if port is in use
  const tunnelOpen = await portUsed.check(3306, '127.0.0.1');
  const sshConnection = new SSHConnection(sshConfig);

  // only run forwarding when port is not used
  if (!tunnelOpen) {
    await sshConnection.forward(forwardConfig).catch(err => {
      console.log('SSH Connection error', err);
    });
  }

  const result = await dbQueryFn();

  // disconnect SSH to avoid opening multiple connections
  sshConnection.shutdown();

  return result;
}

// function to query profiles
const queryProfiles = () => {
  const db = new PrismaClient();

  return db.profil.findMany({
    select: {
      vorname: true,
      name: true,
      email: true,
    }, take: 10
  });
}

const getProfiles = () => connectDB(queryProfiles);

export { getProfiles };