const express = require("express");
const { readFile, writeFile } = require("fs");
const { filePath } = require("../setup/filepath.js");
const router = express.Router();

router.delete("/:id", (req, res) => {
    const path = filePath();
    const id = req.params.id;

    readFile(path, (err, data) => {
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

            //delete password object with id
            const index = jsonData.indexOf(passwordObject);
            jsonData.splice(index, 1);

            const updatedData = JSON.stringify(jsonData);

            writeFile(path, updatedData, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error writing to file");
                }
                res.status(200).send(
                    `Password with id: ${id} has been deleted!`
                );
            });
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
