gameCanvas.style.top = "50px";
holdDiv.style.top = "50px";
nextDiv.style.top = "50px";
setCanvasSize(gameCanvas, COLUMNS, ROWS, SCALE);
setCanvasSize(holdCanvas, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE, SCALE);
setCanvasSize(nextCanvas, DEFAULT_CANVAS_SIZE, DEFAULT_CANVAS_SIZE, SCALE);
initialiseUI();
window.addEventListener("resize", onWindowResize);
onWindowResize();
