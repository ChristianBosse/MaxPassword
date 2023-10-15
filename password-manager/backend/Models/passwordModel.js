const { encrypt, decrypt } = require("../Encryption/encryption");
const crypto = require("crypto");

//JSON model for password encryption
const passwordModelEncryption = (password) => {
    //encrypt password
    const encryptedPassword = encrypt(password);
    //split password and iv on :
    const splitPassword = encryptedPassword.split(":");
    const iv = splitPassword[0];
    const encrypted = splitPassword[1];

    //generate random id with crypto
    const id = crypto.randomUUID();

    //create the encryption schema
    const encryptionSchema = {
        id: id,
        URL: "localhost:3000",
        username: "admin",
        password: encrypted,
        iv: iv,
        category: "none",
        description: "",
    };

    //return the encryption schema
    return encryptionSchema;
};

//JSON model for password decryption
const passwordModelDecryption = (password) => {};

module.exports = { passwordModelEncryption, passwordModelDecryption };
