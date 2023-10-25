const os = require("os");
const { mkdir, writeFile, existsSync } = require("fs");

//get the path to appdata
const defaultPath = os.homedir() + "/AppData/Roaming";
const defaultFolder = "/MaxPassword";
const filename = "/profile.json";

const createProfile = () => {
    //create folder in appdata
    mkdir(defaultPath + defaultFolder, { recursive: true }, (err) => {
        if (err) {
            console.log(err);
        }
    });

    //check if profile.json exists
    if (!existsSync(defaultPath + defaultFolder + filename)) {
        //file does not exists so we create a json file with an empty array
        writeFile(defaultPath + defaultFolder + filename, "[]", (err) => {
            if (err) {
                console.log(err);
            }
        });
        console.log("file created");
    } else {
        console.log("file exists");
    }
};

const profilePath = () => {
    return defaultPath + defaultFolder + filename;
};

module.exports = { createProfile, profilePath };
