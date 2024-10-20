let humanScore = 0;
let computerScore = 0;
const buttonsDiv = document.querySelector(".buttons");
const scoreDiv = document.querySelector(".results");
const score = document.createElement("h2");
const roundResult = document.createElement("p");
const finalResult = document.createElement("p");
finalResult.setAttribute("class", "final-result");
scoreDiv.appendChild(score);
scoreDiv.appendChild(roundResult);
scoreDiv.appendChild(finalResult);

function getComputerChoice() {
  computerChoice = Math.floor(Math.random() * 3);

  if (computerChoice === 1) {
    return "🪨";
  } else if (computerChoice === 2) {
    return "📄";
  } else {
    return "✂️";
  }
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice == computerChoice) {
    roundResult.textContent = `Draw! ${humanChoice} is equal to ${computerChoice}`;
  } else if (
    (humanChoice == "🪨" && computerChoice == "✂️") ||
    (humanChoice == "📄" && computerChoice == "🪨") ||
    (humanChoice == "✂️" && computerChoice == "📄")
  ) {
    roundResult.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
    humanScore++;
  } else {
    roundResult.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
    computerScore++;
  }
  score.textContent = `You ${humanScore} x ${computerScore} Computer`;

  if (humanScore == 5 || computerScore == 5) {
    setTimeout(restart, 5000);
    [...buttonsDiv.children].forEach((button) => {
      button.disabled = true;
    });

    if (humanScore > computerScore) {
      finalResult.textContent = `You win! The final score is: ${humanScore} x ${computerScore}.`;
    } else if (humanScore < computerScore) {
      finalResult.textContent = `You lose! The final score is: ${humanScore} x ${computerScore}.`;
    } else {
      finalResult.textContent = `It's a draw! The final score is: ${humanScore} x ${computerScore}.`;
    }

    const reloadingParagraph = document.createElement("p");
    reloadingParagraph.textContent = "Reloading...";
    scoreDiv.appendChild(reloadingParagraph);
  }
}

function playGame() {
  buttonsDiv.addEventListener("click", (event) => {
    let target = event.target;

    switch (target.className) {
      case "rock":
        playRound("🪨", getComputerChoice());
        break;
      case "paper":
        playRound("📄", getComputerChoice());
        break;
      case "scissors":
        playRound("✂️", getComputerChoice());
        break;
    }
  });
}

function restart() {
  [...buttonsDiv.children].forEach((button) => {
    button.disabled = false;
  });
  scoreDiv.lastChild.remove();
  humanScore = 0;
  computerScore = 0;
  roundResult.textContent = "";
  finalResult.textContent = "";
  score.textContent = `You ${humanScore} x ${computerScore} Computer`;
}
