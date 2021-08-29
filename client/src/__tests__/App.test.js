import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import { getCurrentGame, currentGuess } from '../services';

jest.mock('../services', () => ({
  getCurrentGame: jest.fn(),
  currentGuess: jest.fn(),
  RestartGame: jest.fn()
}));

const mockData1 = {
  id: 123,
  livesLeft: 1,
  word: 'TEST',
  successfulGuesses: ['E'],
  failedGuesses: ['A', 'I', 'O', 'U', 'H'],
  gameStatus: 'OnGoing'
};
const mockData2 = {
  id: 123,
  livesLeft: 1,
  word: 'TEST',
  successfulGuesses: ['E', 'T'],
  failedGuesses: ['A', 'I', 'O', 'U', 'H'],
  gameStatus: 'OnGoing'
};

describe('App Test Cases', () => {
  // Initial Page Load
  it('loads correct data on Mount', async () => {
    getCurrentGame.mockResolvedValue(mockData1);
    let wrapper;
    await act(async () => {
      wrapper = render(<App />);
    });
    expect(wrapper.getByTestId('header').textContent).toBe('HANGMAN');
    expect(localStorage.getItem('id')).toBe('123');
  });

  // Make a guess
  it('make a guess', async () => {
    getCurrentGame.mockResolvedValue(mockData1);
    let wrapper;
    await act(async () => {
      wrapper = render(<App />);
    });
    expect(
      wrapper.getByTestId('Character-T').closest('button')
    ).not.toBeDisabled();

    currentGuess.mockResolvedValue(mockData2);
    await act(async () => {
      fireEvent.click(wrapper.getByTestId('Character-T'));
    });
    expect(wrapper.getByTestId('Character-T').closest('button')).toBeDisabled();
  });
});
