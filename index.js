require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const { nanoid } = require("nanoid");
let bodyParser = require("body-parser");
const dns = require("dns").promises;

const connectDB = require("./db");
const UrlDoc = require("./schemas");

const app = express();
connectDB();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use("/", bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", async (req, res) => {
	// check that the URL is in valid format
	if (!URL.canParse(req.body.url)) {
		return res.json({ error: "invalid url" });
	}

	// check that the URL resolves to an actual site
	try {
		urlObject = new URL(req.body.url);
		await dns.lookup(urlObject.hostname);
	} catch (err) {
		return res.json({ error: "invalid hostname" });
	}

	try {
		// search db for inputted URL (minus the id and doc version fields)
		const existingDoc = await UrlDoc.findOne({original_url: req.body.url}).select("-_id -__v");
		if (existingDoc) {
			return res.json(existingDoc);
		}

		const url = new UrlDoc({
			original_url: req.body.url,
			short_url: Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
		});

		const savedURL = await url.save();

		res.status(201).json({original_url: savedURL.original_url, short_url: savedURL.short_url});
	} catch (err) {
		res.status(400).json({ message: err.message });
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
