const { EncryptionLibrary } = require("encryption-decryption-easy");

const Encryption = new EncryptionLibrary();

const input = { name: "Raj", password: "123-456-789" };
const encrypted = Encryption.encryptObjectKeys(input, ["password"]);
console.log("Encrypted object is:", encrypted);

const decrypted = Encryption.decryptObjectKeys(input, ["password"]);
console.log("Decrypted object is:", decrypted);
