const express = require("express");
const writePasswordRoutes = require("./Routes/writePasswordRoutes.js");
const readDataRoutes = require("./Routes/readDataRoutes.js");
const readPasswordRoutes = require("./Routes/readPasswordRoutes.js");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

//write encrypted password to pm.json
app.use("/write", writePasswordRoutes);

//read password from pm.json
app.use("/read", readDataRoutes);

app.use("/decrypt", readPasswordRoutes);

app.listen(port, () =>
    console.log(`Password Manager app listening on port ${port}!`)
);
