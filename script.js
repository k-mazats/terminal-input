import commands from "./commands.js"; // gere la reponse aux commandes

document.addEventListener("DOMContentLoaded", function () {
	let terminalInput = document.getElementById("input");
	terminalInput.setAttribute(
		"name",
		Math.random().toString(36).substr(0, 420000000)
	);
	let caretDiv = document.getElementById("caret");

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
	];

	let tempInput = "";
	let commandsHistory = [];
	let commandsHistoryIndex = 0;
	let browsing = false;
	let inputMemory ="";
	//FUNCTIONS
	function updateCaret() {
		let inputLeft = terminalInput.offsetLeft;
		let inputTop = terminalInput.offsetTop;
		let strLength = terminalInput.value.length;
		caretDiv.style.left = `${inputLeft}px`;
		caretDiv.style.top = `${inputTop}px`;
		caretDiv.style.marginLeft = `${strLength + caretOffset}ch`;
		caretDiv.style.top = `${inputTop}px`;
	}

	function browseCaret(key) {
		//This function listen for keys that should move the caret inside the input value and update caret position and highlighted char
		let strLength = terminalInput.value.length;
		if (key === "Backspace") {
			if (caretOffset === 0) {
				caretDiv.innerHTML = "";
			} else {
				if (caretOffset < 0 - tempInput.length) {
					caretOffset++;
				}
				highlight = terminalInput.value.charAt(
					terminalInput.value.length + caretOffset
				);
				caretDiv.innerHTML = highlight;
			}
		} else if (key === "Delete") {
			if (caretOffset < -1) {
				console.log(caretOffset);
				caretOffset++;
			}
		} else {
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
		for (let i = 0; i < reply.length; i++) {
			history.innerHTML += `<div class="terminal">
            	<div class="terminal-prefix" id="terminalPrefix">@BrunOS/<span class="croissant">🥐</span>CLI:</div>
				<div>${reply[i]}</div>
			</div>`;
		}
		commandsHistory.push(terminalInput.value);
		terminalInput.value = "";
		tempInput = "";
		inputMemory="";
		caretOffset = 0;
	}

	function updateInput(key) {
		if (key === "Backspace") {
			let inputArray = tempInput.split("");
			let inputLength = inputArray.length;
			if (caretOffset === 0) {
				inputArray.pop();
				tempInput = inputArray.join("");
				terminalInput.value = tempInput;
			} else {
				if (caretOffset === 0 - tempInput.length) {
					inputArray.splice(0, 1);
				} else {
					inputArray.splice(inputLength + caretOffset - 1, 1);
				}
				tempInput = inputArray.join("");
				terminalInput.value = tempInput;
			}
		} else if (key === "Delete") {
			let inputArray = tempInput.split("");
			let inputLength = inputArray.length;
			if (caretOffset !== 0) {
				inputArray.splice(inputLength + caretOffset + 1, 1);
			}
			tempInput = inputArray.join("");
			terminalInput.value = tempInput;
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

	function browseHistory(key){
		
		console.log(commandsHistoryIndex);
		console.table(commandsHistory);
		switch (key) {
			case "ArrowUp":
				if (commandsHistoryIndex === 0 && browsing === false) {
					commandsHistoryIndex = commandsHistory.length - 1;
					inputMemory = terminalInput.value;
					terminalInput.value = commandsHistory[commandsHistoryIndex];
				} else if (commandsHistoryIndex === 0) {
					terminalInput.value = commandsHistory[commandsHistoryIndex];
				} else {
					commandsHistoryIndex--;
					
					terminalInput.value = commandsHistory[commandsHistoryIndex];
				}
				browsing = true;
				break;
			case "ArrowDown":
				if (
					commandsHistoryIndex !== 0 &&
					browsing === true &&
					commandsHistoryIndex !== commandsHistory.length -1
				) {
					commandsHistoryIndex++;
					terminalInput.value = commandsHistory[commandsHistoryIndex];
				} else if (
					browsing === true
				) {
					commandsHistoryIndex = 0;
					terminalInput.value = inputMemory;
					browsing= false;
				} break;
		}
	}

	//EVENTS LISTENERS
	document.addEventListener("click", function () {
		fakeCaret();
	});
	document.addEventListener("keyup", function (event) {
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
				case "ArrowUp":
					browseHistory(event.key);
					break;
				case "ArrowDown":
					browseHistory(event.key);
					break;
				case "Delete":
					updateInput(event.key);
					browseCaret(event.code);
					break;
				case "Backspace":
					updateInput(event.key);
					browseCaret(event.code);
					break;
				default:
					updateInput(event.key);
					break;
			}
			fakeCaret();
		}
	});
	document.addEventListener("keyup", function (event) {
		fakeCaret();
	});
	window.addEventListener("resize", function () {
		updateCaret();
		console.log("size");
	});

	fakeCaret();
});
