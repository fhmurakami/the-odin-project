const display = document.querySelector(".display");
const dotButton = document.querySelector(".dot");
const numberButtons = document.querySelectorAll(".numbers button");
const clearButton = document.querySelector(".clear");
let counter = 0;
let firstNumber;
let secondNumber;
let operator;
let result;
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
  display.textContent = displayValue;
}

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      result = firstNumber / secondNumber;
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
        button.style.animation = "rotate 2s 1";
        setTimeout(() => {
          button.firstChild.style.display = "none";
        }, 500);
        button.disabled = true;
        break;
      case "signal":
        if (counter == 0) {
          counter = 1;
          setDisplayValue("-");
        } else {
          counter = 0;
          setDisplayValue("+");
        }
        break;

      default:
        break;
    }
  });
});

dotButton.addEventListener("click", (e) => {
  const target = e.target;
  if (counter == 0) {
    // target.style.animation = "rotate 2s 1";
    // setTimeout(() => {
    //   target.firstChild.style.display = "none";
    // }, 500);
    // target.disabled = true;
    counter = 1;
  } else {
    target.style.animation = "rotate-reversed 2s 1";
    setTimeout(() => {
      target.firstChild.style.display = "var(--fa-display, inline-block)";
    }, 600);
    counter = 0;
  }
});

clearButton.addEventListener("click", (e) => {
  setup();
});

setup();
