require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("db");
const Url = require("schemas");

const app = express();
connectDB();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});


app.get("/api/shorturl/:surl", (req, res) => {

});

app.post("/api/shorturl", (req, res) => {
	
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
