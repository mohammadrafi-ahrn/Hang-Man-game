const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again")



let currentWord, correctLetter, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    //Reseting all game variables and ui elements
    correctLetter = [];
    wrongGuessCount = 0;
    hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    gameModal.classList.remove("show"); 
}

const getrandomWord = () =>{
    //Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
   
    resetGame();
    document.querySelector(".hint-text b").innerText = hint;
}

const gameOver = (isVictory) => {
    // After 600 ms of game complete .. Showing modal with relevant details
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The corrected word was:`;
        gameModal.querySelector("img").src = `${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}


const initGame = (button, clickedLetter) => {
    // checking if clickedLetter is exist on the currentword
     if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
     }
     else {
        // If clicked letter does not exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `hangman-${wrongGuessCount}.svg`;
     }
     button.disabled = true; 
     guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

     // Calling gameOver function if any of these condition meets
     if(wrongGuessCount === maxGuesses) return gameOver(false);
     if(correctLetter.length === currentWord.length) return gameOver(true);
     
}


// creating keyboard button and event listener
for(let i =97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getrandomWord();

playAgainBtn.addEventListener("click", getrandomWord)