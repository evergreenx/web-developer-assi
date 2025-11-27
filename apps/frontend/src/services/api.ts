import axios from 'axios';

const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_APP_LOCAL_BASE_URL
  : import.meta.env.VITE_APP_HOSTED_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default api;
