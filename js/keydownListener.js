document.addEventListener("keydown", function (event) {
  if (gameState === "playing") {
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
      case "c":
        hold();
        break;
    }
  }
});
