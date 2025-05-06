const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

const FULL_ROWS = 40;
const ROWS = 20;
const COLUMNS = 10;
const SCALE = 40;

const BUFFER_OFFSET = FULL_ROWS - ROWS;
canvas.width = COLUMNS * SCALE;
canvas.height = ROWS * SCALE;
context.scale(SCALE, SCALE);

const pieceData = {
  I: {
    startingPos: { x: 3, y: 20 },
    0: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    1: [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
    ],
    2: [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
    ],
    3: [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ],
  },
  J: {
    startingPos: { x: 3, y: 20 },
    0: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    1: [
      [0, 2, 2],
      [0, 2, 0],
      [0, 2, 0],
    ],
    2: [
      [0, 0, 0],
      [2, 2, 2],
      [0, 0, 2],
    ],
    3: [
      [0, 2, 0],
      [0, 2, 0],
      [2, 2, 0],
    ],
  },
  L: {
    startingPos: { x: 3, y: 20 },
    0: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    1: [
      [0, 3, 0],
      [0, 3, 0],
      [0, 3, 3],
    ],
    2: [
      [0, 0, 0],
      [3, 3, 3],
      [3, 0, 0],
    ],
    3: [
      [3, 3, 0],
      [0, 3, 0],
      [0, 3, 0],
    ],
  },
  O: {
    startingPos: { x: 3, y: 20 },
    0: [
      [4, 4],
      [4, 4],
    ],
    1: [
      [4, 4],
      [4, 4],
    ],
    2: [
      [4, 4],
      [4, 4],
    ],
    3: [
      [4, 4],
      [4, 4],
    ],
  },
  S: {
    startingPos: { x: 3, y: 20 },
    0: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    1: [
      [0, 5, 0],
      [0, 5, 5],
      [0, 0, 5],
    ],
    2: [
      [0, 0, 0],
      [0, 5, 5],
      [5, 5, 0],
    ],
    3: [
      [5, 0, 0],
      [5, 5, 0],
      [0, 5, 0],
    ],
  },
  Z: {
    startingPos: { x: 3, y: 20 },
    0: [
      [6, 6, 0],
      [0, 6, 6],
      [0, 0, 0],
    ],
    1: [
      [0, 0, 6],
      [0, 6, 6],
      [0, 6, 0],
    ],
    2: [
      [0, 0, 0],
      [6, 6, 0],
      [0, 6, 6],
    ],
    3: [
      [0, 6, 0],
      [6, 6, 0],
      [6, 0, 0],
    ],
  },
  T: {
    startingPos: { x: 3, y: 20 },
    0: [
      [0, 7, 0],
      [7, 7, 7],
      [0, 0, 0],
    ],
    1: [
      [0, 7, 0],
      [0, 7, 7],
      [0, 7, 0],
    ],
    2: [
      [0, 0, 0],
      [7, 7, 7],
      [0, 7, 0],
    ],
    3: [
      [0, 7, 0],
      [7, 7, 0],
      [0, 7, 0],
    ],
  },
};
const colours = [
  "black",
  "cyan",
  "blue",
  "orange",
  "yellow",
  "green",
  "red",
  "magenta",
];

function newGame() {
  return {
    score: 0,
    level: 1,
    linesCleared: 0,
    ...randomPiece(),
    field: Array.from({ length: FULL_ROWS }, () => Array(COLUMNS).fill(0)),
  };
}
function randomPiece() {
  const pieceKeys = Object.keys(pieceData);
  const randomPieceKey =
    pieceKeys[Math.floor(Math.random() * pieceKeys.length)];
  return {
    pieceKey: randomPieceKey,
    piece: pieceData[randomPieceKey][0],
    pos: { ...pieceData[randomPieceKey].startingPos },
    rotation: 0,
  };
}
function newPiece() {
  Object.assign(game, randomPiece());
}

function drawField() {
  emptyField();
  drawPieces(game.field.slice(BUFFER_OFFSET), { x: 0, y: 0 });
  drawPieces(game.piece, { ...game.pos, y: game.pos.y - BUFFER_OFFSET });
}
function emptyField() {
  context.fillStyle = colours[0];
  context.fillRect(0, 0, COLUMNS, ROWS);
}
function drawPieces(pieces, pos) {
  pieces.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = colours[value];
        context.fillRect(pos.x + x, pos.y + y, 1, 1);
      }
    });
  });
}

document.addEventListener("keydown", function (event) {
  switch (event.key.toLowerCase()) {
    case "arrowright":
      moveX(1);
      break;
    case "arrowleft":
      moveX(-1);
      break;
    case "arrowdown":
      moveY();
      break;
    case "x":
      rotate(1);
      break;
    case "z":
      rotate(-1);
      break;
  }
});
function moveX(dir) {
  game.pos.x += dir;
  if (collide()) game.pos.x -= dir;
}
function moveY() {
  game.pos.y++;
  if (collide()) {
    game.pos.y--;
    placePiece();
    clearLine();
    newPiece();
  }
}
function rotate(dir) {
  game.rotation = (game.rotation + dir + 4) % 4;
  game.piece = pieceData[game.pieceKey][game.rotation];
  if (collide()) {
    game.rotation = (game.rotation - dir + 4) % 4;
    game.piece = pieceData[game.pieceKey][game.rotation];
  }
}
function collide() {
  return game.piece.some((row, y) =>
    row.some(
      (value, x) => value && game.field[game.pos.y + y]?.[game.pos.x + x] !== 0
    )
  );
}
function placePiece() {
  game.piece.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) game.field[game.pos.y + y][game.pos.x + x] = value;
    });
  });
}
function clearLine() {
  let linesClearedCount = 0;
  for (let row = game.field.length - 1; row > 0; row--) {
    if (game.field[row].every((value) => value !== 0)) {
      game.field.splice(row, 1);
      game.field.unshift(Array(COLUMNS).fill(0));
      linesClearedCount += 1;
      row++;
    }
  }
  increaseScore(linesClearedCount);
  game.linesCleared += linesClearedCount;
  increaseLevel();
}

function increaseScore(lineClearedCount) {
  switch (lineClearedCount) {
    case 0:
      break;
    case 1:
      game.score += game.level * 100;
      break;
    case 2:
      game.score += game.level * 300;
      break;
    case 3:
      game.score += game.level * 500;
      break;
    case 4:
      game.score += game.level * 800;
      break;
  }
}
function increaseLevel() {
  game.level = Math.floor(game.linesCleared / 10) + 1;
}

let game = newGame();

let dTSum = 0;
let lastTime = 0;

function frameUpdate(time = 0) {
  let deltaTime = time - lastTime;
  lastTime = time;
  dTSum += deltaTime;

  if (dTSum > 250) {
    moveY();
    dTSum = 0;
  }

  const p = document.getElementById("p");
  p.innerText = `Level: ${game.level}\nScore: ${game.score}\nLines: ${game.linesCleared}\nPosition: (${game.pos.x},${game.pos.y})`;

  drawField();
  requestAnimationFrame(frameUpdate);
}

frameUpdate();
