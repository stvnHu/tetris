let game = newGame();
let gameState = "playing";

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
  }
  if (gameState === "title") {
    console.log("title");
  } else if (gameState === "playing") {
    drawField();
    updateGameInfo();
  } else if (gameState === "paused") {
    console.log("paused");
  } else if (gameState === "gameOver") {
    console.log("gameover");
  }
  requestAnimationFrame(frameUpdate);
}

frameUpdate();
