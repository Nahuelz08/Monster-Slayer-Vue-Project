function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
	data() {
		return {
			monsterHealth: 100,
			playerHealth: 100,
			currentRound: 0,
			winner: null,
			logMessages: [],
		};
	},
	methods: {
		startGame() {
			this.currentRound = 0;
			this.monsterHealth = 100;
			this.playerHealth = 100;
			this.winner = null;
			this.logMessages = [];
		},
		attack() {
			this.currentRound++;
			const attackValue = getRandomValue(5, 12);
			this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
			this.monsterAttack();
		},
		monsterAttack() {
			const attackValue = getRandomValue(8, 15);
			this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
		},
		specialAttack() {
			this.currentRound++;
			const attackValue = getRandomValue(10, 25);
			this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'special attack', attackValue);
			this.monsterAttack();
		},
		heal() {
			this.currentRound++;
			const healValue = getRandomValue(8, 20);
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healValue;
			}
            this.addLogMessage('player', 'heal', healValue);
			this.monsterAttack();
		},
		surrender() {
			this.currentRound++;
			this.playerHealth = 0;
		},
		addLogMessage(who, what, value) {
			this.logMessages.unshift({
				actionBy: who,
				actionType: what,
				actionValue: value,
			});
		},
	},
	computed: {
		monsterHealthbar() {
			if (this.monsterHealth < 0) {
				return { width: "0%" };
			}
			return { width: this.monsterHealth + "%" };
		},
		playerHealthbar() {
			if (this.playerHealth < 0) {
				return { width: "0%" };
			}
			return { width: this.playerHealth + "%" };
		},
		mayUseSpecialAttack() {
			return this.currentRound % 3 !== 0;
		},
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				this.winner = "draw";
			} else if (value <= 0) {
				this.winner = "monster";
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerHealth <= 0) {
				this.winner = "draw";
			} else if (value <= 0) {
				this.winner = "player";
			}
		},
	},
});

app.mount("#game");
