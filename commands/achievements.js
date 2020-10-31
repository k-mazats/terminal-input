export default function achievements() {
	let response = [];
	let achievementsList = ["scpAchievement", "cheatAchievement"];
	let achievementsNames = ["SCP", "HE'S DOING IT SIDEWAY"];

	for (let j = 0; j < achievementsList.length; j++) {
		if (localStorage.length > 0) {
			for (let i = 0; i < localStorage.length; i++) {
				if (localStorage.key(i) === achievementsList[j]) {
					response.push(achievementsNames[j]);
				} else {
					response.push("CLASSIFIED INFORMATION !");
				}
			}
		}else{
            response.push("CLASSIFIED INFORMATION !");
        }
	}

	return response;
}
