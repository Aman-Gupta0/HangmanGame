import React from 'react';

const styles = {
  card: {
    fontSize: 32,
    margin: 10,
    borderRadius: '20%',
    width: 100,
    height: 100,
    fontWeight: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black'
  }
};

const CharacterDash = ({ word, successfulGuesses, gameStatus }) => {
  const maskedWordArray = word.toUpperCase().split('');
  let color;
  let backgroundColor;
  if (gameStatus === 'Game Lost') {
    color = '#ffff38';
    backgroundColor = '#c73a3a';
  }
  if (gameStatus === 'Game Won') {
    color = 'green';
    backgroundColor = '#6aff00';
  }

  return (
    <div style={{ display: 'inline-flex' }}>
      {maskedWordArray.map((char, i) => (
        <span
          key={i}
          type="text"
          style={{ ...styles.card, backgroundColor, color }}
        >
          {gameStatus !== 'OnGoing' ||
          successfulGuesses.includes(char.toUpperCase())
            ? char
            : '___'}
        </span>
      ))}
    </div>
  );
};

export default CharacterDash;
