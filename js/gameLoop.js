setCanvasSize(gameCanvas, COLUMNS, ROWS, SCALE);
setCanvasSize(holdCanvas, 5, 3, SCALE);
setCanvasSize(nextCanvas, 5, 3, SCALE);

let game = newGame();
let gameState = "playing";

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

let deltaTimeSum = 0;
let lastTime = 0;

function frameUpdate(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  deltaTimeSum += deltaTime;

  const fallTime = getFallTime();
  if (deltaTimeSum >= fallTime) {
    moveY();
    deltaTimeSum -= fallTime;

    console.log(game);
  }

  if (gameState === "title") {
    emptyField();
  } else if (gameState === "playing") {
    drawField();
  } else if (gameState === "paused") {
    emptyField();
  } else if (gameState === "gameOver") {
    emptyField();
  }

  /*
const p = document.getElementById("p");
  p.innerText = `Level: ${game.level}\nScore: ${game.score}\nLines: ${game.linesCleared}\nPosition: (${game.pos.x},${game.pos.y})`;

*/

  requestAnimationFrame(frameUpdate);
}

frameUpdate();
