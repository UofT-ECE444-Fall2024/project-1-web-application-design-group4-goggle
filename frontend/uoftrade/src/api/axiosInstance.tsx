import axios from 'axios';

const api = axios.create({
  baseURL: 'http://18.207.149.254/', // This will get the correct API URL based on the environment
});

export default api;