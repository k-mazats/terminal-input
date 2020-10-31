import helper from "./commands/helper.js";
import quote from "./commands/quote.js";
import scp from "./commands/scp.js";
import achievements from "./commands/achievements.js";
import michel from "./commands/michel.js";

export default function commands(input) {
	let splitInput = input.split(" ");
	let message = "";
	switch (splitInput[0]) {
		case "-?":
			message = helper();
			break;
		case "quote":
			message = quote(splitInput);
			break;
		case "scp":
			message = scp();
			break;
		case "achievements":
			message = achievements();
			break;
		case "michel":
			message = michel(splitInput);
			break;
		default:
			message = [
				`"${input}" n'est pas une commande valide. -? pour plus d'informations.`,
			];
	}
	return message;
}
