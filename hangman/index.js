


words[Math.floor(Math.random() * words.length)];

const answerArr = [];

for (let i = 0; i < word.length; i++) [(answerArr[i] = "_")];

let remainingLetters = word.length;

while (remainingLetters > 0) {
  alert(answerArr.join(" "));
  let guess = prompt("Guess a letter, or click Cancel to stop playing.");
  if (guess === null) {
    break;
  } else if (guess.length !== 1) {
    alert("Please enter a single letter.");
  } else {
    for(let i = 0; i < word.length; i++){
        if(word[i] === guess){
            answerArr[i] = guess
            remainingLetters--
        }
    }
  }
}

alert(answerArr.join(" "));
alert("Good job! The answer was " + word);
