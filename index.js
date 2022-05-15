const express = require("express");
const cors = require('cors');
const app = express();

const port = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to ABC Company Order Management!!!!!");
});

const api = require("./routes/router");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});