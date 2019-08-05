// Variables
const onScreenKeyboard = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
let missed = 0;

// Hides overlay screen when reset button is clicked
document.querySelector(".btn__reset").addEventListener("click", event => {
    const button = event.target;
    button.parentElement.style.display = "none";
    startGame();
});

// Phrases
const phrases = [
    "Money Does Not Grow On Trees",
    "Dropping Like Flies",
    "Right Off the Bat",
    "Back To the Drawing Board",
    "Par For the Course"
];

/**
 * Starts the game
 */
function startGame() {
    // Gets random phrase and displays it
    const randomPhraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhraseArray);
}

/**
 * Randomly selectes a phrase from the given array and returns a character array
 * @param {*} arr Array containing phrase strings
 * @returns Character array of randomly selected phrase
 */
function getRandomPhraseAsArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return Array.from(arr[randomIndex]);
}

/**
 * Displays the phrase boxes on the screen
 * @param {*} arr Character array of the phrase
 */
function addPhraseToDisplay(arr) {
    const phraseUL = document.querySelector("#phrase ul");
    arr.forEach(letter => {
        const li = document.createElement("li");
        li.textContent = letter;
        if (letter === " ") {
            li.classList.add("space");
        } else {
            li.classList.add("letter");
        }
        phraseUL.appendChild(li);
    });
}

/**
 * Reveals any matching letters in the phrase
 * @param {*} button Letter button clicked on on-screen keyboard
 * @returns Matching letter or null
 */
function checkLetter(button) {
    const letterListItems = document.querySelectorAll(".letter");
    const matchingLetter = button.textContent;
    let matchFound = false;

    // Reveals any matching letters in the phrase
    Array.from(letterListItems).forEach(letterListItem => {
        if (letterListItem.textContent.toLowerCase() === matchingLetter) {
            letterListItem.classList.add("show");
            matchFound = true;
        }
    });

    // Returns the matching letter if at least one exists, otherwise returns null
    if (matchFound) {
        return matchingLetter;
    } else {
        return null;
    }
}

// Adds click listener to all keyboard buttons
onScreenKeyboard.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
        const letterButton = event.target;
        const letterFound = checkLetter(letterButton);

        // Disables button
        letterButton.className = "chosen";
        letterButton.disabled = true;

        if (letterFound === null) {
            letterNotInPhrase();
        } else {
            checkWin();
        }
    }
});

/**
 * Increments missed counter and removes a heart
 * Displays lose screen if there are 5 misses
 */
function letterNotInPhrase() {
    // Increments missed counter
    missed++;

    // Removes a heart
    document.querySelectorAll(".tries img")[missed - 1].src = "images/lostheart.png";

    // Displays lose screen if there are 5 misses
    if (missed === 5) {
        resetGame();
        displayOverlay("lose");
    }
}

/**
 * Checks if the user won
 * Displays win screen if the user won
 */
function checkWin() {
    // Gets all letter list items
    const letterListItems = document.querySelectorAll(".letter");

    // Win only occurs when all letter list items have a class 'show
    for (let i = 0; i < letterListItems.length; i++) {
        const letterListItem = letterListItems[i];
        if (!letterListItem.classList.contains("show")) {
            return;
        }
    }
    resetGame();
    displayOverlay("win");
}

/**
 * Displays overlay
 * @param {*} overlayClass Class name of the overlay
 */
function displayOverlay(overlayClass) {
    const overlay = document.querySelector("#overlay");
    overlay.className = overlayClass;
    overlay.style.display = "";

    overlay.querySelector(".btn__reset").textContent = "Start a New Game";
}

/**
 * Resets game
 */
function resetGame() {
    // Resets phrase list
    const phraseList = document.querySelector("ul");
    while (phraseList.firstChild) {
        phraseList.removeChild(phraseList.firstChild);
    }

    // Re-enables all buttons
    const keyboardButtons = document.querySelectorAll(".keyrow button");
    Array.from(keyboardButtons).forEach(keyboardButton => {
        keyboardButton.className = "";
        keyboardButton.disabled = false;
    });

    // Resets lives
    missed = 0;
    const missHearts = document.querySelectorAll(".tries img");
    Array.from(missHearts).forEach(missHeart => {
        missHeart.src = "images/liveHeart.png";
    });
}
