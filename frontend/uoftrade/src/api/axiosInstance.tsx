import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.95.187.136/', // This will get the correct API URL based on the environment
});

export default api;