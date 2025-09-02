/* This algorithm selects a random word from a dictionary api */
async function fetchAndShowRandomWord() {
      const url = 'https://random-word-api.herokuapp.com/word?number=1';
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Network response was not OK');
        const words = await resp.json(); // returns array, e.g. ["banana"]
        const word = words[0];
        activateGamePlay(word);
      } catch (err) {
        console.error('Error fetching word:', err);
        document.getElementById('random word').textContent = 'Error loading word';
      }
    }

// Letter Guesses

let keydownHandler = null;
let hangmanPoints = 0; /* Track which part of the hangman needs to be shown */
const unguessed_letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

function activateGamePlay(word) {
  const unguessed_letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
  hangmanPoints = 0; // Reset global tracker
  cleanBoard();
  generateSpaces(word);
  keydownHandler = createKeydownHandler(word, unguessed_letters);
  document.addEventListener("keydown", keydownHandler);
}

function createKeydownHandler(word, unguessed_letters) {
  return function(event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
      if (word.includes(event.key)) {
        showUserCorrectLetters(event.key, word, unguessed_letters);
      } else {
        logIncorrectLetter(event.key, unguessed_letters);
        hangmanPoints++;
        hangMan(hangmanPoints);
      }
    }
  };
}



function hangMan(hangmanPoints) {
  console.log(hangmanPoints);
  if (hangmanPoints == 1) {
    show('.head');
  } else if (hangmanPoints == 2) {
    show('.body');
  } else if (hangmanPoints == 3) {
    show('.arm.left');
  } else if (hangmanPoints == 4) {
    show('.arm.right');
  } else if (hangmanPoints == 5) {
    show('.leg.left');
  } else {
    show('.leg.right');
    endGame('#lose');
  }
}

function show(classname) {
  let element = document.querySelector(classname);
  element.style.display = 'block';
}

function endGame(classname) {
  // Show Replay Button (to be created)
  document.removeEventListener("keydown", keydownHandler);
  keydownHandler = null;
  show(classname);
}

function logIncorrectLetter(guess, remaining_guesses) {
  const incorrectletterbox = document.querySelector('.missed-letters');
  if (remaining_guesses.includes(guess)) {
    incorrectletterbox.textContent += guess;
  }
  removeGuess(remaining_guesses, guess);
}

function showUserCorrectLetters(guess, word, remaining_guesses) {
  const spans = document.querySelectorAll('#underscore-container span');
  for (let i = 0; i < word.length; i++) {
    if (guess == word[i]) {
      spans[i].textContent = guess;
    }
  }
  removeGuess(remaining_guesses, guess);

  // Count remaining empty spaces
  const remainingUnderscores = Array.from(spans).filter(span => span.textContent === '_').length;
  if (remainingUnderscores === 0) {
    endGame('#win');
  }

}

function removeGuess(remaining_guesses, guess) {
  for (let i = 0; i < remaining_guesses.length; i++) {
    if (remaining_guesses[i] === guess) {
      remaining_guesses.splice(i, 1);
      break; 
    }
  }
}

function cleanBoard() {
  const button = document.querySelector('.activation.button');
  button.remove(); 
  const container = document.getElementById('underscore-container');

  // Get all span elements inside the container
  const spans = container.querySelectorAll('span');

  // Loop through and remove spans that contain only "_"
  spans.forEach(span => {
    if (span.textContent.trim() === '_') {
      span.remove();
    }
  });
}

function generateSpaces(word) {
  const count = word.length;
  const container = document.getElementById('underscore-container');

  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = '_';
    container.appendChild(span);
  }
}