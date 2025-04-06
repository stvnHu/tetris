const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
const ROWS = 20;
const COLUMNS = 10;
const SCALE = 40;
canvas.width = COLUMNS * SCALE;
canvas.height = ROWS * SCALE;
context.scale(SCALE, SCALE);

const startingPos = { x: 3, y: 0 };
const pieces = [
  [[1, 1, 1, 1]],
  [
    [2, 2],
    [2, 2],
  ],
  [
    [3, 3, 3],
    [0, 3, 0],
  ],
  [
    [4, 4, 4],
    [0, 0, 4],
  ],
  [
    [5, 5, 5],
    [5, 0, 0],
  ],
  [
    [0, 6, 6],
    [6, 6, 0],
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
  ],
];
const colours = [
  "black",
  "cyan",
  "yellow",
  "purple",
  "blue",
  "orange",
  "green",
  "red",
];

let player = {
  score: 0,
  level: 1,
  linesCleared: 0,
  piece: randomPiece(),
  pos: { ...startingPos },
};
let field = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") moveX(1);
  if (event.key === "ArrowLeft") moveX(-1);
  if (event.key === "ArrowUp") rotateClockwise();
});
function moveX(direction) {
  player.pos.x += direction;
  if (collide()) player.pos.x -= direction;
}
function moveY() {
  player.pos.y++;
  if (collide()) {
    player.pos.y--;
    placePiece();
    newPiece();
    clearLine();
  }
}
function rotateClockwise() {
  player.piece = player.piece[0].map((_, i) =>
    player.piece.map((row) => row[i]).reverse()
  );
}

function drawField() {
  context.fillStyle = colours[0];
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawPieces(field, { x: 0, y: 0 });
  drawPieces(player.piece, player.pos);
}
function drawPieces(pieces, offset) {
  pieces.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = colours[value];
        context.fillRect(offset.x + x, offset.y + y, 1, 1);
      }
    });
  });
}

function randomPiece() {
  return pieces[Math.floor(Math.random() * pieces.length)];
}
function collide() {
  return player.piece.some((row, y) =>
    row.some(
      (value, x) => value && field[player.pos.y + y]?.[player.pos.x + x] !== 0
    )
  );
}
function placePiece() {
  player.piece.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) field[player.pos.y + y][player.pos.x + x] = value;
    });
  });
}
function clearLine() {
  let clearedLines = [];
  for (let row = field.length - 1; row > 0; row--) {
    if (field[row].every((value) => value !== 0)) {
      clearedLines.push(row);
    }
  }
  console.log(clearedLines);
}
function newPiece() {
  player.pos = { ...startingPos };
  player.piece = randomPiece();
}

function increaseScore() {
  console.log("increase score");
}
function increaseLevel() {
  console.log("increase level");
}

let dTSum = 0;
let lastTime = 0;

function frameUpdate(time = 0) {
  let deltaTime = time - lastTime;
  lastTime = time;
  dTSum += deltaTime;

  if (dTSum > 200) {
    moveY();
    dTSum = 0;
  }

  const p = document.getElementById("p");
  p.innerText = `Level: ${player.level}\nScore: ${player.score}\nPosition: (${player.pos.x},${player.pos.y})`;

  drawField();
  requestAnimationFrame(frameUpdate);
}

frameUpdate();
