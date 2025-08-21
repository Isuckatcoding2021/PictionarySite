// Step 1: Come up with a random word for the user to guess
/* This algorithm selects a random word from a dictionary api */
async function fetchAndShowRandomWord() {
      const url = 'https://random-word-api.herokuapp.com/word?number=1';
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error('Network response was not OK');
        const words = await resp.json(); // returns array, e.g. ["banana"]
        const word = words[0];
        document.getElementById('random word').textContent = word;
      } catch (err) {
        console.error('Error fetching word:', err);
        document.getElementById('random word').textContent = 'Error loading word';
      }
    }
