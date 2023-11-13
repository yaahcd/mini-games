let userChoice;
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
  } else {
    alert("tie");
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
  for (let index of possibleWins[gameWon.index]) {
    gameWon.player === "human" ? alert("you won!") : alert("you lost!");
    break;
  }

  for (let i = 0; i < tableData.length; i++) {
    tableData[i].removeEventListener("click", makeMove);
  }
};

const computerMove = () => {
  const move = document.getElementById(
    gameBoard.find((element) => typeof element != "string")
  );
  const computerChoice = userChoice === "x" ? o : "x";
  move.innerHTML = computerChoice;
  gameBoard[gameBoard.find((element) => typeof element != "string")] =
    "computer";
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

const tableData = document.querySelectorAll(".table-data");
for (let i = 0; i < tableData.length; i++) {
  tableData[i].addEventListener("click", makeMove);
}

const userPreference = document.querySelectorAll("#option");
for (let i = 0; i < userPreference.length; i++) {
  userPreference[i].addEventListener("click", setUserPreference);
}

startGame();
