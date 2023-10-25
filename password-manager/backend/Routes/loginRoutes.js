const express = require("express");
const { readFile } = require("fs");
const { profilePath } = require("../setup/initial.js");
const router = express.Router();

router.get("/", (req, res) => {
    const path = profilePath();
    readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading file");
        }
        try {
            const profile = JSON.parse(data);

            //check if profile is empty. If its empty then ask to create it.
            if (profile.length === 0) {
                res.status(404).send("Profile not created!");
                return;
            }
        } catch (error) {
            console.log("Error parsing JSON string:", error);
        }
    });
});

module.exports = router;
