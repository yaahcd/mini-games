import Block from "./Block.js";

class Apple {
  constructor() {
    this.position = new Block(10, 10);
  }

  draw(blockSize) {
    this.position.drawCircle("red", blockSize);
  }

  move(widthInBlocks, heightInBlocks) {
    const randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    const randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
  }
}

export default Apple;
