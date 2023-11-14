let userChoice;
let gameBoard;
const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [8, 4, 0],
  [6, 4, 2],
];

const startGame = () => {
  gameBoard = Array.from(Array(tableData.length).keys());
};

const setUserPreference = (e) => {
  userChoice = e.target.innerText;

  const buttons = document.querySelectorAll("#option")
  buttons.forEach((button) => {
  button.disabled = true
  button.style.opacity = "0.5"
}
  )
};

const makeMove = (e) => {
  if (!userChoice) {
    alert("Please choose one option to start the game");
    return;
  }

  if (typeof gameBoard[e.target.id] === "number") {
    e.target.innerHTML = userChoice;
    gameBoard[e.target.id] = "human";

    const checkGame = checkWinner(gameBoard, "human");

    if (checkGame) {
      gameOver(checkGame);
    }
  }

  if (!checkTie()) {
    computerMove(e);
    const checkGame = checkWinner(gameBoard, "computer");
    if (checkGame) {
      gameOver(checkGame);
    }
  } else {
    document.querySelector("#message").innerHTML = "Tie! 👔";
    document.querySelector(".popup-container").style.display = "flex";
  }
};

const checkWinner = (gameBoard, player) => {
  let plays = gameBoard.reduce((acc, curr, index) => {
    return curr === player ? acc.concat(index) : acc;
  }, []);
  let gameWon = false;
  for (let [index, win] of possibleWins.entries()) {
    if (win.every((element) => plays.indexOf(element) > -1)) {
      gameWon = { index: index, player: player };
      break;
    }
  }
  return gameWon;
};

const gameOver = (gameWon) => {
  let message = ""
  for (let index of possibleWins[gameWon.index]) {
    gameWon.player === "human" ? message = "You won! 🎉" : message = "You lose! 😕"
  }
  
  for (let i = 0; i < tableData.length; i++) {
    tableData[i].removeEventListener("click", makeMove);
  }

  if (message) {
    document.querySelector("#message").innerHTML = message;
    document.querySelector(".popup-container").style.display = "flex";
  }
 
};

const computerMove = () => {
  const move = document.getElementById(minmax(gameBoard, "computer").index);

  const computerChoice = userChoice === "X" ? "O" : "X";
  move.innerHTML = computerChoice;
  gameBoard[minmax(gameBoard, "computer").index] = "computer";
  return;
};

const checkTie = () => {
  const emptySquares = gameBoard.filter(
    (element) => typeof element === "number"
  );

  if (emptySquares.length === 0) {
    for (let i = 0; i < tableData.length; i++) {
      tableData[i].removeEventListener("click", makeMove);
    }
    return true;
  }
  return false;
};

const minmax = (newBoard, player) => {
//source: https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
//https://www.youtube.com/watch?v=SLgZhpDsrfc

  //gets available spots on the board
  const emptySquares = newBoard.filter(
    (element) => typeof element === "number"
  );

  //checks for terminal states
  if (checkWinner(newBoard, "human")) {
    return { score: -10 };
  } else if (checkWinner(newBoard, "computer")) {
    return { score: 10 };
  } else if (emptySquares.length === 0) {
    return { score: 0 };
  }

  //get scores for each available spot
  let moves = [];
  for (let i = 0; i < emptySquares.length; i++) {
    let move = {};
    move.index = newBoard[emptySquares[i]];
    newBoard[emptySquares[i]] = player;

    //collect the score resulted from calling minimax on the opponent of the current player
    if (player === "computer") {
      let result = minmax(newBoard, "human");
      move.score = result.score;
    } else {
      let result = minmax(newBoard, "computer");
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[emptySquares[i]] = move.index;

    //push move obj to array
    moves.push(move);
  }

  //starts to check for the best move in the moves array
  let bestMove;
  //chooses the first move with the hightest score on computer's turn 
  if (player === "computer") {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
     //chooses the first move with the hightest score on humans's turn
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  //returns chosen move
  return moves[bestMove];
};

const restartGame = () => {
  window.location.reload();
};

document.getElementById("play-again").addEventListener("click", restartGame);


const tableData = document.querySelectorAll(".table-data");
for (let i = 0; i < tableData.length; i++) {
  tableData[i].addEventListener("click", makeMove);
}

const userPreference = document.querySelectorAll("#option");
for (let i = 0; i < userPreference.length; i++) {
  userPreference[i].addEventListener("click", setUserPreference);
}

startGame();
