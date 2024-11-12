import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/', // This will get the correct API URL based on the environment
});

export default api;