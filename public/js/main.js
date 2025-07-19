const inputTypeSelect = document.getElementById("inputType");
const userInput = document.getElementById("userText");

inputTypeSelect.addEventListener("change", function () {
	const selectedType = this.value;

	userInput.type = selectedType || "text"; // fallback to 'text' if none selected

	switch (selectedType) {
		case "text":
			userInput.placeholder = "Enter your text...";
			break;
		case "url":
			userInput.placeholder = "Enter a valid URL (e.g. https://...)";
			break;
		case "email":
			userInput.placeholder = "Enter your email address";
			break;
		default:
			userInput.placeholder = "Enter your input...";
	}
});
