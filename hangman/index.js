const wrongGuess = [];
const rightGuess = [];
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const fruits = [
  "acai",
  "apple",
  "apricot",
  "avocado",
  "banana",
  "blueberry",
  "blackberry",
  "cherry",
  "cranberry",
  "currant",
  "date",
  "fig",
  "grape",
  "grapefruit",
  "guava",
  "melon",
  "kiwi",
  "lemon",
  "lime",
  "mango",
  "orange",
  "papaya",
  "peach",
  "pear",
  "pineapple",
  "plum",
  "pomegranate",
  "raspberry",
  "strawberry",
  "tamarind",
  "tangerine",
  "tomato",
  "watermelon",
];

const secretWord = fruits[Math.floor(Math.random() * fruits.length)];

const startGame = (e) => {
  console.log(e.key);

  e.key && e.key.toLowerCase();
  const keyCode = e.keyCode || e.target.innerHTML.charCodeAt(0);

  if (isLetter(keyCode)) {
    const startGameMessage = document.getElementById("game-start");
    startGameMessage.style.display = "none";
    const letter = e.key
      ? e.key.toLowerCase()
      : e.target.innerHTML.toLowerCase();

    if (wrongGuess.includes(letter)) {
      showWarning();
    } else {
      if (secretWord.includes(letter)) {
        rightGuess.push(letter);
      } else {
        wrongGuess.push(letter);
      }
    }
    updateGame();
  }
};

const updateGame = () => {
  showWrongGuesses();
  showRightGuesses();
  drawHangman();
  checkGameStatus();
};

const showWrongGuesses = () => {
  const wrongGuessContainer = document.querySelector(".wrongGuess-container");
  wrongGuessContainer.innerHTML = "";
  wrongGuess.forEach((letter) => {
    wrongGuessContainer.innerHTML += " " + letter;
  });
};

const showRightGuesses = () => {
  const secretWordContainer = document.querySelector(".secretWord-container");
  secretWordContainer.innerHTML = "";
  secretWord.split("").forEach((letter) => {
    if (rightGuess.includes(letter)) {
      secretWordContainer.innerHTML += " " + letter;
    } else {
      secretWordContainer.innerHTML += " _";
    }
  });
};

const checkGameStatus = () => {
  let warning = "";
  const bodyParts = document.querySelectorAll(".body");
  const secretWordContainer = document.querySelector(".secretWord-container");

  if (wrongGuess.length === bodyParts.length) {
    warning = `You lost, the secret word was ${secretWord}`;
  }

  if (/[a-z]/g.test(secretWordContainer.innerText)) {
    if (secretWord === secretWordContainer.innerText.match(/[a-z]/g).join("")) {
      warning = `Yay! You guessed the secret word: ${secretWord}`;
    }
  }

  if (warning) {
    document.querySelector("#warning").innerHTML = warning;
    document.querySelector(".popup-container").style.display = "flex";
  }
};

const drawHangman = () => {
  const bodyParts = document.querySelectorAll(".body");
  for (let i = 0; i < wrongGuess.length; i++) {
    bodyParts[i].style.display = "block";
  }
};

const showWarning = () => {
  const warning = document.querySelector(".warning");
  warning.classList.add("show");
  setTimeout(() => {
    warning.classList.remove("show");
  }, 1500);
};

const isLetter = (keyCode) => {
  return keyCode >= 65 && keyCode <= 90;
};

const restartGame = () => {
  window.location.reload();
};

document.addEventListener("keydown", startGame);

document.getElementById("play-again").addEventListener("click", restartGame);
const letters = document.getElementById("keyboard");
for (let i = 0; i < alphabet.length; i++) {
  letters.innerHTML += ` 
  <p class="letter">${alphabet[i]}</p>
  `;
}

const letter = document.querySelectorAll(".letter");
letter.forEach((letter) => letter.addEventListener("click", startGame));
