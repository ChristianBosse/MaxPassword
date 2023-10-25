const express = require("express");
const { readFile, writeFile } = require("fs");
const { profilePath } = require("../setup/initial.js");
const crypto = require("crypto");
const { encrypt } = require("../Encryption/encryption.js");
const router = express.Router();

router.post("/", (req, res) => {
    const path = profilePath();
    //get master password from body
    const masterPassword = req.body.masterPassword;
    readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading file");
        }
        try {
            //get profile data
            const profile = JSON.parse(data);

            //create iv for master password
            const iv = crypto.randomBytes(16);

            //create encryption for master password
            const encryptedMaster = encrypt(iv, masterPassword);

            //create object for iv and master password
            const master = {
                iv: iv.toString("hex"),
                masterPassword: encryptedMaster,
            };

            //push into profile array
            profile.push(master);

            //write to file
            writeFile(path, JSON.stringify(profile), (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error writing file");
                }
                res.status(200).send("Profile created!");
            });
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
