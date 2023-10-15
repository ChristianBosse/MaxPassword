const express = require("express");
const bodyParser = require("body-parser");
const writePasswordRoutes = require("./Routes/writeDataRoutes.js");
const readDataRoutes = require("./Routes/readDataRoutes.js");
const readPasswordRoutes = require("./Routes/readPasswordRoutes.js");
const updatePasswordRoutes = require("./Routes/updateDataRoutes.js");
const deleteDataRoutes = require("./Routes/deleteDataRoutes.js");
const { createFile } = require("./setup/filepath.js");
const app = express();
const port = 3000;

//**** MAKE A PASSWORD GENERATOR ****//

//body parser
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

createFile();

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

app.listen(port, () =>
    console.log(`Password Manager app listening on port ${port}!`)
);
