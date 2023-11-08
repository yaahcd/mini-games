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
    ctx.font = "20px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Score: " + score, blockSize, blockSize);
   };