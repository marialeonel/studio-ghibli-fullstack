import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import authApi from '../services/authApi';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await authApi.get('/movie/list');
                console.log(response)
                setMovies(response.data);
                setFilteredMovies(response.data); 
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    const filterMovies = async (title, year) => {
        try {
            const response = await authApi.get('/movie/search', {
                params: { title}
            });
            setFilteredMovies(response.data);
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    return (
        <MovieContext.Provider value={{ filteredMovies, filterMovies }}>
            {children}
        </MovieContext.Provider>
    );
};
