let game = newGame();

let deltaTimeSum = 0;
let lastTime = 0;

function frameUpdate(time = 0) {
  const deltaTime = time - lastTime;
  lastTime = time;
  if (game.state === "title") {
    showTitleScreen();
    onWindowResize();
  } else if (game.state === "playing") {
    hideAllScreens();
    deltaTimeSum += deltaTime;
    if (deltaTimeSum >= getFallTime()) {
      moveY();
      deltaTimeSum -= getFallTime();
    }
    drawField();
  } else if (game.state === "paused") {
    showPauseScreen();
    onWindowResize();
  } else if (game.state === "gameOver") {
    showGameOverScreen();
    onWindowResize();
  }
  requestAnimationFrame(frameUpdate);
}

frameUpdate();
