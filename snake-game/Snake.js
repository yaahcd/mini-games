import Block from "./Block.js";
import { gameOver } from "./app.js";

class Snake {
  constructor() {
    this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)];
    this.direction = "right";
    this.nextDirection = "right";
    this.score = 0
  }

  draw(blockSize) {
    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].drawSquare("#0ff", blockSize);
    }
  }

  move(widthInBlocks, heightInBlocks, apple) {
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

    if (this.checkCollision(newHead, widthInBlocks, heightInBlocks)) {
      gameOver();
      return;
    }

    this.segments.unshift(newHead);

    if (newHead.checkPosition(apple.position)) {
      this.score++;
      apple.move(widthInBlocks, heightInBlocks);
    } else {
      this.segments.pop();
    }
  }

  checkCollision(head, widthInBlocks, heightInBlocks) {
    const leftCollision = head.col === 0;
    const topCollision = head.row === 0;
    const rightCollision = head.col === widthInBlocks - 1;
    const bottomCollision = head.row === heightInBlocks - 1;
    const wallCollision =
      leftCollision || topCollision || rightCollision || bottomCollision;
    let selfCollision = false;

    for (let i = 0; i < this.segments.length; i++) {
      if (head.checkPosition(this.segments[i])) {
        selfCollision = true;
      }
    }
    return wallCollision || selfCollision;
  }

  setDirection(newDirection) {
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
  }
}

export default Snake;
