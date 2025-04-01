const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");
const ROWS = 20;
const COLUMNS = 10;
const SCALE = 40;
canvas.width = COLUMNS * SCALE;
canvas.height = ROWS * SCALE;
context.scale(SCALE, SCALE);
