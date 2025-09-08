import axios from 'axios';

let currentToken = null;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  if (currentToken) {
    config.headers.Authorization = `Bearer ${currentToken}`;
  }
  return config;
});

export function setApiToken(token) {
  currentToken = token;
}

export default api;