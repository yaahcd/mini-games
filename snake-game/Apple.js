import Block from "./Block.js";

class Apple {
  constructor() {
    this.position = new Block(10, 10);
  }

  draw(blockSize) {
    this.position.drawCircle("red", blockSize);
  }

  move(widthInBlocks, heightInBlocks, takenBlocks) {
    const randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
    const randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
    this.position = new Block(randomCol, randomRow);

    for (let i = 0; i < takenBlocks.length; i++) {
      if (this.position.checkPosition(takenBlocks[i])) {
        this.move(widthInBlocks, heightInBlocks, takenBlocks);
        return;
      }
    }
  }
}

export default Apple;
