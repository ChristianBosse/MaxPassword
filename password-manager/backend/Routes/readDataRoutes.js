const express = require("express");
const { readFile } = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
    readFile("backend/pm.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading file");
        } else {
            const jsonData = JSON.parse(data);
            res.send(jsonData);
        }
    });
});

module.exports = router;
