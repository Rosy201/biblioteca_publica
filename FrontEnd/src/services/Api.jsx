import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('@BiblioTech:token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        let mensagem = 'Ocorreu um erro inesperado. Tente novamente.';

        if (error.code === 'ECONNABORTED') {
            mensagem = 'A requisição demorou muito para responder. Verifique se o backend está ativo.';
        } else if (!error.response) {
            mensagem = 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.';
        } else if (error.response.status === 400) {
            mensagem =
                error.response.data?.erro ||
                error.response.data?.message ||
                'Dados inválidos. Verifique as informações enviadas.';
        } else if (error.response.status === 401) {
            mensagem =
                error.response.data?.erro ||
                error.response.data?.message ||
                'Acesso não autorizado. Faça login novamente.';
        } else if (error.response.status === 403) {
            mensagem = 'Você não tem permissão para executar esta ação.';
        } else if (error.response.status === 404) {
            mensagem = 'O recurso solicitado não foi encontrado.';
        } else if (error.response.status >= 500) {
            mensagem = 'Erro interno no servidor. Verifique o backend.';
        }

        error.usuarioMessage = mensagem;

        return Promise.reject(error);
    }
);

export default api;