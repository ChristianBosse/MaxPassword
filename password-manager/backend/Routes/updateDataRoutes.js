const express = require("express");
const { readFile, writeFile } = require("fs");
const { decrypt, multipleDecrypt } = require("../Encryption/encryption.js");
const passwordModelEncryption = require("../Models/passwordModel.js");
const router = express.Router();

router.patch("/:id", (req, res) => {
    const id = req.params.id;
    const url = req.body.url;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const category = req.body.category;
    const description = req.body.description;

    readFile("backend/pm.json", (err, data) => {
        if (err) {
            console.log("Error reading file", err);
            return;
        }
        try {
            //parse json
            const parsedData = JSON.parse(data);

            //find right id
            const foundId = parsedData.find((item) => item.id === id);

            const decryptedData = multipleDecrypt(foundId, foundId.iv);
            console.log(decryptedData);
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
