import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.1.68.74/', // This will get the correct API URL based on the environment
});

export default api;