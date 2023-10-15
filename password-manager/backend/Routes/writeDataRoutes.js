const express = require("express");
const { readFile, writeFile } = require("fs");
const passwordModelEncryption = require("../Models/passwordModel.js");
const { filePath } = require("../setup/filepath.js");
const router = express.Router();

router.post("/", (req, res) => {
    const path = filePath();
    const URL = req.body.url;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const category = req.body.category;
    const description = req.body.description;

    const encryptedData = passwordModelEncryption(
        URL,
        username,
        email,
        password,
        category,
        description
    );

    readFile(path, (err, data) => {
        if (err) {
            console.log("Error reading file", err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            jsonData.push(encryptedData);
            const jsonEncryptedData = JSON.stringify(jsonData);

            writeFile(path, jsonEncryptedData, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error writing to file");
                } else {
                    res.status(200).send(`Password has been added!`);
                }
            });
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
