import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import Title from './components/Title';
import LifeBox from './components/LifeBox';
import { TotalLives } from './constant/HangmanConstant';
import { Alphabets } from './constant/Alphabets';
import CharacterDash from './components/CharacterDash';
import CharacterTiles from './components/CharacterTiles';
import Drawing from './components/Drawing';
import Loader from './components/Loader';
import { getCurrentGame, currentGuess, RestartGame } from './services';

const styles = {
  playAgain: {
    width: 200,
    height: 50,
    fontSize: 30,
    borderRadius: '6%',
    backgroundColor: '#c7f1e3',
    color: 'black',
    cursor: 'grab'
  }
};

const App = () => {
  const [livesLeft, setLivesLeft] = useState(TotalLives);
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(true);
  const [successfulGuesses, setSuccessfulGuesses] = useState([]);
  const [failedGuesses, setFailedGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState('OnGoing');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getCurrentGame();
    if (data) {
      const {
        id,
        livesLeft,
        word,
        successfulGuesses,
        failedGuesses,
        gameStatus
      } = data;
      localStorage.setItem('id', id);
      setLivesLeft(livesLeft);
      setWord(word?.toUpperCase());
      setFailedGuesses(failedGuesses);
      setSuccessfulGuesses(successfulGuesses);
      setGameStatus(gameStatus);
    }
    setLoading(false);
  };

  const checkGuess = async (guess) => {
    setLoading(true);
    const payload = {
      id: JSON.parse(localStorage.getItem('id')),
      guess: guess.toUpperCase()
    };
    const data = await currentGuess(payload);
    if (data) {
      const { livesLeft, successfulGuesses, failedGuesses, gameStatus } = data;
      setLivesLeft(livesLeft);
      setFailedGuesses(failedGuesses);
      setSuccessfulGuesses(successfulGuesses);
      setGameStatus(gameStatus);
    }
    setLoading(false);
  };

  const restart = async () => {
    setLoading(true);
    setLivesLeft(TotalLives);
    setSuccessfulGuesses([]);
    setFailedGuesses([]);
    setGameStatus('OnGoing');
    const data = await RestartGame();
    if (data) {
      setWord(data.word);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loader id="load" />;
  }
  return (
    <>
      <Title testid="header" heading="HANGMAN" />
      <Divider />

      {gameStatus !== 'OnGoing' ? (
        <Title
          heading={gameStatus}
          color={gameStatus === 'Game Won' ? '#78ff19' : '#c73a3a'}
        />
      ) : null}
      <Divider />

      <Drawing livesLeft={livesLeft} />
      <LifeBox livesLeft={livesLeft} />
      <Title
        testid="correct"
        heading={`Successful Guesses : ${successfulGuesses}`}
      />
      <Title testid="wrong" heading={`Failed Guesses : ${failedGuesses}`} />
      <Divider />

      <CharacterDash
        word={word}
        successfulGuesses={successfulGuesses}
        gameStatus={gameStatus}
      />
      <Divider />

      {Object.keys(Alphabets).map((val, i) => (
        <CharacterTiles
          key={i}
          character={val}
          gameStatus={gameStatus}
          alreadyGuessed={[...successfulGuesses, ...failedGuesses]}
          checkGuess={checkGuess}
        />
      ))}
      <Divider />

      {gameStatus !== 'OnGoing' ? (
        <div style={{ justifyContent: 'center', display: 'flex' }}>
          <button style={styles.playAgain} onClick={restart}>
            Play Again
          </button>
        </div>
      ) : null}
    </>
  );
};

export default App;
