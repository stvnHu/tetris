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
}

function updateGameInfo() {
  score.innerText = `Score: ${game.score}`;
  level.innerText = `Level: ${game.level}`;
  lines.innerText = `Lines: ${game.linesCleared}`;
}

function initialiseUI() {
  emptyField(gameContext, COLUMNS, ROWS);
  emptyField(holdContext, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
  emptyField(nextContext, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE);
  score.innerText = "Score: 0";
  level.innerText = "Level: 1";
  lines.innerText = "Lines: 0";
}
