import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor para adicionar o token caso o utilizador já tenha feito login
api.interceptors.request.use(async config => {
    const token = localStorage.getItem('@BibliotecaPublica:token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;