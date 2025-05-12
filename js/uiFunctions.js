function initialiseUI() {
  gameCanvas.style.top = "50px";
  holdDiv.style.top = "50px";
  nextDiv.style.top = "50px";
  setCanvasSize(gameCanvas, COLUMNS, ROWS, SCALE);
  setCanvasSize(holdCanvas, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE, SCALE);
  setCanvasSize(nextCanvas, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE, SCALE);
  emptyField(gameContext, COLUMNS, ROWS);
  emptyField(holdContext, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
  emptyField(nextContext, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
  score.innerText = "Score: 0";
  level.innerText = "Level: 1";
  lines.innerText = "Lines: 0";
  titleScreen.style.display = "none";
  pauseScreen.style.display = "none";
  gameOverScreen.style.display = "none";
}

function onWindowResize() {
  gameCanvas.style.left = window.innerWidth / 2 - gameCanvas.width / 2 + "px";
  holdDiv.style.right =
    window.innerWidth / 2 + gameCanvas.width / 2 + 20 + "px";
  nextDiv.style.left = window.innerWidth / 2 + gameCanvas.width / 2 + 20 + "px";
  controlsUI.style.right =
    window.innerWidth / 2 + gameCanvas.width / 2 + 30 + "px";
  controlsUI.style.top =
    parseInt(holdDiv.style.top) + holdDiv.clientHeight + 20 + "px";
  gameInfo.style.left =
    window.innerWidth / 2 + gameCanvas.width / 2 + 20 + "px";
  gameInfo.style.top =
    parseInt(nextDiv.style.top) + nextDiv.clientHeight + 20 + "px";
  titleScreen.style.left =
    window.innerWidth / 2 - titleScreen.offsetWidth / 2 + "px";
  titleScreen.style.top =
    (window.innerHeight * 2) / 5 - titleScreen.offsetHeight / 2 + "px";
  pauseScreen.style.left =
    window.innerWidth / 2 - pauseScreen.offsetWidth / 2 + "px";
  pauseScreen.style.top =
    (window.innerHeight * 2) / 5 - pauseScreen.offsetHeight / 2 + "px";
  gameOverScreen.style.left =
    window.innerWidth / 2 - gameOverScreen.offsetWidth / 2 + "px";
  gameOverScreen.style.top =
    (window.innerHeight * 2) / 5 - gameOverScreen.offsetHeight / 2 + "px";
}

function updateGameInfo() {
  score.innerText = `Score: ${game.score}`;
  level.innerText = `Level: ${game.level}`;
  lines.innerText = `Lines: ${game.linesCleared}`;
}

function hideAllScreens() {
  titleScreen.style.display = "none";
  pauseScreen.style.display = "none";
  gameOverScreen.style.display = "none";
}
function showTitleScreen() {
  hideAllScreens();
  titleScreen.style.display = "block";
}
function showPauseScreen() {
  hideAllScreens();
  pauseScreen.style.display = "block";
}
function showGameOverScreen() {
  hideAllScreens();
  gameOverScreen.style.display = "block";
}
