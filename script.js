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

  // Function to get a random integer between min (inclusive) and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to initialize the grid with two random values of 2
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

  // Initialize the game
  initializeGame();
});
