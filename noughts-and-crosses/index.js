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
  e.target.innerHTML = "test";
};

const tableData = document.querySelectorAll(".table-data");
for (let i = 0; i < tableData.length; i++) {
  tableData[i].addEventListener("click", makeMove);
}

const userPreference = document.querySelectorAll("#option");
for (let i = 0; i < userPreference.length; i++) {
  userPreference[i].addEventListener("click", setUserPreference);
}

startGame()