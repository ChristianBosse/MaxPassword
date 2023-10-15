const { encrypt } = require("../Encryption/encryption");
const crypto = require("crypto");

//JSON model for password encryption
const passwordModelEncryption = (
    URL,
    username,
    email,
    password,
    category,
    description
) => {
    //generate random id with crypto
    const id = crypto.randomUUID();
    const iv = crypto.randomBytes(16); //16 bytes

    //create the encryption schema
    const encryptionSchema = {
        id: id,
        URL: encrypt(iv, URL),
        username: encrypt(iv, username),
        email: encrypt(iv, email),
        password: encrypt(iv, password),
        iv: iv.toString("hex"),
        category: encrypt(iv, category),
        description: encrypt(iv, description),
    };

    //return the encryption schema
    return encryptionSchema;
};

module.exports = passwordModelEncryption;
