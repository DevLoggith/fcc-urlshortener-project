require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {nanoid} = require("nanoid");
let bodyParser = require("body-parser");

const connectDB = require("./db");
const Url = require("./schemas");

const app = express();
connectDB();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use("/", bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
	// search db to see if req.body.url already exists
	// if so, return json of that document
	// in not, create new Url document and save it
	const url = new Url ({
		original_url: req.body.url,
		short_url: nanoid(5)
	});

	try {
		url.save();
		res.status(201).json(url);
	} catch (err) {
		res.status(400).json({message: err.message});
	}
});

app.get("/api/shorturl/:surl", (req, res) => {

});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
