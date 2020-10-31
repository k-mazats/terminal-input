import commands from "./commands.js"; // gere la reponse aux commandes

document.addEventListener("DOMContentLoaded", function () {
	let terminalInput = document.getElementById("input");
	terminalInput.setAttribute(
		"name",
		Math.random().toString(36).substr(0, 420000000)
	);
	let caretDiv = document.getElementById("caret");
	let inputLeft = terminalInput.offsetLeft;
	let inputTop = terminalInput.offsetTop;
	let history = document.getElementById("terminalHistory");
	let caretOffset = 0;
	let highlight;
	let importantKeys = [
		"Escape",
		"F1",
		"F2",
		"F3",
		"F4",
		"F5",
		"F6",
		"F7",
		"F8",
		"F9",
		"F10",
		"F11",
		"F12",
		"PrintScreen",
		"ScrollLock",
		"Pause",
		"Insert",
		"Home",
		"PageUp",
		"PageDown",
		"End",
		"NumLock",
		"CapsLock",
		"ShiftLeft",
		"ControlLeft",
		"AltLeft",
		"AltRight",
		"ControlRight",
		"ShiftRight",
		"Backspace",
	];
	//"MetaLeft",
	caretDiv.style.left = `${inputLeft}px`;
	caretDiv.style.top = `${inputTop}px`;

	let tempInput = "";

	function updateCaret() {
		let strLength = terminalInput.value.length;
		caretDiv.style.marginLeft = `${strLength + caretOffset}ch`;
		caretDiv.style.top = `${inputTop}px`;
	}

	function browseCaret(key) {
		//This function listen for keys that should move the caret inside the input value and update caret position and highlighted char
		let strLength = terminalInput.value.length;
		if(key !== "Backspace"){switch (key) {
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
		caretDiv.innerHTML = highlight;}
	}

	function fakeCaret() {
		updateCaret();
		input.focus();
	}

	function terminalSubmit() {
		history.innerHTML += `<div class="terminal">
            <div class="terminal-prefix" id="terminalPrefix">@BrunOS/<span class="croissant">🥐</span>CLI:</div>
            <div>${terminalInput.value}</div>
		</div>`;
		let reply = commands(terminalInput.value);
		history.innerHTML += `<div class="terminal">
            <div class="terminal-prefix" id="terminalPrefix">@BrunOS/<span class="croissant">🥐</span>CLI:</div>
            <div>${reply}</div>
		</div>`;
		terminalInput.value = "";
		tempInput = "";
		caretOffset = 0;
	}
	function updateInput(key) {
		if (key === "Backspace") {
			let inputArray = tempInput.split("");
			let inputLength = inputArray.length;
			if (caretOffset === 0) {
				inputArray.pop(inputLength);
				tempInput = inputArray.join("");
				terminalInput.value = tempInput;
				caretDiv.innerHTML ="";
			} else {
				inputArray.splice(inputLength + caretOffset -1, 1);
				tempInput = inputArray.join("");
				terminalInput.value = tempInput;
				highlight = terminalInput.value.charAt(
					terminalInput.value.length + caretOffset
				);
				console.log(`carOff = ${caretOffset} inputlength = ${tempInput.length}`);
				if(caretOffset + tempInput.length === 0){
					caretOffset += 1;
				}
				caretDiv.innerHTML = highlight;
			}
		} else {
			if (caretOffset === 0) {
				tempInput += key;
				terminalInput.value = tempInput;
			} else {
				let inputArray = tempInput.split("");
				inputArray[inputArray.length + caretOffset] = key;
				tempInput = inputArray.join("");
				terminalInput.value = tempInput;
				highlight = terminalInput.value.charAt(
					terminalInput.value.length + caretOffset
				);
				caretDiv.innerHTML = highlight;
			}
		}
	}
	document.addEventListener("click", function () {
		fakeCaret();
	});
	document.addEventListener("keydown", function (event) {
		if (
			importantKeys.indexOf(event.code) === -1 &&
			importantKeys.indexOf(event.key) === -1
		) {
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
				case "Delete":
					browseCaret(event.code);
					break;
				default:
					updateInput(event.key);
					break;
			}
			fakeCaret();
		} else if (event.code === "Backspace") {
			updateInput(event.key);
			browseCaret(event.code);
		}
	});
	document.addEventListener("keyup", function (event) {
		fakeCaret();
	});

	fakeCaret();
});
