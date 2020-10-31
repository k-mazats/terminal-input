import helper from "./commands/helper.js";
export default function commands(input) {
	let splitInput = input.split(" ");
	let splitSize = splitInput.length;
	let message = "";
	switch (splitInput[0]) {
		case "-?":
			message = helper();
			break;
		case "quote":
			if (splitInput.length > 1) {
				switch (splitInput[1]) {
					case "string":
						message = `On appelle ça une string, désolé les filles !`;
						break;
					case "js":
						message = `Le js c'est pas fait pour faire de l'objet !`;
						break;
				}
			}else{
				message = `"quote" attends un argument. "quote -?" pour plus d'informations.`;
				break;
			}
		default:
			message = `"${input}" n'est pas une commande valide. -? pour plus d'informations.`;
	}
	return message;
}
