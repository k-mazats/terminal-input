import commands from "./commands.js"; // gere la reponse aux commandes 

document.addEventListener("DOMContentLoaded", function () {
	let terminalInput = document.getElementById("input");
	let caretDiv = document.getElementById("caret");
	let inputLeft = terminalInput.offsetLeft;
	let inputTop = terminalInput.offsetTop;
	let history = document.getElementById("terminalHistory");

	caretDiv.style.left = `${inputLeft}px`;
	caretDiv.style.top = `${inputTop}px`;

	function updateCaret() {
		let strLength = terminalInput.value.length;
		caretDiv.style.marginLeft = `${strLength + 1}ch`;
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
		fakeCaret();
	});

	fakeCaret();
});
