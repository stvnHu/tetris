function onWindowResize() {
  gameCanvas.style.left = window.innerWidth / 2 - gameCanvas.width / 2 + "px";

  holdDiv.style.right =
    window.innerWidth / 2 + gameCanvas.width / 2 + 20 + "px";

  nextDiv.style.left = window.innerWidth / 2 + gameCanvas.width / 2 + 20 + "px";

  controlsUI.style.right =
    window.innerWidth / 2 + gameCanvas.width / 2 + 20 + "px";
  controlsUI.style.top =
    parseInt(holdDiv.style.top) + holdDiv.clientHeight + 20 + "px";
}
