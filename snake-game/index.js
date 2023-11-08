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

const Snake = function () {
  this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];

  this.direction = "right";
  this.nextDirection = "right";
};

Snake.prototype.draw = () => {
  for (let i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare("Blue");
  }
};

Snake.prototype.move = () => {
  const head = this.segments[0];
  let newHead;
  this.direction = this.nextDirection;

  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  }

  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }

  this.segments.unshift(newHead);

  if (newHead.equal(apple.position)) {
    score++;
    apple.move();
  } else {
    this.segments.pop();
  }
};

Snake.prototype.checkCollision = function (head) {
  const leftCollision = head.col === 0;
  const topCollision = head.row === 0;
  const rightCollision = head.col === widthInBlocks - 1;
  const bottomCollision = head.row === heightInBlocks - 1;
  const wallCollision =
    leftCollision || topCollision || rightCollision || bottomCollision;
  const selfCollision = false;

  for (let i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }
  return wallCollision || selfCollision;
};

const directions = {
  37: "left",
  38: "up",
  39: "right",
  40: "down",
};

$("body").keydown(function (event) {
  var newDirection = directions[event.keyCode];
  if (newDirection !== undefined) {
    Snake.setDirection(newDirection);
  }
});

Snake.prototype.setDirection = (newDirection) => {
  if (this.direction === "up" && newDirection === "down") {
    return;
  } else if (this.direction === "right" && newDirection === "left") {
    return;
  } else if (this.direction === "down" && newDirection === "up") {
    return;
  } else if (this.direction === "left" && newDirection === "right") {
    return;
  }
  this.nextDirection = newDirection;
};


