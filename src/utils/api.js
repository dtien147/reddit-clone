import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getRequest = (url) => {
  return instance.get(url);
};