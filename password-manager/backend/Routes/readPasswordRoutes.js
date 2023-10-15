const express = require("express");
const { readFile } = require("fs");
const { decrypt } = require("../Encryption/encryption.js");
const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;

    readFile("backend/pm.json", (err, data) => {
        if (err) {
            console.log("Error reading file", err);
            return;
        }
        try {
            //find password object with id
            const jsonData = JSON.parse(data);
            const passwordObject = jsonData.find((password) => {
                return password.id === id;
            });
            //destructuring
            const { password, iv } = passwordObject;
            //decrypt password
            const decryptedPassword = decrypt(password, iv);

            res.send(decryptedPassword);
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
