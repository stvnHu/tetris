const controlsUI = document.getElementById("controls");

const gameCanvas = document.getElementById("tetris");
const gameContext = gameCanvas.getContext("2d");

const holdDiv = document.getElementById("hold-div");
const holdCanvas = document.getElementById("hold");
const holdContext = holdCanvas.getContext("2d");

const nextDiv = document.getElementById("next-div");
const nextCanvas = document.getElementById("next");
const nextContext = nextCanvas.getContext("2d");

const FULL_ROWS = 40;
const ROWS = 20;
const COLUMNS = 10;
const SCALE = 40;

const BUFFER_OFFSET = FULL_ROWS - ROWS;

const baseFallTime = 1000;
const fallTimeScale = 0.8;

const pieceData = {
  I: {
    startingPos: { x: 3, y: BUFFER_OFFSET - 2 },
    pieceWidth: 6,
    pieceHeight: 3,
    pieceHeightOffset: 0,
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
    startingPos: { x: 3, y: BUFFER_OFFSET - 2 },
    pieceWidth: 5,
    pieceHeight: 4,
    pieceHeightOffset: 1,

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
    startingPos: { x: 3, y: BUFFER_OFFSET - 2 },
    pieceWidth: 5,
    pieceHeight: 4,
    pieceHeightOffset: 1,
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
    startingPos: { x: 4, y: BUFFER_OFFSET - 2 },
    pieceWidth: 4,
    pieceHeight: 4,
    pieceHeightOffset: 1,
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
    startingPos: { x: 3, y: BUFFER_OFFSET - 2 },
    pieceWidth: 5,
    pieceHeight: 4,
    pieceHeightOffset: 1,
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
    startingPos: { x: 3, y: BUFFER_OFFSET - 2 },
    pieceWidth: 5,
    pieceHeight: 4,
    pieceHeightOffset: 1,
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
    startingPos: { x: 3, y: BUFFER_OFFSET - 2 },
    pieceWidth: 5,
    pieceHeight: 4,
    pieceHeightOffset: 1,
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
