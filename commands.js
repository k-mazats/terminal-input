export default function commands(input) {
	let splitInput = input.split(" ");
	let splitSize = splitInput.length;
	let message = "";
	switch (splitInput[0]) {
		case "?":
			message = `Bienvenue sur BrunOS, si vous voulez un cours va falloir demander à Michel`;
			break;
		case "quote":
            message = `"quote" attends un argument.`;
			switch (splitInput[1]) {
				case "string":
					message = `On appelle ça une string, désolé les filles !`;
					break;
				case "js":
					message = `Le js c'est pas fait pour faire de l'objet !`;
                    break;
                    
			}
	}
	return message;
}
