function newGame() {
  return {
    score: 0,
    level: 1,
    linesCleared: 0,
    ...getPiece(),
    hold: randomPieceKey(),
    next: randomPieceKey(),
    field: Array.from({ length: FULL_ROWS }, () => Array(COLUMNS).fill(0)),
  };
}
function randomPieceKey() {
  const pieceKeys = Object.keys(pieceData);
  return pieceKeys[Math.floor(Math.random() * pieceKeys.length)];
}
function getPiece(pieceKey) {
  if (!pieceKey) {
    pieceKey = randomPieceKey();
  }
  return {
    pieceKey: pieceKey,
    piece: pieceData[pieceKey][0],
    pos: { ...pieceData[pieceKey].startingPos },
    rotation: 0,
  };
}
function newPiece() {
  Object.assign(game, getPiece(game.next));
  game.next = randomPieceKey();
}

function setCanvasSize(canvas, width, height, scale) {
  canvas.width = width * scale;
  canvas.height = height * scale;
  const context = canvas.getContext("2d");
  context.scale(scale, scale);
}
function drawField() {
  emptyField(gameContext, COLUMNS, ROWS);
  drawPieces(game.field.slice(BUFFER_OFFSET), { x: 0, y: 0 }, gameContext);
  drawPieces(
    game.piece,
    { ...game.pos, y: game.pos.y - BUFFER_OFFSET },
    gameContext
  );

  setCanvasSize(
    holdCanvas,
    pieceData[game.hold].pieceWidth,
    pieceData[game.hold].pieceHeight,
    SCALE
  );
  emptyField(
    holdContext,
    pieceData[game.hold].pieceWidth,
    pieceData[game.hold].pieceHeight
  );
  drawPieces(
    pieceData[game.hold][0],
    { x: 1, y: pieceData[game.hold].pieceHeightOffset },
    holdContext
  );

  setCanvasSize(
    nextCanvas,
    pieceData[game.next].pieceWidth,
    pieceData[game.next].pieceHeight,
    SCALE
  );
  emptyField(
    nextContext,
    pieceData[game.next].pieceWidth,
    pieceData[game.next].pieceHeight
  );
  drawPieces(
    pieceData[game.next][0],
    { x: 1, y: pieceData[game.next].pieceHeightOffset },
    nextContext
  );
}
function emptyField(context, columns, rows) {
  context.fillStyle = colours[0];
  context.fillRect(0, 0, columns, rows);
}
function drawPieces(pieces, pos, context) {
  pieces.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = colours[value];
        context.fillRect(pos.x + x, pos.y + y, 1, 1);
      }
    });
  });
}

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
    } else if (game.field[row].every((value) => value === 0)) {
      break;
    }
  }
  if (linesClearedCount !== 0) {
    increaseScore(linesClearedCount);
    game.linesCleared += linesClearedCount;
    increaseLevel();
  }
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

function getFallTime() {
  return baseFallTime * Math.pow(fallTimeScale, game.level - 1);
}
