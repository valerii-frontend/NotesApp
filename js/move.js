const notesArr = [];
notesArr.forEach((note) => {
	const toolbar = note.querySelector(".tools");
	toolbar.onmousedown = function (e) {
		note.style.position = "absolute";
		moveAt(e);
		// переместим в body, чтобы мяч был точно не внутри position:relative
		wrapper.appendChild(note);

		note.style.zIndex = 1000; // показывать мяч над другими элементами

		// передвинуть мяч под координаты курсора
		// и сдвинуть на половину ширины/высоты для центрирования
		function moveAt(e) {
			if (e.pageX - note.offsetWidth / 2 < 0) note.style.left = "0px";
			else note.style.left = e.pageX - note.offsetWidth / 2 + "px";
			if (e.pageY - note.offsetHeight / 2 < 0) note.style.top = "0px";
			else note.style.top = e.pageY - note.offsetHeight / 2 + "px";
		}

		// 3, перемещать по экрану
		document.onmousemove = function (e) {
			moveAt(e);
		};

		// 4. отследить окончание переноса
		note.onmouseup = function () {
			document.onmousemove = null;
			note.onmouseup = null;
		};
	};
});
