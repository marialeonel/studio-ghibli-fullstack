// authApi.js
import axios from 'axios';

const authApi = axios.create({
    baseURL: 'https://localhost:3001/',
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
        if (error.response.status === 400 || error.response.status === 401) {
            console.log('Token expired or invalid.');
            localStorage.removeItem('accessToken'); 
            localStorage.removeItem('user'); 
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);


export default authApi;
