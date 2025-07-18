document.getElementById("accordion").addEventListener("click", (e) => {
	const btn = e.target.closest(".accordion-header");
	if (!btn) return;

	const allBodies = document.querySelectorAll(".accordion-body");
	const allIcons = document.querySelectorAll(".accordion-header svg");
	const body = btn.nextElementSibling;
	const icon = btn.querySelector("svg");

	const isOpen = !body.classList.contains("hidden");

	// Close all
	allBodies.forEach((el) => el.classList.add("hidden"));
	allIcons.forEach((el) => el.classList.remove("rotate-180"));

	// Toggle clicked one
	if (!isOpen) {
		body.classList.remove("hidden");
		icon.classList.add("rotate-180");
	}
});
