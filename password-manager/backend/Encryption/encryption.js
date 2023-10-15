const crypto = require("crypto");

const algorithm = "aes-256-cbc"; //algorithm to use
const key = "12345678901234567890123456789012"; //32 bytes

//encrypt function
const encrypt = (iv, data) => {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
};

//decrypt function
const decrypt = (data, iv) => {
    iv = Buffer.from(iv, "hex");
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(data, "hex", "utf-8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

module.exports = { encrypt, decrypt };
