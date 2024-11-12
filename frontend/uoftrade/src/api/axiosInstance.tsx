import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.205.122.75/', // This will get the correct API URL based on the environment
});

export default api;