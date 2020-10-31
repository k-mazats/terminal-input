document.addEventListener("DOMContentLoaded", function (event) {
	let terminalInput = document.getElementById("input");
	let caretDiv = document.getElementById("caret");
	let inputLeft = terminalInput.offsetLeft;
    let inputTop = terminalInput.offsetTop;
    let history = document.getElementById("terminalHistory");

	caretDiv.style.left = `${inputLeft}px`;
	caretDiv.style.top = `${inputTop}px`;

	function updateCaret() {
		let strLength = terminalInput.value.length;
		console.log(inputTop);
		caretDiv.style.marginLeft = `${strLength + 1}ch`;
		caretDiv.style.top = `${inputTop}px`;
	}

	function getDefaultFontSize(parentElement) {
		parentElement = parentElement || document.body;
		var div = document.createElement("div");
		div.style.width = "1000ch";
		parentElement.appendChild(div);
		var pixels = div.offsetWidth / 1000;
		parentElement.removeChild(div);
		console.log(pixels);
		return pixels;
	}

	function fakeCaret() {
		// let selectionPosition = terminalInput.selectionStart;
        // let chWidth = getDefaultFontSize();
		updateCaret();
		input.focus();
	}

	function terminalSubmit() {
        history.innerHTML += `<div class="terminal">
            <div class="terminal-prefix" id="terminalPrefix">@BrunOS/<span class="croissant">🥐</span>CLI:</div>
            <div>${input.value}</div>
        </div>`;
		input.value = "";
	}

	document.addEventListener("click", function () {
		fakeCaret();
	});
	document.addEventListener("keyup", function (event) {
		if (event.code === "Enter") {
			terminalSubmit();
		}
		fakeCaret();
	});

	fakeCaret();
});
