import React from 'react';

const styles = {
  common: {
    fontSize: '32px',
    padding: '10px',
    margin: '10px',
    borderRadius: '30%',
    width: '100px'
  },
  characterTiles: {
    backgroundColor: 'aqua',
    cursor: 'grab'
  },
  disabledStyle: {
    backgroundColor: 'gray',
    cursor: 'not-allowed'
  }
};

const CharacterTiles = ({
  character,
  gameStatus,
  alreadyGuessed,
  checkGuess
}) => {
  const CapitalCharacter = character.toUpperCase();

  const checkDisabled =
    gameStatus !== 'OnGoing' || alreadyGuessed.includes(CapitalCharacter);

  return (
    <button
      data-testid={`Character-${CapitalCharacter}`}
      style={
        checkDisabled
          ? {
              ...styles.common,
              ...styles.disabledStyle
            }
          : {
              ...styles.common,
              ...styles.characterTiles
            }
      }
      onClick={() => checkGuess(CapitalCharacter)}
      disabled={checkDisabled}
    >
      {CapitalCharacter}
    </button>
  );
};

export default CharacterTiles;
