/* This algorithm selects a random word from a dictionary api */
async function fetchAndShowRandomWord() {
      const url = 'https://random-word-api.herokuapp.com/word?number=1';
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Network response was not OK');
        const words = await resp.json(); // returns array, e.g. ["banana"]
        const word = words[0];
        document.getElementById('random word').textContent = word;
        removeActivationButton();
        activateGamePlay(word);
      } catch (err) {
        console.error('Error fetching word:', err);
        document.getElementById('random word').textContent = 'Error loading word';
      }
    }

function removeActivationButton() {
  document.querySelector(".activation button").style.display = "none";
}

// Letter Guesses
/* 
1. The letter guessed is wrong -> fill in letter in incorrect spot + draw a portion of the hangman on the chart
2. The letter guessed is right -> fill in the correct spots in blank chart
3. The letter guessed has been guessed before -> pop up saying you've guessed that letter
*/

function activateGamePlay(word) {
  document.addEventListener("keydown", function(event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
      // it is a letter
      if (word.includes(event.key)) {
        console.log("Letter in word");
      } else {
        console.log("Letter not in word");
      }
    }
  });
}