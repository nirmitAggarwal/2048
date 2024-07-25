document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const gridItems = [];

  // Create 16 grid items
  for (let i = 0; i < 16; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    grid.appendChild(gridItem);
    gridItems.push(gridItem);
  }

  let matrix = [];
  let prevMatrix;
  const options = [2, 4, 8];
  let score = 0;
  const score_val = document.querySelector(".score-value");
  const result = document.querySelector(".result");

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function initializeGame() {
    matrix = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0));
    let placed = 0;
    while (placed < 2) {
      let row = getRandomInt(0, 3);
      let col = getRandomInt(0, 3);
      if (matrix[row][col] === 0) {
        matrix[row][col] = 2;
        gridItems[row * 4 + col].textContent = 2;
        placed++;
      }
    }
  }

  function updateGrid() {
    for (let i = 0; i < 16; i++) {
      gridItems[i].textContent = matrix[Math.floor(i / 4)][i % 4] || "";
    }
  }

  function shiftLeft(row) {
    let filtered = row.filter((value) => value !== 0);
    let newRow = [];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i] === filtered[i + 1]) {
        newRow.push(filtered[i] * 2);
        score += filtered[i] * 2;
        i++;
      } else {
        newRow.push(filtered[i]);
      }
    }
    while (newRow.length < 4) {
      newRow.push(0);
    }
    return newRow;
  }

  function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
      let originalRow = matrix[i].slice();
      matrix[i] = shiftLeft(matrix[i]);
      if (originalRow.toString() !== matrix[i].toString()) {
        moved = true;
      }
    }
    if (moved) {
      generateNewBlock();
      updateGrid();
      score_val.textContent = score;
    }
  }

  function moveRight() {
    for (let i = 0; i < 4; i++) {
      matrix[i] = matrix[i].reverse();
    }
    moveLeft();
    for (let i = 0; i < 4; i++) {
      matrix[i] = matrix[i].reverse();
    }
  }

  function moveUp() {
    matrix = transpose(matrix);
    moveLeft();
    matrix = transpose(matrix);
  }

  function moveDown() {
    matrix = transpose(matrix);
    moveRight();
    matrix = transpose(matrix);
  }

  function transpose(matrix) {
    let newMatrix = [];
    for (let i = 0; i < 4; i++) {
      newMatrix[i] = [];
      for (let j = 0; j < 4; j++) {
        newMatrix[i][j] = matrix[j][i];
      }
    }
    return newMatrix;
  }

  function generateNewBlock() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (matrix[i][j] === 0) {
          emptyCells.push([i, j]);
        }
      }
    }
    if (emptyCells.length > 0) {
      let [row, col] = emptyCells[getRandomInt(0, emptyCells.length - 1)];
      matrix[row][col] = options[getRandomInt(0, options.length - 1)];
    }
  }

  function handleKeyPress(e) {
    switch (e.key) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        moveRight();
        break;
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowDown":
        moveDown();
        break;
    }
  }

  document.addEventListener("keydown", handleKeyPress);

  initializeGame();
});
