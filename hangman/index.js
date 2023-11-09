const wrongGuess = [];
const rightGuess = [];
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
  "passion fruit",
  "peach",
  "pears",
  "pineapple",
  "plum",
  "pomegranate",
  "raspberry",
  "strawberry",
  "tamarind",
  "tangerine",
  "tomato",
  "watermelons",
];

const secretWord = fruits[Math.floor(Math.random() * fruits.length)];

document.addEventListener("keydown", (e) => {
  const keyCode = e.keyCode;
  if (isLetter(keyCode)) {
    const letter = e.key;

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
});

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
    wrongGuessContainer.innerHTML += letter;
  });
};

const showRightGuesses = () => {
  const secretWordContainer = document.querySelector(".secretWord-container");
  secretWordContainer.innerHTML = "";
  secretWord.split("").forEach((letter) => {
    if (rightGuess.includes(letter)) {
      secretWordContainer.innerHTML += letter;
    } else {
      secretWordContainer.innerHTML += "_";
    }
  });
};

const checkGameStatus = () => {
  const bodyParts = document.querySelectorAll(".body");
  const secretWordContainer = document.querySelector(".secretWord-container")
  if(wrongGuess.length === bodyParts.length){
    alert(`You lost, the secret word was ${secretWord}`)
    return;
  }

  if(secretWord === secretWordContainer.innerText) {
    alert(`Yay! You guessed the secret word: ${secretWord}`)
    return;
  }
}

const drawHangman = () => {
  const bodyParts = document.querySelectorAll(".body");
  for (let i = 0; i < wrongGuess.length; i++) {
    bodyParts[i].style.display = "block";
  }
};

const showWarning = () => {
  alert("You've already tried that letter");
};

const isLetter = (keyCode) => {
  return keyCode >= 65 && keyCode <= 90;
};

const restartGame = () => {
  window.location.reload();
}
