import CryptoJS from 'crypto-js';

// encrypted the already encoded sshKey - we have to provide the deciphering key to decrypt it
const encryptedKey = "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";

export function getSSHKey() {
  if (!process.env.AC5_SSH_CIPHER_KEY) {
    throw new Error('.env is missing AC5_SSH_CIPHER_KEY');
  }
  return CryptoJS.AES.decrypt(encryptedKey, process.env.AC5_SSH_CIPHER_KEY).toString(CryptoJS.enc.Utf8);
}