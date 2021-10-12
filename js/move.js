const notesArr = document.querySelectorAll(".note");
notesArr.forEach((note) => {
	const move = note.querySelector(".move");
	move.ondragstart = function () {
		return false;
	};
	move.onmousedown = function (e) {
		note.style.position = "absolute";
		move.classList.add("active");
		moveAt(e);
		wrapper.appendChild(note);
		note.style.zIndex = 1000;
		function moveAt(e) {
			note.style.left = e.pageX - 50 + "px";
			note.style.top = e.pageY - 50 + "px";
		}
		document.onmousemove = function (e) {
			moveAt(e);
		};
		note.onmouseup = function () {
			document.onmousemove = null;
			note.onmouseup = null;
			move.classList.remove("active");
		};
	};
});
