const express = require("express");
const { readFile, writeFile } = require("fs");
const passwordModelEncryption = require("../Models/passwordModel.js");
const router = express.Router();

router.post("/:password", (req, res) => {
    const password = req.params.password;
    //random data
    const URL = "https://www.google.com/";
    const username = "christian";
    const email = "chris@email.com";
    const category = "bank";
    const description = "bank account";

    const encryptedData = passwordModelEncryption(
        URL,
        username,
        email,
        password,
        category,
        description
    );

    readFile("backend/pm.json", (err, data) => {
        if (err) {
            console.log("Error reading file", err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            jsonData.push(encryptedData);
            const jsonEncryptedData = JSON.stringify(jsonData);

            writeFile("backend/pm.json", jsonEncryptedData, (err) => {
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
