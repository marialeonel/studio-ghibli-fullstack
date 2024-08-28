// authApi.js
import axios from 'axios';

const authApi = axios.create({
    baseURL: 'http://localhost:3001/',
    // Outras configurações específicas para autenticação
});

authApi.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

authApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            console.log('Token expired or invalid.');
            window.location.href = '/auth/login';
        }

        return Promise.reject(error);
    }
);

export default authApi;
