const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const cipherData = fs.readFileSync(path.join(__dirname, "./key.json"));
const { key, algorithm } = JSON.parse(cipherData);

function encrypt(string) {
  const iv = crypto.randomBytes(8).toString("hex");
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(string, "utf8", "hex");
  encrypted += cipher.final("hex");

  return `${encrypted}:${iv}`;
}

function decrypt(string) {
  const [encryptedString, iv] = string.split(":");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedString, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;

// Импорты

// const cryptoScripts = require('../cryptoScripts.js')
// const encrypt = cryptoScripts.encrypt
// const decrypt = cryptoScripts.decrypt
