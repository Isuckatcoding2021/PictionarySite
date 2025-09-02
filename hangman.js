/* This algorithm selects a random word from a dictionary api */
async function fetchAndShowRandomWord() {
      const url = 'https://random-word-api.herokuapp.com/word?number=1';
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Network response was not OK');
        const words = await resp.json(); // returns array, e.g. ["banana"]
        const word = words[0];
        document.getElementById('random word').textContent = word;
        activateGamePlay(word);
      } catch (err) {
        console.error('Error fetching word:', err);
        document.getElementById('random word').textContent = 'Error loading word';
      }
    }

// Letter Guesses
/* 
1. The letter guessed is wrong -> fill in letter in incorrect spot + draw a portion of the hangman on the chart
2. The letter guessed is right -> fill in the correct spots in blank chart
3. The letter guessed has been guessed before -> pop up saying you've guessed that letter
*/

function activateGamePlay(word) {
  const unguessed_letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
  let hangmanPoints = 0; /* Track which part of the hangman needs to be shown */
  cleanBoard();
  generateSpaces(word);
  document.addEventListener("keydown", function(event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
      // it is a letter
      if (word.includes(event.key)) {
        showUserCorrectLetters(event.key, word, unguessed_letters);
      } else {
        logIncorrectLetter(event.key, unguessed_letters);
        hangMan(hangmanPoints);
      }
    }
  });
}

function hangMan(hangmanPoints) {
  hangmanPoints++;
  if (hangmanPoints == 1) {
    show('.head');
  } else if (hangmanPoints == 2) {
    show('.body');
  } else if (hangmanPoints == 3) {
    show('arm left');
  } else if (hangmanPoints == 4) {
    show('arm right');
  } else if (hangmanPoints == 5) {
    show('leg left');
  } else {
    show('leg right');
    endGame();
  }
}

function show(classname) {
  let element = document.querySelector(classname);
  element.style.display = 'block';
}

function endGame() {
  console.log("You lose!");
}

function logIncorrectLetter(guess, remaining_guesses) {
  const incorrectletterbox = document.querySelector('.missed-letters');
  incorrectletterbox.textContent = guess;
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