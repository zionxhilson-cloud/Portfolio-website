// Get references to HTML elements
const myButton = document.getElementById("myButton");   // Roll button
const Label1 = document.getElementById("Label1");       // Message label
const diceImage = document.getElementById("diceImage"); // Dice image
const scoreText = document.getElementById("score");     // Wins counter
const stageText = document.getElementById("stage");     // Stage indicator
const confetti = document.getElementById("confetti");   // Confetti container

// Define dice range (6-sided dice)
const min = 1;
const max = 6;

// Track game state
let rolledThree = false; // True if player already rolled a 3
let score = 0;           // Number of wins

// Function called when user clicks the roll button
myButton.onclick = function(){

    let rollCount = 0; // Counter for animation rolls

    // Roll animation interval: changes dice quickly for 1 second
    const rollAnimation = setInterval(() => {

        // Temporary random number for animation effect
        let tempRoll = Math.floor(Math.random() * max) + min;
        diceImage.src = "dice" + tempRoll + ".png"; // Update dice image

        rollCount++;

        // Stop animation after ~15 quick rolls (~1 second)
        if(rollCount > 15){

            clearInterval(rollAnimation); // Stop interval

            // Final dice roll
            let finalRoll = Math.floor(Math.random() * max) + min;
            diceImage.src = "dice" + finalRoll + ".png";

            // Clear previous confetti
            confetti.textContent = "";

            // If player has not rolled a 3 yet
            if(!rolledThree){

                if(finalRoll === 3){
                    // Player rolled 3, now next stage is 6
                    rolledThree = true;
                    Label1.textContent = "You rolled 3! Now roll a 6!";
                    stageText.textContent = "Roll a 6";
                } else {
                    // Player did not roll 3, remind them
                    Label1.textContent = "You rolled " + finalRoll + ". Try to roll a 3 first.";
                    stageText.textContent = "Roll a 3";
                }

            } else {
                // Player already rolled 3, now trying to roll 6

                if(finalRoll === 6){
                    // Player wins and adds one to the score counter
                    score++;
                    scoreText.textContent = score;

                    Label1.textContent = "You rolled 6! YOU WIN!";
                    confetti.textContent = "🎉🎉🎉🎉🎉";

                    // Reset game for next round
                    rolledThree = false;
                    stageText.textContent = "Roll a 3";
                } else {
                    // Player did not roll 6
                    Label1.textContent = "You rolled " + finalRoll + ". You needed a 6!";
                    stageText.textContent = "Roll a 6";
                }
            }
        }

    }, 100); // Roll animation speed in milliseconds

};