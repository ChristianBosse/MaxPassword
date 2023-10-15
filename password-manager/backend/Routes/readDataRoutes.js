const express = require("express");
const { readFile } = require("fs");
const { multipleDecrypt } = require("../Encryption/encryption");
const { filePath } = require("../setup/filepath.js");
const router = express.Router();

router.get("/", (req, res) => {
    const path = filePath();
    readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading file");
        }
        try {
            const jsonData = JSON.parse(data);

            //check is jsondata contain something
            if (jsonData.length === 0) {
                res.status(200).send("No data found!");
                return;
            }

            //decrypting URL, username, email, password, category, description
            const decryptedData = multipleDecrypt(jsonData, true);

            res.send(decryptedData);
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
