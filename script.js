import commands from "./commands.js"; // gere la reponse aux commandes

document.addEventListener("DOMContentLoaded", function () {
	let terminalInput = document.getElementById("input");
	let caretDiv = document.getElementById("caret");
	let inputLeft = terminalInput.offsetLeft;
	let inputTop = terminalInput.offsetTop;
	let history = document.getElementById("terminalHistory");
	let caretOffset = 0;

	caretDiv.style.left = `${inputLeft}px`;
	caretDiv.style.top = `${inputTop}px`;

	function updateCaret() {
		let strLength = terminalInput.value.length;
		caretDiv.style.marginLeft = `${strLength + caretOffset + 1}ch`;
		caretDiv.style.top = `${inputTop}px`;
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
	}

	document.addEventListener("click", function () {
		fakeCaret();
	});
	document.addEventListener("keydown", function (event) {
		if (event.code === "Enter") {
			terminalSubmit();
		}
		if (event.code !== "Backspace" && input.value.length > 0) {
			switch (event.code) {
				case "ArrowLeft":
					if (caretOffset - 1 >= 0 - input.value.length) {
						caretOffset--;
					}
					break;
				case "ArrowRight":
					if (caretOffset + 1 <= 0) {
						caretOffset++;
					}
					break;
			}
			if (caretOffset < 0 && caretDiv.classList.length === 0) {
				caretDiv.classList += "caret-back";
			} else if (caretOffset === 0) {
				caretDiv.classList = [];
			}
			fakeCaret();
		}
	});
	document.addEventListener("keyup", function (event) {
		if (event.code === "Backspace") {
			fakeCaret();
		}
	});

	fakeCaret();
});
