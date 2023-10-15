const { encrypt } = require("../Encryption/encryption");
const crypto = require("crypto");

//JSON model for password encryption
const passwordModelEncryption = (
    password,
    URL = null,
    username = null,
    email = null,
    category = null,
    description = null
) => {
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
        URL: URL || "localhost:3000",
        username: username || "admin",
        email: email || "admin@email.com",
        password: encrypted,
        iv: iv,
        category: category || "none",
        description: description || "",
    };

    //return the encryption schema
    return encryptionSchema;
};

module.exports = passwordModelEncryption;
