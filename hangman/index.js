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
  "watermelon",
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
  let warning = ""
  const bodyParts = document.querySelectorAll(".body");
  const secretWordContainer = document.querySelector(".secretWord-container")
  if(wrongGuess.length === bodyParts.length){
    warning = `You lost, the secret word was ${secretWord}`
   
  }

  if(secretWord === secretWordContainer.innerText) {
    warning = `Yay! You guessed the secret word: ${secretWord}`
  }

  if(warning){
    document.querySelector("#warning").innerHTML = warning;
    document.querySelector(".popup-container").style.display = "flex";
  }
}

const drawHangman = () => {
  const bodyParts = document.querySelectorAll(".body");
  for (let i = 0; i < wrongGuess.length; i++) {
    bodyParts[i].style.display = "block";
  }
};

const showWarning = () => {
  const aviso = document.querySelector(".warning");
  aviso.classList.add("show");
  setTimeout(() => {
    aviso.classList.remove("show");
  }, 1500);
};

const isLetter = (keyCode) => {
  return keyCode >= 65 && keyCode <= 90;
};

const restartGame = () => {
  window.location.reload();
}

document.getElementById("play-again").addEventListener("click", restartGame)