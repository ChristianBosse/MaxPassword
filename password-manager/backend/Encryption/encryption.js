const crypto = require("crypto");
const { url } = require("inspector");

const algorithm = "aes-256-cbc"; //algorithm to use
const key = "12345678901234567890123456789012"; //32 bytes

//encrypt function
const encrypt = (iv, data) => {
    //check if iv is a string
    if (typeof iv === "string") {
        iv = Buffer.from(iv, "hex");
    }
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

const multipleDecrypt = (data, isPasswordEncrypted) => {
    //check if data is an array
    if (data.length > 0) {
        if (!isPasswordEncrypted) {
            for (let i = 0; i < data.length; i++) {
                data[i].URL = decrypt(data[i].URL, data[i].iv);
                data[i].username = decrypt(data[i].username, data[i].iv);
                data[i].email = decrypt(data[i].email, data[i].iv);
                data[i].password = decrypt(data[i].password, data[i].iv);
                data[i].category = decrypt(data[i].category, data[i].iv);
                data[i].description = decrypt(data[i].description, data[i].iv);
            }
            return data;
        } else {
            for (let i = 0; i < data.length; i++) {
                data[i].URL = decrypt(data[i].URL, data[i].iv);
                data[i].username = decrypt(data[i].username, data[i].iv);
                data[i].email = decrypt(data[i].email, data[i].iv);
                data[i].category = decrypt(data[i].category, data[i].iv);
                data[i].description = decrypt(data[i].description, data[i].iv);
            }
            return data;
        }
    } else {
        data.URL = decrypt(data.URL, data.iv);
        data.username = decrypt(data.username, data.iv);
        data.email = decrypt(data.email, data.iv);
        data.password = decrypt(data.password, data.iv);
        data.category = decrypt(data.category, data.iv);
        data.description = decrypt(data.description, data.iv);
        return data;
    }
};

const updateEncrypt = (
    data,
    url,
    username,
    email,
    password,
    category,
    description
) => {
    data.URL = encrypt(data.iv, url);
    data.username = encrypt(data.iv, username);
    data.email = encrypt(data.iv, email);
    data.password = encrypt(data.iv, password);
    data.category = encrypt(data.iv, category);
    data.description = encrypt(data.iv, description);
    return data;
};

module.exports = { encrypt, decrypt, multipleDecrypt, updateEncrypt };
