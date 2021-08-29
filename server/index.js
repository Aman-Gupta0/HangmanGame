const randomWords = require('random-words');
const express = require('express');
const app = express();
app.use(express.json());

let allGames = [];

const newGame = () => ({
  id: allGames.length + 1,
  livesLeft: 6,
  word: randomWords().toUpperCase(),
  successfulGuesses: [],
  failedGuesses: [],
  gameStatus: 'OnGoing'
});

const getGameById = (id) => {
  const currGame = allGames.filter((val) => val.id === id)[0];
  const createdGame = newGame();
  if (!currGame) {
    allGames.push(createdGame);
  }
  return currGame ? currGame : createdGame;
};

app.post('/getCurrentGame', (req, res) => {
  const currentGame = getGameById(req.body.id);
  res.send(currentGame);
});

app.post('/currentGuess', (req, res) => {
  const { id, guess } = req.body;
  const currentGame = getGameById(id);
  const isGuessCorrect = currentGame.word.indexOf(guess) !== -1;
  if (isGuessCorrect) {
    currentGame.successfulGuesses.push(guess);
    for (let i = 0; i < currentGame.word.length; i++) {
      if (currentGame.successfulGuesses.includes(currentGame.word.charAt(i))) {
        if (i + 1 === currentGame.word.length) {
          currentGame.gameStatus = 'Game Won';
        }
      } else {
        break;
      }
    }
  } else {
    currentGame.failedGuesses.push(guess);
    if (currentGame.livesLeft === 1) {
      currentGame.gameStatus = 'Game Lost';
    }
    currentGame.livesLeft = currentGame.livesLeft - 1;
  }
  res.send(currentGame);
});

app.post('/restartGame', (req, res) => {
  const result = newGame();
  result.id = req.body.id;
  allGames = allGames.map((val) => {
    return val.id === req.body.id ? result : val;
  });
  res.send(result);
});

const port = process.env.PORT || 3001;
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Connected to Port : ${port}`);
  });
}

module.exports = app;
