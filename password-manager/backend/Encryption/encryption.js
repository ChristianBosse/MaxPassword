const crypto = require("crypto");

const algorithm = "aes-256-cbc"; //algorithm to use
const key = "12345678901234567890123456789012"; //32 bytes

//encrypt function
const encrypt = (text) => {
    const iv = crypto.randomBytes(16); //16 bytes
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return `${iv.toString("hex")}:${encrypted}`;
};

//decrypt function
const decrypt = (password, iv) => {
    iv = Buffer.from(iv, "hex");
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(password, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

module.exports = { encrypt, decrypt };
