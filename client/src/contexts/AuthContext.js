import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Tenta carregar o estado de autenticação ao iniciar
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
            setUser(JSON.parse(localStorage.getItem('user')));
        }
    }, []);

    const login = (userData, tokens) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
