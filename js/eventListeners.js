window.addEventListener("resize", onWindowResize);

document.addEventListener("keydown", (event) => {
  if (game.state !== "playing") return;
  switch (event.key.toLowerCase()) {
    case "escape":
      game.state = "paused";
      break;
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
    case "c":
      hold();
      break;
  }
});

playButton.addEventListener("click", () => {
  game.state = "playing";
});
resumeButton.addEventListener("click", () => {
  game.state = "playing";
});
quitButton.addEventListener("click", () => {
  game = newGame();
});
playAgainButton.addEventListener("click", () => {
  game = newGame();
});
