const containerDiv = document.querySelector(".container");
const brushButton = document.querySelector(".brush");
const rainbowButton = document.querySelector(".rainbow");
const eraserButton = document.querySelector(".eraser");
const gridButton = document.querySelector(".grid-size");
let firstSetup = true;
let isBrushButtonClicked = false;
let isEraserButtonClicked = false;
let isRainbowButtonClicked = false;
let isPainting = false;
let isRainbowPainting = false;
let isErasing = false;

function setup(side = 16) {
  setGridSize(side);
  if (firstSetup) {
    firstSetup = false;
    enableBrush();
  } else if (isBrushButtonClicked) {
    enableBrush();
  } else if (isRainbowButtonClicked) {
    enableRainbow();
  } else if (isEraserButtonClicked) {
    enableEraser();
  }
}

function setGridSize(side) {
  let containerSize = containerDiv.offsetWidth;
  let squareSize = containerSize / side;

  [...containerDiv.children].forEach((div) => {
    div.remove();
  });

  for (i = 0; i < side; i++) {
    const rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row");
    for (j = 0; j < side; j++) {
      const columnDiv = document.createElement("div");
      columnDiv.setAttribute("class", "square");
      columnDiv.style.width = `${squareSize}px`;
      columnDiv.style.height = `${squareSize}px`;
      rowDiv.appendChild(columnDiv);
    }
    containerDiv.appendChild(rowDiv);
  }
}

gridButton.addEventListener("click", () => {
  let size;
  do {
    size = prompt("Set grid size (MAX 100):");
  } while (size < 1 || size > 100);

  setup(size);
});

brushButton.addEventListener("click", () => {
  if (isBrushButtonClicked) {
    disableBrush();
  } else {
    enableBrush();
  }
});

rainbowButton.addEventListener("click", () => {
  if (isRainbowButtonClicked) {
    disableRainbow();
  } else {
    enableRainbow();
  }
});

eraserButton.addEventListener("click", () => {
  if (isEraserButtonClicked) {
    disableEraser();
  } else {
    enableEraser();
  }
});

function enableBrush() {
  let image = document.querySelector(".brush-img");

  if (!isPainting && isBrushButtonClicked == false) {
    disableEraser();
    disableRainbow();

    image.src = "./images/brush-off.svg";
    isBrushButtonClicked = true;

    addEventListeners("paint");
  }
}

function disableBrush() {
  let image = document.querySelector(".brush-img");

  image.src = "./images/brush.svg";
  isBrushButtonClicked = false;
  isPainting = false;
}

function enableRainbow() {
  let image = document.querySelector(".rainbow-img");

  if (!isRainbowPainting && isRainbowButtonClicked == false) {
    disableBrush();
    disableEraser();

    image.src = "./images/rainbow-off.svg";
    isRainbowButtonClicked = true;

    addEventListeners("paintRainbow");
  }
}

function disableRainbow() {
  let image = document.querySelector(".rainbow-img");

  image.src = "./images/rainbow.svg";
  isRainbowButtonClicked = false;
  isRainbowPainting = false;
}

function enableEraser() {
  let image = document.querySelector(".eraser-img");

  if (!isErasing && isEraserButtonClicked == false) {
    disableBrush();
    disableRainbow();

    image.src = "./images/eraser-off.svg";
    isEraserButtonClicked = true;

    addEventListeners("erase");
  }
}

function disableEraser() {
  let image = document.querySelector(".eraser-img");

  image.src = "./images/eraser.svg";
  isEraserButtonClicked = false;
  isErasing = false;
}

function setRandomColor() {
  return `rgb(
    ${Math.random() * 255},
    ${Math.random() * 255},
    ${Math.random() * 255}
    )`;
}

function paintSquare(target) {
  target.style.backgroundColor = "var(--engineering-orange)";
}

function paintRainbowSquare(target) {
  target.style.backgroundColor = setRandomColor();
}

function eraseSquare(target) {
  target.style.backgroundColor = "";
}

function addEventListeners(func) {
  const squareDivs = document.querySelectorAll(".square");
  switch (func) {
    case "paint":
      [...squareDivs].forEach((square) => {
        addPaintEvent(square, "mousedown");
        addPaintEvent(square, "mousemove");
        addPaintEvent(square, "mouseup");
      });
      break;
    case "paintRainbow":
      [...squareDivs].forEach((square) => {
        addRainbowPaintEvent(square, "mousedown");
        addRainbowPaintEvent(square, "mousemove");
        addRainbowPaintEvent(square, "mouseup");
      });
      break;
    case "erase":
      [...squareDivs].forEach((square) => {
        addEraseEvent(square, "mousedown");
        addEraseEvent(square, "mousemove");
        addEraseEvent(square, "mouseup");
      });
      break;
  }
}

function addPaintEvent(target, event) {
  switch (event) {
    case "mousedown":
      target.addEventListener(event, (e) => {
        if (isBrushButtonClicked) {
          isPainting = true;
          e.preventDefault();
          paintSquare(target);
        }
      });
      break;
    case "mousemove":
      target.addEventListener(event, () => {
        if (isPainting && isBrushButtonClicked) {
          paintSquare(target);
        }
      });
      break;
    case "mouseup":
      target.addEventListener(event, () => {
        isPainting = false;
      });
      break;
  }
}

function addRainbowPaintEvent(target, event) {
  switch (event) {
    case "mousedown":
      target.addEventListener(event, (e) => {
        if (isRainbowButtonClicked) {
          isRainbowPainting = true;
          e.preventDefault();
          paintRainbowSquare(target);
        }
      });
      break;
    case "mousemove":
      target.addEventListener(event, () => {
        if (isRainbowPainting && isRainbowButtonClicked) {
          paintRainbowSquare(target);
        }
      });
      break;
    case "mouseup":
      target.addEventListener(event, () => {
        isRainbowPainting = false;
      });
      break;
  }
}

function addEraseEvent(target, event) {
  switch (event) {
    case "mousedown":
      target.addEventListener(event, (e) => {
        if (isEraserButtonClicked) {
          isErasing = true;
          e.preventDefault();
          eraseSquare(target);
        }
      });
      break;
    case "mousemove":
      target.addEventListener(event, () => {
        if (isErasing && isEraserButtonClicked) {
          eraseSquare(target);
        }
      });
      break;
    case "mouseup":
      target.addEventListener(event, () => {
        isErasing = false;
      });
      break;
  }
}
