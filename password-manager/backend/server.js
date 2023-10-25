const express = require("express");
const bodyParser = require("body-parser");
const writePasswordRoutes = require("./Routes/writeDataRoutes.js");
const readDataRoutes = require("./Routes/readDataRoutes.js");
const readPasswordRoutes = require("./Routes/readPasswordRoutes.js");
const updatePasswordRoutes = require("./Routes/updateDataRoutes.js");
const deleteDataRoutes = require("./Routes/deleteDataRoutes.js");
const loginRoutes = require("./Routes/loginRoutes.js");
const createLoginRoutes = require("./Routes/createLoginRoutes.js");
const { createFile } = require("./setup/filepath.js");
const { createProfile } = require("./setup/initial.js");
const app = express();
const port = 3000;

//body parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

//create pm.json file
createFile();

//create profile.json file
createProfile();

app.get("/", (req, res) => res.send("Hello World!"));

//write encrypted password to pm.json
app.use("/write", writePasswordRoutes);

//read password from pm.json
app.use("/read", readDataRoutes);

//decrypt password from pm.json
app.use("/decrypt", readPasswordRoutes);

//update password in pm.json
app.use("/update", updatePasswordRoutes);

//delete password in pm.json
app.use("/delete", deleteDataRoutes);

//check if login exists
app.use("/login", loginRoutes);

//create login
app.use("/create", createLoginRoutes);

app.listen(port, () =>
    console.log(`Password Manager app listening on port ${port}!`)
);
