import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor para adicionar o token (quando você implementar JWT no futuro)
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('@BiblioTech:user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default api;