import express from "express";
import crypto from "crypto";
import { buffer } from "stream/consumers";


const app = express();
app.use(express.json());

const generateKeys = () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048, 
      publicKeyEncoding: {
        type: "pkcs1", 
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs1", 
        format: "pem",
      },
    });
  
    return { publicKey, privateKey };
  };

const encrypt = (publicKey , message)=>{
    const encrypted = crypto.publicEncrypt(publicKey , Buffer.from(message));
    return encrypted.toString("base64");
}

const decrypt = (privateKey , encryptedMessage)=>{
    const decrypted = crypto.privateDecrypt(privateKey , Buffer.from(encryptedMessage , "base64"));
    return decrypted.toString("utf-8")
}

const keys = generateKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

app.get("/" , (req , res)=>{
    res.send("Hello World!")
});

app.post("/encrypt" , (req , res)=>{
    const {message} = req.body;

    const encryptedData = encrypt(publicKey , message);

    res.json({encryptedData});
});

app.post("/decrypt" , (req , res)=>{
    const {encryptedMessage} = req.body;

    const decryptedData = decrypt(privateKey , encryptedMessage);

    res.json({decryptedData});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Public Key:\n", publicKey);
  console.log("Private Key:\n", privateKey);
});