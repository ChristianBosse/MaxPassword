const express = require("express");
const { readFile, writeFile } = require("fs");
const router = express.Router();

router.delete("/:id", (req, res) => {
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

            //delete password object with id
            const index = jsonData.indexOf(passwordObject);
            jsonData.splice(index, 1);

            const updatedData = JSON.stringify(jsonData);

            writeFile("backend/pm.json", updatedData, (err) => {
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
