const addBtn = document.getElementById("add");
const wrapper = document.querySelector(".wrapper");
const notes = JSON.parse(localStorage.getItem("notes"));
if (notes)
	notes.forEach((note) => {
		addNewNote(note);
		updateStorage();
	});

addBtn.addEventListener("click", () => addNewNote());

function addNewNote(text = "") {
	const note = document.createElement("div");
	note.classList.add("note");

	note.innerHTML = `
	<div class="tools" style='background-color: var(--color${Math.trunc(Math.random() * 10)});'>
	<button class="edit"><i class="fas fa-edit"></i></button>
	<button class="delete"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="main  ${text ? "" : "hidden"}"></div>
<textarea class="${text ? "hidden" : ""}"></textarea>
	`;
	const editBtn = note.querySelector(".edit");
	const delBtn = note.querySelector(".delete");
	const main = note.querySelector(".main");
	const textArea = note.querySelector("textarea");
	textArea.value = text;
	textArea.focus();
	main.innerHTML = marked(text);

	delBtn.addEventListener("click", () => {
		note.remove();
		updateStorage();
	});

	editBtn.addEventListener("click", function (e) {
		textArea.classList.toggle("hidden");
		main.classList.toggle("hidden");
		textArea.focus();
	});
	textArea.addEventListener("input", function (e) {
		const { value } = e.target;
		main.innerHTML = marked(value);
		updateStorage();
	});

	wrapper.append(note);
}

function updateStorage() {
	const notesText = document.querySelectorAll("textarea");
	const notes = [];
	notesText.forEach((note) => notes.push(note.value));
	localStorage.setItem("notes", JSON.stringify(notes));
}

// DOWNLOAD
const download = document.querySelector("#download");
function getImage(canvas) {
	var imageData = canvas.toDataURL();
	var image = new Image();
	image.src = imageData;
	return image;
}
function saveImage(image) {
	var link = document.createElement("a");
	link.setAttribute("href", image.src);
	link.setAttribute("download", "my_notes");
	link.click();
}
function getCanvas() {
	html2canvas(document.querySelector(".wrapper"), {
		onrendered: (layout) => {
			var image = getImage(layout);
			saveImage(image);
		},
	});
}
download.addEventListener("click", getCanvas);
