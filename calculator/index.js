const display = document.querySelector(".display");
const dotButton = document.querySelector(".dot");
const numberButtons = document.querySelectorAll(".numbers button");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const operationButtons = document.querySelectorAll(".operations button");
let signalCounter = 0;
let firstNumber;
let secondNumber;
let operator;
let displayValue;

function setup() {
  clear();
  showDisplay(displayValue);
}

function clear() {
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
  result = undefined;
  displayValue = "";
}

function setDisplayValue(char) {
  console.log(char);
  if (char == "-") {
    displayValue = char + displayValue;
  } else if (char == "+") {
    if (displayValue.at(0) == "-") displayValue = displayValue.slice(1);
  } else {
    displayValue += char;
  }
  showDisplay(displayValue);
}

function showDisplay(displayValue) {
  // TODO: limit the number to not overflow the display
  display.textContent = displayValue;
}

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      displayValue = firstNumber + secondNumber;
      showDisplay(displayValue);

      break;
    case "-":
      displayValue = firstNumber - secondNumber;
      showDisplay(displayValue);

      break;
    case "*":
      displayValue = firstNumber * secondNumber;
      showDisplay(displayValue);

      break;
    case "/":
      displayValue = firstNumber / secondNumber;
      showDisplay(displayValue);

      break;
    default:
      break;
  }
}

[...numberButtons].forEach((button) => {
  button.addEventListener("click", (e) => {
    const className = button.className;
    switch (className) {
      case "number0":
        setDisplayValue("0");
        break;
      case "number1":
        setDisplayValue("1");
        break;
      case "number2":
        setDisplayValue("2");
        break;
      case "number3":
        setDisplayValue("3");
        break;
      case "number4":
        setDisplayValue("4");
        break;
      case "number5":
        setDisplayValue("5");
        break;
      case "number6":
        setDisplayValue("6");
        break;
      case "number7":
        setDisplayValue("7");
        break;
      case "number8":
        setDisplayValue("8");
        break;
      case "number9":
        setDisplayValue("9");
        break;
      case "dot":
        setDisplayValue(".");
        disableDotButton();
        break;
      case "signal":
        if (signalCounter == 0) {
          signalCounter = 1;
          setDisplayValue("-");
        } else {
          signalCounter = 0;
          setDisplayValue("+");
        }
        break;

      default:
        break;
    }
  });
});

[...operationButtons].forEach((button) => {
  button.addEventListener("click", () => {
    const className = button.className;
    switch (className) {
      case "add":
        firstNumber = +displayValue;
        operator = "+";
        displayValue = "";
        showDisplay(displayValue);
        break;
      case "subtract":
        firstNumber = +displayValue;
        operator = "-";
        displayValue = "";
        showDisplay(displayValue);
        break;
      case "multiply":
        firstNumber = +displayValue;
        operator = "*";
        displayValue = "";
        showDisplay(displayValue);
        break;
      case "divide":
        firstNumber = +displayValue;
        operator = "/";
        displayValue = "";
        showDisplay(displayValue);
        break;
      case "calculate":
        secondNumber = +displayValue;
        displayValue = "";
        setTimeout(operate(operator, firstNumber, secondNumber), 1000);
        break;

      default:
        break;
    }
    enableDotButton();
  });
});

function disableDotButton() {
  if (dotButton.disabled == false) {
    dotButton.style.animation = "rotate 2s 1";
    setTimeout(() => {
      dotButton.firstChild.style.display = "none";
    }, 500);
    dotButton.disabled = true;
  }
}

function enableDotButton() {
  if (dotButton.disabled == true) {
    dotButton.style.animation = "rotate-reversed 2s 1";
    setTimeout(() => {
      dotButton.firstChild.style.display = "var(--fa-display, inline-block)";
    }, 600);
    dotButton.disabled = false;
    counter = 0;
  }
}

clearButton.addEventListener("click", (e) => {
  setup();
});

backspaceButton.addEventListener("click", () => {
  displayValue = displayValue.slice(0, -1);
  showDisplay(displayValue);
});

setup();
