const containerDiv = document.querySelector(".container");
const brushButton = document.querySelector(".brush");
const eraserButton = document.querySelector(".eraser");
const gridButton = document.querySelector(".grid-size");
let firstSetup = true;
let isBrushButtonClicked = false;
let isEraserButtonClicked = true;
let isPainting = false;
let isErasing = false;

function setup(side = 16) {
  setGridSize(side);
  if (firstSetup) {
    firstSetup = false;
    isBrushButtonClicked = true;
    toggleEraser();
    addEventListeners("paint");
  } else if (isBrushButtonClicked) {
    addEventListeners("paint");
  } else if (isEraserButtonClicked) {
    addEventListeners("erase");
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
  toggleBrush();
});

eraserButton.addEventListener("click", () => {
  toggleEraser();
});

function toggleBrush() {
  let image = document.querySelector(".brush-img");

  if (!isPainting && isBrushButtonClicked == true) {
    image.src = "./images/brush.svg";
    isBrushButtonClicked = false;
    isPainting = false;
    removeEventListeners("paint");
  } else {
    image.src = "./images/brush-off.svg";
    isBrushButtonClicked = true;
    toggleEraser();

    addEventListeners("paint");
  }
}

function toggleEraser() {
  let image = document.querySelector(".eraser-img");

  if (!isErasing && isEraserButtonClicked == true) {
    image.src = "./images/eraser.svg";
    isEraserButtonClicked = false;
    isErasing = false;

    removeEventListeners("erase");
  } else {
    image.src = "./images/eraser-off.svg";
    isEraserButtonClicked = true;
    toggleBrush();

    addEventListeners("erase");
  }
}

function paintSquare(target) {
  target.style.backgroundColor = "#666";
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
        isPainting = true;
        e.preventDefault();
        paintSquare(target);
      });
      break;
    case "mousemove":
      target.addEventListener(event, () => {
        if (isPainting) {
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

function addEraseEvent(target, event) {
  switch (event) {
    case "mousedown":
      target.addEventListener(event, () => {
        isErasing = true;
        eraseSquare(target);
      });
      break;
    case "mousemove":
      target.addEventListener(event, () => {
        if (isErasing) {
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

function removeEventListeners(func) {
  const squareDivs = document.querySelectorAll(".square");
  switch (func) {
    case "paint":
      [...squareDivs].forEach((square) => {
        removePaintEvent(square, "mousedown");
        removePaintEvent(square, "mousemove");
        removePaintEvent(square, "mouseup");
      });
      break;
    case "erase":
      [...squareDivs].forEach((square) => {
        removeEraseEvent(square, "mousedown");
        removeEraseEvent(square, "mousemove");
        removeEraseEvent(square, "mouseup");
      });
      break;
  }
}

function removePaintEvent(target, event) {
  switch (event) {
    case "mousedown":
      target.removeEventListener(event, () => {
        isPainting = false;
      });
      break;
    case "mousemove":
      target.removeEventListener(event, () => {
        isPainting = false;
      });
      break;
    case "mouseup":
      target.removeEventListener(event, () => {
        isPainting = false;
      });
      break;
  }
}

function removeEraseEvent(target, event) {
  switch (event) {
    case "mousedown":
      target.removeEventListener(event, () => {
        isErasing = false;
      });
      break;
    case "mousemove":
      target.removeEventListener(event, () => {
        isErasing = false;
      });
      break;
    case "mouseup":
      target.removeEventListener(event, () => {
        isErasing = false;
      });
      break;
  }
}
