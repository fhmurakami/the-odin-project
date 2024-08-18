function getComputerChoice() {
  computerChoice = Math.floor(Math.random() * 3);

  if (computerChoice === 1) {
    return "rock";
  } else if (computerChoice === 2) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getHumanChoice() {
  humanChoice = prompt("🪨 📄 ✂️ (rock paper scissors)").toLowerCase();

  return humanChoice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice == computerChoice) {
    console.log(`Draw! ${humanChoice} is equal to ${computerChoice}`);
  } else if (
    (humanChoice == "rock" && computerChoice == "scissors") ||
    (humanChoice == "paper" && computerChoice == "rock") ||
    (humanChoice == "scissors" && computerChoice == "paper")
  ) {
    console.log(`You win! ${humanChoice} beats ${computerChoice}`);
    humanScore += 1;
  } else {
    console.log(`You lose! ${computerChoice} beats ${humanChoice}`);
    computerScore++;
  }
}

function playGame() {
  humanScore = 0;
  computerScore = 0;

  for (i = 0; i < 5; i++) {
    playRound(getHumanChoice(), getComputerChoice());
  }

  if (humanScore > computerScore) {
    console.log(
      `You win! The final score is: ${humanScore} x ${computerScore}.`
    );
  } else if (humanScore < computerChoice) {
    console.log(
      `You lose! The final score is: ${humanScore} x ${computerScore}.`
    );
  } else {
    console.log(
      `It's a draw! The final score is: ${humanScore} x ${computerScore}.`
    );
  }
}
