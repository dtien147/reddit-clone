import axios from 'axios';

const baseURL =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
  ? 'http://localhost:5000'
  : '';

  const instance = axios.create({
  baseURL: baseURL,
});

export const getRequest = (url) => {
  return instance.get(url);
};

export const postRequest = (url, body) => {
  return instance.post(url, body);
};
