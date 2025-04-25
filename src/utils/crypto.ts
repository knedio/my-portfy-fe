// utils/crypto.ts

import CryptoJS from 'crypto-js';

const AES_SECRET = import.meta.env.VITE_AES_SECRET;

/**
 * encrypt a string using AES-256-CBC with a random IV.
 * returns a base64 string in the format: iv:encrypted
 *
 * @param value - the plain text to encrypt
 * @returns the encrypted string in format ivBase64:encryptedBase64
 */
export const encryptAES = (value: string): string => {
  // step 1: generate a 16-byte (128-bit) random IV (Initialization Vector)
  const iv = CryptoJS.lib.WordArray.random(16);

  // step 2: hash the secret using SHA-256 to produce a 256-bit AES key
  // this ensures compatibility with Laravel's openssl_decrypt using 'AES-256-CBC'
  const key = CryptoJS.SHA256(AES_SECRET);

  // step 3: encrypt the value using AES-256-CBC with PKCS7 padding
  const encrypted = CryptoJS.AES.encrypt(value, key, {
    iv, // use the generated IV
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // step 4: convert IV and encrypted content to base64 strings
  const ivBase64 = CryptoJS.enc.Base64.stringify(iv); // IV in base64
  const encryptedBase64 = encrypted.toString(); // cipher text in base64

  // step 5: return combined value in "iv:encrypted" format
  return `${ivBase64}:${encryptedBase64}`;
};
