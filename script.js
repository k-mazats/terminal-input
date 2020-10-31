import commands from "./commands.js"; // gere la reponse aux commandes

document.addEventListener("DOMContentLoaded", function () {
	let terminalInput = document.getElementById("input");
	let caretDiv = document.getElementById("caret");
	let inputLeft = terminalInput.offsetLeft;
	let inputTop = terminalInput.offsetTop;
	let history = document.getElementById("terminalHistory");
	let caretOffset = 0;
	let highlight;
	caretDiv.style.left = `${inputLeft}px`;
	caretDiv.style.top = `${inputTop}px`;

	let tempInput = "";

	function updateCaret() {
		let strLength = terminalInput.value.length;
		caretDiv.style.marginLeft = `${strLength + caretOffset}ch`;
		caretDiv.style.top = `${inputTop}px`;
	}

	function browseCaret(key) {
		let strLength = terminalInput.value.length;
		
		switch (key) {
			case "ArrowLeft":
				if (caretOffset > 0 - strLength) {
					caretOffset--;
					highlight = terminalInput.value.charAt(
						terminalInput.value.length + caretOffset
					);
				}
				break;
			case "ArrowRight":
				if (caretOffset < 0) {
					caretOffset++;
					highlight = terminalInput.value.charAt(
						terminalInput.value.length + caretOffset
					);
				} else {
					highlight = "";
				}
				break;
			case "Delete":
				if (caretOffset < 0) {
					caretOffset++;
					highlight = terminalInput.value.charAt(
						terminalInput.value.length + caretOffset
					);
				} else {
					highlight = "";
				}
				break;
		}
		caretDiv.innerHTML = highlight;
	}

	function fakeCaret() {
		updateCaret();
		input.focus();
	}

	function terminalSubmit() {
		history.innerHTML += `<div class="terminal">
            <div class="terminal-prefix" id="terminalPrefix">@BrunOS/<span class="croissant">🥐</span>CLI:</div>
            <div>${input.value}</div>
		</div>`;
		let reply = commands(input.value);
		history.innerHTML += `<div class="terminal">
            <div class="terminal-prefix" id="terminalPrefix">@BrunOS/<span class="croissant">🥐</span>CLI:</div>
            <div>${reply}</div>
		</div>`;
		input.value = "";
		caretOffset = 0;
	}
	function updateInput(key) {
		if (caretOffset === 0) {
			tempInput += key;
			input.value = tempInput;
		} else {
			let inputArray = tempInput.split("");
			inputArray[inputArray.length + caretOffset] = key;
			tempInput = inputArray.join("");
			input.value = tempInput;
			highlight = terminalInput.value.charAt(
				terminalInput.value.length + caretOffset
			);
			caretDiv.innerHTML = highlight;
		}
		
		
	}
	document.addEventListener("click", function () {
		fakeCaret();
	});
	document.addEventListener("keydown", function (event) {
		event.preventDefault();
		switch (event.code) {
			case "Enter":
				terminalSubmit();
				break;
			case "ArrowLeft":
				browseCaret(event.code);
				break;
			case "ArrowRight":
				browseCaret(event.code);
				break;
			case "Backspace":
				browseCaret(event.code);
				break;
			case "Delete":
				browseCaret(event.code);
				break;
			default:
				updateInput(event.key);
				break;
		}
		fakeCaret();
	});
	document.addEventListener("keyup", function (event) {
		fakeCaret();
	});

	fakeCaret();
});
