import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
const API_URL = "https://api.qrserver.com/v1/create-qr-code/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index", { content: null });
});

app.post("/generate", async (req, res) => {
	try {
		const response = await axios.get(API_URL, {
			responseType: "arraybuffer", // required, will return buffer data and if not you get unreadable data.

			// Getting response with parameters
			params: {
				data: req.body.userText,
				format: req.body.fileType,
			},
		});

		// Convert response.data as binary to Base64.
		const base64Image = Buffer.from(response.data, "binary").toString("base64");

		// Getting response headers with name "content-type".
		const contentType = response.headers["content-type"]; // e.g. image/png

		// Embed the image as data URL string
		const dataURI = `data:${contentType};base64,${base64Image}`;

		res.render("index", { content: dataURI });
	} catch (error) {
		console.error("Failed to fetch QR code:", error.response);
		res.sendStatus(500);
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
});
