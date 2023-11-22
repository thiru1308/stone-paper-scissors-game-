// Get the game elements
const roundsInput = document.getElementById("rounds");
const startBtn = document.getElementById("start");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const roundNoSpan = document.getElementById("round-no");
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const resultDiv = document.getElementById("result");
const restartBtn = document.getElementById("restart");

let rounds = 0;
let userScore = 0;
let computerScore = 0;

// Add event listeners
startBtn.addEventListener("click", startGame);
rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));
restartBtn.addEventListener("click", restartGame);

// Start the game
function startGame() {
  rounds = parseInt(roundsInput.value);
  FixedRounds = parseInt(roundsInput.value);

  if (isNaN(rounds) || rounds < 1) {
    alert("Please enter a valid number of rounds.");
    return;
  }
  roundNoSpan.textContent = rounds;

  resetGame();
  enableChoices();
}

// Reset the game
function resetGame() {
  roundsInput.disabled = true;
  startBtn.disabled = true;
  userScore = 0;
  computerScore = 0;
  userScoreSpan.textContent = "0";
  computerScoreSpan.textContent = "0";
  resultDiv.textContent = "";
  restartBtn.style.display = "none";
}

// Enable choices
function enableChoices() {
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
}

// Disable choices
function disableChoices() {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
}

// Game logic
function playGame(userChoice) {
  // Generate computer's choice
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];

  // Determine the winner
  let result;
  if (userChoice === computerChoice) {
    result = "Tie!";
    userScore++;
    computerScore++;
    rounds--;
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win this round!";
    userScore++;
    rounds--;
  } else {
    result = "Computer wins this round!";
    computerScore++;
    rounds--;
  }

  // Update the scoreboard
  roundNoSpan.textContent = rounds;
  userScoreSpan.textContent = userScore;
  computerScoreSpan.textContent = computerScore;

  // Display the result
  resultDiv.textContent = `You chose ${userChoice}. Computer chose ${computerChoice}. ${result}`;

  // Check if the game is over
  if (rounds === 0) {
    endGame();
  }
}

// End the game
function endGame() {
  disableChoices();

  let gameResult;
  if (userScore > computerScore) {
    gameResult = "You win the game!";
  } else if (userScore < computerScore) {
    gameResult = "Computer wins the game!";
  } else {
    gameResult = "It's a tie!";
  }

  resultDiv.textContent += ` ${gameResult}`;
  restartBtn.style.display = "block";
}

// Restart the game
function restartGame() {
  roundsInput.disabled = false;
  startBtn.disabled = false;
  roundsInput.value = "";
  resetGame();
}
