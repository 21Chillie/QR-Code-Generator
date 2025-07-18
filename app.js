import { createWriteStream } from "node:fs";
import express from "express";
import bodyParser from "body-parser";
import qr from "qr-image";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index.ejs", { content: null, filePath: null });
});

app.post("/generate", (req, res) => {
	try {
		const text = req.body.text;
		const fileName = "user-qr";

		// Generate QR Code Image from text variable to directory public/images/filename.svg
		qr.image(text, { type: "svg" }).pipe(createWriteStream(`public/images/qr-image/${fileName}.svg`));

		const filePath = `/images/qr-image/${fileName}.svg`;

		res.render("index", { content: "Generate Success", filePath: filePath });
	} catch (error) {
		console.error("QR Code Generation Failed:", error);
		res.render("index", { content: "Oops! Something went wrong on our end.", filePath: null });
	}
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
