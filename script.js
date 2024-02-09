"use strict";
// create a random number between 1 and 100
let randomNumber = parseInt(Math.random() * 100 + 1);

// select all the elements in the HTML page
const submitButton = document.querySelector("#submit");
const userInput = document.querySelector(".guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".loworHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p"); // create a new paragraph element

let prevGuess = []; // store the previous guess
let numGuess = 1; // store the number of guess

let playGame = true; // store the game state

// Play the game
if (playGame) {
  submitButton.addEventListener("click", function (event) {
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

let interValid;
let timer = 61;
function runTimer() {
  interValid = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.querySelector(".timerun").innerHTML = timer;
    } else {
      clearInterval(interValid);
      displayMessage(`Time Out! Random number was ${randomNumber} 😢`);
      endGame();
    }
  }, 1000);
}
runTimer();

// Validate the guess
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess > 100 || guess < 1) {
    alert("Please enter a number between 1 and 100");
  } else {
    prevGuess.push(guess);
    if (numGuess === 7 && guess !== randomNumber) {
      displayGuess(guess);
      displayMessage(`Game Over! Random number was ${randomNumber} 😢`);
      endGame();
      clearInterval(interValid);
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

// Check the guess
function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(
      `You guessed it Right in ${numGuess - 1} attempts & ${60 - timer
      } Seconds🎉`
    );
    endGame();
    clearInterval(interValid);
  } else if (guess < randomNumber) {
    displayMessage(`Your guess ${guess} Number is TOO Low to Acctual Number`);
  } else if (guess > randomNumber) {
    displayMessage(`Your guess ${guess} Number is TOO High to Acctual Number`);
  }
}

// Display the guess
function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${8 - numGuess}`;
}

// Display the message
function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// End the game
function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

// Start a new games
function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    numGuess = 1;
    guessSlot.innerHTML = "";
    remaining.innerHTML = `${8 - numGuess}`;
    userInput.removeAttribute("disabled");
    displayMessage("");
    startOver.removeChild(p);
    playGame = true;
    timer = 61;
    runTimer();
  });
}
