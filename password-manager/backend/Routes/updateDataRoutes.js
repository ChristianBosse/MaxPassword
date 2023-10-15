const express = require("express");
const { readFile, writeFile } = require("fs");
const {
    decrypt,
    multipleDecrypt,
    updateEncrypt,
} = require("../Encryption/encryption.js");
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

            //delete data
            const filteredData = parsedData.filter((item) => item.id !== id);

            //decrypt data
            const decryptedData = multipleDecrypt(foundId, false);

            //update data with encryption
            const updatedEncryptedData = updateEncrypt(
                decryptedData,
                url,
                username,
                email,
                password,
                category,
                description
            );

            //push the updated data
            filteredData.push(updatedEncryptedData);

            //write the file
            writeFile(
                "backend/pm.json",
                JSON.stringify(filteredData),
                (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send("Error writing to file");
                    } else {
                        res.status(200).send(`Your data has been updated!`);
                    }
                }
            );
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
