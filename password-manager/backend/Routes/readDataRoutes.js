const express = require("express");
const { readFile } = require("fs");
const { decrypt, multipleDecrypt } = require("../Encryption/encryption");
const router = express.Router();

router.get("/", (req, res) => {
    readFile("backend/pm.json", "utf8", (err, data) => {
        const jsonData = JSON.parse(data);

        //decrypting URL, username, email, password, category, description
        const decryptedData = multipleDecrypt(jsonData, jsonData[0].iv);

        if (err) {
            console.log(err);
            res.status(500).send("Error reading file");
        } else {
            res.send(decryptedData);
        }
    });
});

module.exports = router;
