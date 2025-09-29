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
	// validate that the POSTED url matches the https://www.example.com format
	// (required: 'http://' or 'https://', optional: subdomain, required: top-level domain)
		// if not, res.json({error: "Invalid URL"})
	// validate that the url resolves to an actual site
		// if not, res.json({error:	"Invalid Hostname"})

	// search db to see if req.body.url already exists
	// if so, return json of that document
	// if not, create new Url document and save it

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

app.get("/api/shorturl/:nanourl", (req, res) => {
	// search db to see if nanourl already exists
	// if so, navigate to the url stored under 'original_url' of that document
	// if not, res.json({error: "No short URL found for the given input"})
});

app.listen(port, function () {
	console.log(`Listening on port ${port}`);
});
