// Step 1: Come up with a random word for the user to guess
/* This algorithm selects a random word from a dictionary api */
fetch('https://random-words-api.kushcreates.com/word')
  .then(response => response.json())
  .then(data => {
    console.log(data[0].word); // Logs a random word
  })
  .catch(error => console.error('Error fetching random word:', error));