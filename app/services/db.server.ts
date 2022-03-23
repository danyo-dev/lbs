import { PrismaClient } from '@prisma/client'
import { NodeSSH } from 'node-ssh';

let db: PrismaClient;
let ssh: NodeSSH;

declare global {
  var __db: PrismaClient | undefined;
  var __ssh: NodeSSH | undefined;
}

const sshConfig = {
  host: process.env.AC5_SSH_HOST,
  username: process.env.AC5_SSH_USER,
  privateKey: process.env.AC5_SSH_KEY ? Buffer.from(process.env.AC5_SSH_KEY, 'base64').toString('utf-8') : undefined,
  passphrase: process.env.AC5_SSH_PASSPHRASE,
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
export function connectSSH() {
  if (process.env.NODE_ENV === "production") {
    if (ssh.isConnected()) {
      connectDB();
    } else {
      ssh = new NodeSSH();
      ssh.connect(sshConfig).then(connectDB)
    }
  } else {
    if (!global.__ssh) {
      global.__ssh = new NodeSSH();
      global.__ssh.connect(sshConfig).then(connectDB)
    }
    ssh = global.__ssh;
  }
  return ssh;
}

function connectDB() {
  if (process.env.NODE_ENV === "production") {
    db = new PrismaClient();
    db.$connect();
  } else {
    if (!global.__db) {
      global.__db = new PrismaClient();
      global.__db.$connect();
    }
    db = global.__db;
  }
}

export { db, ssh };