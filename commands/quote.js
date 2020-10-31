export default function quote(splitInput) {
	if (splitInput.length > 1) {
		switch (splitInput[1]) {
			case "string":
				return [`On appelle ça une string, désolé les filles !`];
			case "js":
				return [`Le js c'est pas fait pour faire de l'objet !`];
		}
	} else {
		return [`"quote" attends un argument. "quote -?" pour plus d'informations.`];
	}
}
