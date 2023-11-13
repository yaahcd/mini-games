import Snake from "./Snake.js";
import Apple from "./Apple.js";

const canvas = document.getElementById("canvas");
export const context = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const blockSize = 10;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;
let intervalId;

const drawBorder = () => {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, blockSize);
  context.fillRect(0, height - blockSize, width, blockSize);
  context.fillRect(0, 0, blockSize, height);
  context.fillRect(width - blockSize, 0, blockSize, height);
};

const drawScore = (score) => {
  context.font = "20px Courier";
  context.fillStyle = "white";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText("Score: " + score, blockSize, blockSize);
};

export const gameOver = () => {
  clearInterval(intervalId);
  context.font = "60px Courier";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Game Over", width / 2, height / 2);
};

export const circle = function (x, y, radius, fillCircle) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    context.fill();
  } else {
    context.stroke();
  }
};

const snake = new Snake();
const apple = new Apple();

const startGame = () => {
   intervalId = setInterval(function () {
    context.clearRect(0, 0, width, height);
    drawScore(snake.score);
    snake.move(widthInBlocks, heightInBlocks, apple);
    snake.draw(blockSize);
    apple.draw(blockSize);
    drawBorder();
  }, 100);
  
  const directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down",
  };
  
  $("body").keydown((event) => {
    let newDirection = directions[event.keyCode];
    if (newDirection !== undefined) {
      snake.setDirection(newDirection);
    }
  });
}

$("#start-game").click((event) => {
  startGame();
})