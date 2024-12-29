const crypto = require("crypto");

const randomeValue = crypto.randomBytes(8).toString("hex");
console.log(randomeValue);

const hashValue = crypto.createHash("sha256").update("Helloo").digest("hex");
console.log(hashValue);
