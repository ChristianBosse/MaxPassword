const express = require("express");
const { readFile, writeFile } = require("fs");
const passwordModelEncryption = require("../Models/passwordModel.js");
const router = express.Router();

router.patch("/:id/:password", (req, res) => {
    const id = req.params.id;
    const newPassword = req.params.password;

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

            //destructuring the whole object
            const { URL, username, email, category, description } =
                passwordObject;

            //delete password object with id
            const index = jsonData.indexOf(passwordObject);
            jsonData.splice(index, 1);

            //send data to passwordModelEncryption
            const updatedObject = passwordModelEncryption(
                URL,
                username,
                email,
                newPassword,
                category,
                description
            );

            jsonData.push(updatedObject);
            const updatedData = JSON.stringify(jsonData);
            writeFile("backend/pm.json", updatedData, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error writing to file");
                }
                res.status(200).send(
                    `Password with id: ${id} has been updated!`
                );
            });
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
