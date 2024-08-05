let grid;
let tileSize;

const colors = {
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#dce4e4",
  256: "#e2b1c3",
  512: "#f5d03e",
  1024: "#4f4f4f",
  2048: "#3c3c3c",
};

function setup() {
  createCanvas(400, 400);
  tileSize = width / 4;
  grid = Array(4)
    .fill()
    .map(() => Array(4).fill(0));
  noLoop();
  spawnTile();
  spawnTile();
}

function draw() {
  background("#bbada0");
  drawGrid();
}

function drawGrid() {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const value = grid[y][x];
      fill(value in colors ? colors[value] : "#cdc1b4");
      stroke(255);
      rect(x * tileSize, y * tileSize, tileSize, tileSize);
      if (value !== 0) {
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(32);
        text(value, x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
      }
    }
  }
}

function spawnTile() {
  const emptyCells = [];
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      if (grid[y][x] === 0) {
        emptyCells.push({ x, y });
      }
    }
  }
  if (emptyCells.length > 0) {
    const { x, y } = random(emptyCells);
    grid[y][x] = random(1) > 0.9 ? 4 : 2;
    drawGrid();
  }
}

function keyPressed() {
  let moved = false;
  if (keyCode === LEFT_ARROW) {
    moved = moveLeft();
  } else if (keyCode === RIGHT_ARROW) {
    moved = moveRight();
  } else if (keyCode === UP_ARROW) {
    moved = moveUp();
  } else if (keyCode === DOWN_ARROW) {
    moved = moveDown();
  }

  if (moved) {
    spawnTile();
    drawGrid();
    if (checkWin()) {
      noLoop();
      alert("You win!");
    }
  }
}

function moveLeft() {
  let moved = false;
  for (let y = 0; y < 4; y++) {
    let row = grid[y].filter((val) => val);
    let newRow = [];
    for (let i = 0; i < row.length; i++) {
      if (row[i] === row[i + 1]) {
        newRow.push(row[i] * 2);
        i++;
        moved = true;
      } else {
        newRow.push(row[i]);
      }
    }
    newRow = [...newRow, ...Array(4 - newRow.length).fill(0)];
    if (!grid[y].every((val, idx) => val === newRow[idx])) {
      moved = true;
    }
    grid[y] = newRow;
  }
  return moved;
}

function moveRight() {
  reverseGrid();
  const moved = moveLeft();
  reverseGrid();
  return moved;
}

function moveUp() {
  rotateGrid();
  const moved = moveLeft();
  rotateGrid();
  rotateGrid();
  rotateGrid();
  return moved;
}

function moveDown() {
  rotateGrid();
  rotateGrid();
  rotateGrid();
  const moved = moveLeft();
  rotateGrid();
  return moved;
}

function rotateGrid() {
  grid = grid[0].map((_, colIdx) => grid.map((row) => row[colIdx])).reverse();
}

function reverseGrid() {
  grid = grid.map((row) => row.reverse());
}

function checkWin() {
  return grid.flat().includes(2048);
}
