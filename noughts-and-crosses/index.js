let board;
let userChoice;

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
  let row = 0;
  let column = 0;
  HTML = '<table  cellpadding="10" border="1" class="table-board">';
  for (let i = 0; i < 3; i++) {
    HTML += `<tr class="table-row" >`;

    for (let j = 0; j < 3; j++) {
      if (gameBoard[i][j] == 0) {
        HTML += `<td data-row="${row}"  data-column="${column}" class="table-data">    </td>`;
        column++;
      } else if (gameBoard[i][j] == 1) {
        HTML += "<td> X </td>";
      } else {
        HTML += "<td> O </td>";
      }
    }
    row++;
    HTML += "</tr>";
  }
  HTML += "</table><br />";
  board.innerHTML = HTML;
};

const setUserPreference = (e) => {
  userChoice = e.target.innerText;
};

const makeMove = (e) => {
  e.target.innerHTML = "test";
  console.log(e.target.dataset);
};

const tableData = document.querySelectorAll(".table-data");
for (let i = 0; i < tableData.length; i++) {
  tableData[i].addEventListener("click", makeMove);
  console.log(tableData[i].dataset);
}

const userPreference = document.querySelectorAll("#option");
for (let i = 0; i < userPreference.length; i++) {
  userPreference[i].addEventListener("click", setUserPreference);
}
