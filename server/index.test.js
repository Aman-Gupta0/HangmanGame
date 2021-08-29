const supertest = require('supertest');
const request = supertest(require('./index.js'));

jest.mock('random-words', () => () => 'APPLE');

describe('Test APIs', () => {
  // New Load Data
  it('New Load Data', async () => {
    const res = await request.post('/getCurrentGame').send();
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        livesLeft: 6,
        word: 'APPLE',
        successfulGuesses: [],
        failedGuesses: [],
        gameStatus: 'OnGoing'
      })
    );
  });

  // Incorrect Guess
  it('Incorrect Guess', async () => {
    const res = await request.post('/currentGuess').send({
      id: 1,
      guess: 'M'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        livesLeft: 5,
        word: 'APPLE',
        successfulGuesses: [],
        failedGuesses: ['M'],
        gameStatus: 'OnGoing'
      })
    );
  });

  // Correct Guess
  it('Correct Guess', async () => {
    const res = await request.post('/currentGuess').send({
      id: 1,
      guess: 'A'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: 1,
        livesLeft: 5,
        word: 'APPLE',
        successfulGuesses: ['A'],
        failedGuesses: ['M'],
        gameStatus: 'OnGoing'
      })
    );
  });
});
