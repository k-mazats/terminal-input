export default function scp() {
        if (localStorage.getItem("scpAchievement") === null) {
                    localStorage.setItem("scpAchievement", true);
                    return [
											`Niveau d'acréditation insuffisant !`,
											`<strong class="achievement">Nouveau succés débloqué !</strong>`,
										];
                }
		return [
			`Niveau d'acréditation insuffisant !`,
		];
	
}
