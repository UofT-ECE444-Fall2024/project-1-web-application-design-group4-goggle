import axios from 'axios'

const api = axios.create({
  baseURL: 'http://18.218.26.235/', // This will get the correct API URL based on the environment
});

export default api;