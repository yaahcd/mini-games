let board;

const startGame = () => {
  gameBoard = new Array(3);
  board = document.getElementById("board");
  console.log(board);

  for (let i = 0; i < 3; i++) {
    gameBoard[i] = new Array(3);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      gameBoard[i][j] = 0;
    }
  }
  drawBoard();
};

const drawBoard = () => {
  HTML = '<table  cellpadding="10" border="1" class="table-board">';
  for (let i = 0; i < 3; i++) {
    HTML += '<tr class="table-row">';
    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] == 0) {
        HTML += "<td>    </td>";
      } else if (gameBoard[i][j] == 1) {
        HTML += "<td> X </td>";
      } else {
        HTML += "<td> O </td>";
      }
    }
    HTML += "</tr>";
  }
  HTML += "</table><br />";
  board.innerHTML = HTML;
};

startGame()

const tableData = document.querySelectorAll(".table-row")
console.log(tableData);
console.log(gameBoard);