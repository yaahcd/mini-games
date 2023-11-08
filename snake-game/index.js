const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const width = canvas.width;
const height = canvas.height;

const blockSize = 10;
const widthInBlocks = width / blockSize;
const heightInBlocks = height / blockSize;

let score = 0;

const drawBorder = () => {
  context.fillStyle = "Gray";
  context.fillRect(0, 0, width, blockSize);
  context.fillRect(0, height - blockSize, width, blockSize);
  context.fillRect(0, 0, blockSize, height);
  context.fillRect(width - blockSize, 0, blockSize, height);
};

const drawScore = () => {
  context.font = "20px Courier";
  context.fillStyle = "Black";
  context.textAlign = "left";
  context.textBaseline = "top";
  context.fillText("Score: " + score, blockSize, blockSize);
};

const gameOver = () => {
  clearInterval(intervalId);
  context.font = "60px Courier";
  context.fillStyle = "Black";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Game Over", width / 2, height / 2);
};

const Block = function (col, row) {
  this.col = col;
  this.row = row;
};

Block.prototype.drawSquare = function (color) {
  const x = this.col * blockSize;
  const y = this.row * blockSize;
  context.fillStyle = color;
  context.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function (color) {
  const centerX = this.col * blockSize + blockSize / 2;
  const centerY = this.row * blockSize + blockSize / 2;
  context.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
};

Block.prototype.checkPosition = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};

