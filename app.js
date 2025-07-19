import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const API_URL = "https://api.qrserver.com/v1/create-qr-code/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index", { qrImage: null, response: null });
});

app.post("/generate", async (req, res) => {
	const reqInputType = req.body.inputType;
	let hexColor = req.body.color.toLowerCase();
	hexColor = hexColor === "#ffffff" || hexColor === "fff" ? "#000" : hexColor;
	const color = hexColor.replace("#", "");

	let config = {
		responseType: "arraybuffer",
		params: {
			data: req.body.userText,
			format: req.body.fileType,
			color: color,
			bgcolor: "fff",
			size: "300x300",
			margin: "24",
		},
	};

	if (reqInputType === "email") {
		config = {
			responseType: "arraybuffer",
			params: {
				data: `mailto:${req.body.userText}`,
				format: req.body.fileType,
				color: color,
				bgcolor: "fff",
				size: "300x300",
				margin: "24",
			},
		};
	}

	try {
		const response = await axios.get(API_URL, config);

		// Convert response.data as binary to Base64.
		const base64Image = Buffer.from(response.data, "binary").toString("base64");

		// Getting response headers with name "content-type".
		const contentType = response.headers["content-type"]; // e.g. image/png

		// Embed the image as data URL string
		const dataURI = `data:${contentType};base64,${base64Image}`;

		res.render("index", { qrImage: dataURI, response: "Generate QR Success!" });
	} catch (error) {
		console.error("Failed to fetch QR code:", error.response);
		res.render("index", { qrImage: dataURI, response: "Oops something wrong with our end." });
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
});
