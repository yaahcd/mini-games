import { context, circle } from "./app.js";

class Block {
  constructor(col, row) {
    (this.col = col), (this.row = row);
  }

  drawSquare(color, blockSize) {
    const x = this.col * blockSize;
    const y = this.row * blockSize;
    context.fillStyle = color;
    context.fillRect(x, y, blockSize, blockSize);
  }

  drawCircle(color, blockSize) {
    const centerX = this.col * blockSize + blockSize / 2;
    const centerY = this.row * blockSize + blockSize / 2;
    context.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
  }

  checkPosition(otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  }
}

export default Block;
