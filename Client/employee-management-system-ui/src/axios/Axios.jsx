import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 2000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
});

export default api;