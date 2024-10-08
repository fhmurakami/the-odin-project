const display = document.querySelector(".display");
const dotButton = document.querySelector(".dot");
const numberButtons = document.querySelectorAll(".numbers button");
const clearButton = document.querySelector(".clear");
const backspaceButton = document.querySelector(".backspace");
const operationButtons = document.querySelectorAll(".operations button");
const bugSymbol = document.createElement("i");
let signalPressed = false;
let firstNumber;
let secondNumber;
let operator;
let lastOperator;
let displayValue;

bugSymbol.setAttribute("class", "fa-solid fa-bug");
bugSymbol.style.fontSize = "4rem";
bugSymbol.style.verticalAlign = "25%";

function setup() {
  clear();
  showDisplay(displayValue);
}

function clear() {
  enableDotButton();
  signalPressed = false;
  firstNumber = undefined;
  secondNumber = undefined;
  operator = undefined;
  lastOperator = undefined;
  displayValue = "";
}

function setDisplayValue(char) {
  if (displayValue.length > 2 && displayValue.at(1) != ".") {
    displayValue = displayValue.slice(1);
  }
  if (char == "-") {
    if (displayValue == "" && firstNumber) {
      displayValue = char + firstNumber;
    } else {
      displayValue = char + displayValue;
    }
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

function updateValues(value) {
  displayValue = "";
  firstNumber = value;
  showDisplay(value);
}

function operate(symbol, a, b) {
  let result;
  switch (symbol) {
    case "+":
      result = a + b;
      updateValues(result);

      break;
    case "-":
      result = a - b;
      updateValues(result);

      break;
    case "*":
      result = a * b;
      updateValues(result);

      break;
    case "/":
      if (b == 0) {
        clear();

        display.appendChild(bugSymbol);
      } else {
        result = a / b;
        updateValues(result);
      }

      break;
  }
}

function setFirstNumber() {
  firstNumber = +displayValue;
  displayValue = "";
  showDisplay(displayValue);
}

function setSecondNumber() {
  secondNumber = +displayValue;
  displayValue = "";
  showDisplay(displayValue);
}

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
        if (displayValue == "") {
          setDisplayValue("0");
        }
        setDisplayValue(".");
        disableDotButton();
        break;
      case "signal":
        if (signalPressed == false && displayValue != "") {
          signalPressed = true;
          setDisplayValue("-");
        } else {
          signalPressed = false;
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
    signalPressed = false;
    if (lastOperator && firstNumber) {
      secondNumber = +displayValue;
      setTimeout(operate, 200, lastOperator, firstNumber, secondNumber);
      clear();
      showDisplay("");
    }

    const className = button.className;
    switch (className) {
      case "add":
        operator = "+";
        lastOperator = operator;
        firstNumber === undefined ? setFirstNumber() : setSecondNumber();
        break;
      case "subtract":
        operator = "-";
        lastOperator = operator;
        firstNumber === undefined ? setFirstNumber() : setSecondNumber();
        break;
      case "multiply":
        operator = "*";
        lastOperator = operator;
        firstNumber === undefined ? setFirstNumber() : setSecondNumber();
        break;
      case "divide":
        operator = "/";
        lastOperator = operator;
        firstNumber === undefined ? setFirstNumber() : setSecondNumber();
        break;
      case "calculate":
        setTimeout(clear, 200);
    }

    enableDotButton();
  });
});

clearButton.addEventListener("click", (e) => {
  setup();
});

backspaceButton.addEventListener("click", () => {
  displayValue = displayValue.slice(0, -1);
  showDisplay(displayValue);
});

setup();
