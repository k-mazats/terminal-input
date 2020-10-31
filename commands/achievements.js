export default function achievements() {
	let response = [];
	let achievementsList = ["scpAchievement", "cheatAchievement", "michelAchievement",];
	let achievementsNames = ["SCP", "HE'S DOING IT SIDEWAY", "MICHEL, C'EST COMMENT ?",];

	for (let j = 0; j < achievementsList.length; j++) {
		if (localStorage.length > 0) {
			let found = false;
			for (let i = 0; i < localStorage.length; i++) {
				if (localStorage.key(i) === achievementsList[j]) {
					found = true
					response.push(achievementsNames[j]);
				}
			}
			if(found === false){
				response.push("CLASSIFIED INFORMATION !");
			}
		}else{
            response.push("CLASSIFIED INFORMATION !");
        }
	}

	return response;
}
