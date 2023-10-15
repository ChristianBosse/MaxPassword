const express = require("express");
const { readFile } = require("fs");
const { decrypt } = require("../Encryption/encryption");
const router = express.Router();

router.get("/", (req, res) => {
    readFile("backend/pm.json", "utf8", (err, data) => {
        const jsonData = JSON.parse(data);

        //decrypting URL, username, email, password, category, description
        for (let i = 0; i < jsonData.length; i++) {
            jsonData[i].URL = decrypt(jsonData[i].URL, jsonData[i].iv);
            jsonData[i].username = decrypt(
                jsonData[i].username,
                jsonData[i].iv
            );
            jsonData[i].email = decrypt(jsonData[i].email, jsonData[i].iv);

            jsonData[i].category = decrypt(
                jsonData[i].category,
                jsonData[i].iv
            );
            jsonData[i].description = decrypt(
                jsonData[i].description,
                jsonData[i].iv
            );
        }

        if (err) {
            console.log(err);
            res.status(500).send("Error reading file");
        } else {
            res.send(jsonData);
        }
    });
});

module.exports = router;
