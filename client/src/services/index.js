import axios from 'axios';

export const getCurrentGame = () => {
  const id = localStorage.getItem('id')
    ? JSON.parse(localStorage.getItem('id'))
    : null;
  return axios
    .post('/getCurrentGame', { id })
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error Found', error);
    });
};

export const currentGuess = (payload) => {
  return axios
    .post('/currentGuess', payload)
    .then((res) => res.data)
    .catch((error) => {
      console.error('Error Found', error);
    });
};

export const RestartGame = () => {
  const id = localStorage.getItem('id')
    ? JSON.parse(localStorage.getItem('id'))
    : null;
  return axios
    .post('/restartGame', { id })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error('Error Found', error);
    });
};
