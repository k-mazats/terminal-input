export default function michel(splitInput) {
	let message = [];
	if (splitInput.length > 1) {
		if (splitInput[1] === "docker") {
			message.push(
				"Pas de galères ( surtout quand tu travailles à plusieurs ) et ton pc reste propre, t'installes rien sur ton os, tout reste dans les conteneurs."
			);
			message.push("...");
			message.push("C'est l'avenir !");
		}
	} else {
		message = [
			`Vous connaissez Docker ?`,
			`...`,
			`Je vous jure c'est génial !`,
		];
    }
    if (localStorage.getItem("michelAchievement") === null) {
			localStorage.setItem("michelAchievement", true);
			message.push(`<strong class="achievement">Nouveau succés débloqué !</strong>`);
		}
	return message;
}
