let playerHand = 0;			 //stuff
let playerDice = [0, 0, 0];		 //
let aiHand = 0;			 	 //to
let aiDice = [0, 0, 0];			 //
let temp1, temp2, temp3 = 0; //initialize..

let playerTurn = false; //player will go second, but both the AI and the player's dice will be displayed at the same time for now
let aiTurn = true;

let playerWon = false;
let aiWon = false;
let div;

function initialize() {
	div = document.getElementById('game-wrapper');
	
	aiTurn = true;
	playerTurn = false;
	
	diceRoll(); //the AI rolls at the same time as the player. I'm sorry it happens this way, but this is how it works until I have time to fix it.
}

function diceRoll() {
	if(aiTurn == true && playerTurn == false) {
		for(let i=0;i<aiDice.length;i++){
			aiDice[i]=Math.floor(Math.random()*6)+1;
		}
		
		playerTurn = true;
		aiTurn = false;
		
		div.innerHTML += aiDice + "<br>";
		console.log(aiDice);
	}
	if(playerTurn == true) {
		for(let i=0;i<playerDice.length;i++){
			playerDice[i]=Math.floor(Math.random()*6)+1;
		}
		
		playerTurn = false;
		
		div.innerHTML += playerDice + "<br>";
		console.log(playerDice);
	}
	if(playerTurn == false && aiTurn == false) {
		diceChecker();
	}
}

function diceChecker() {
	let temp;
	if(playerTurn == false && aiTurn == false) { //I wrote it this way so that it considers who wins or not when both turns are taken. I plan on fixing this.
		for(let i = 0; i < playerDice.length; i++) {
			for(let j = 0; j < playerDice.length; j++) {
				if(playerDice[i] < playerDice[j]) {
					temp = playerDice[j];
					playerDice[j] = playerDice[i];
					playerDice[i] = temp;
				}
			}
		}
		if(aiDice.includes(1) && aiDice.includes(2) && aiDice.includes(3)) {
			console.log("It's a 1-2-3, so I win.");
			aiWon = true;
		}
		if(playerDice.includes(1) && playerDice.includes(2) && playerDice.includes(3)) {
			console.log("It's a 1-2-3 so you lose. Better luck next time.");
			aiWon = true;
		}
		if(aiDice.includes(4) && aiDice.includes(5) && aiDice.includes(6)) {
			console.log("I rolled a 4-5-6. Since I'm the dealer, it looks like you won.");
			playerWon = true;
		}
		if(playerDice.includes(4) && playerDice.includes(5) && playerDice.includes(6)) {
			console.log("It's a 4-5-6 so you instantly win. Nice!");
			playerWon = true;
		}
		if(aiDice[0] == aiDice[1] == aiDice[2]) {
			console.log("Triples! Let's take a closer look.");
			aiHand = aiDice[0];
			if(aiHand > 3) {
				console.log(`I rolled three ${aiHand}'s. Because I'm the dealer, I win!`);
				aiWon = true;
			}
			if(aiHand <= 3) {
				console.log(`I rolled three ${aiHand}'s. Because I'm the dealer, I lost.`);
				playerWon = true;
			}
		}
		if(playerDice[0] == playerDice[1] == playerDice[2]) {
			console.log("Triples! Let's take a closer look.");
			playerHand = playerDice[0];
			if(playerHand > 3) {
				console.log(`So you rolled three ${playerHand}'s. Looks like a win for you!`);
			}
			if(playerHand <= 3) {
				console.log(`So you rolled three ${playerHand}'s. I win.`);
			}
			playerWon = true;
		}
		if(playerDice[0] == playerDice[1] && playerDice[2] == 6) {
			console.log("Your hand is 6. You won!");
			playerWon = true;
		}
		if(aiDice[0] == aiDice[1] && aiDice != 1) {
			aiHand == aiDice[2];
			console.log(`My hand is ${aiHand}.`);
		}
		if(playerDice[0] == playerDice[1] && playerDice[2] != 1) {
			playerHand == playerDice[2];
			console.log(`Your hand is ${playerHand}.`);
		}
		else {
			console.log(`No match.`);
		}
		playerTurn = false;
	}
}

function whoWon() {
	if(playerWon == true) {
		console.log("Player won! Play again?");
	}
	if(aiWon == true) {
		console.log("You lost. Play again?");
	}
}

document.getElementById('new-game').addEventListener('click',initialize);
document.getElementById('dice-roll').addEventListener('click',diceRoll);
document.getElementById('play-again').addEventListener('click',initialize);