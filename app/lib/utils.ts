import crypto from 'crypto';

// Load the encryption key from environment variables and decode from base64
const rawKey = process.env.API_ENCRYPTION_KEY ?? '';
const ENCRYPTION_KEY = Buffer.from(rawKey, 'base64');
if (ENCRYPTION_KEY.length !== 32) { // AES-256-CBC requires a 32-byte key
  throw new Error('Invalid API_ENCRYPTION_KEY length: Must be 32 bytes when decoded');
}
const IV_LENGTH = 16; // For AES, this is always 16 bytes

export function encrypt(text: string): string {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

// function decrypt(text: string): string {
//   let textParts = text.split(':');
//   let iv = Buffer.from(textParts.shift(), 'hex');
//   let encryptedText = Buffer.from(textParts.join(':'), 'hex');
//   let decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
//   let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted;
// }