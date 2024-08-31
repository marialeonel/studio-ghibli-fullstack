import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import authApi from '../services/authApi';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const fetchMovies = async () => {
        try {
            const response = await authApi.get('/movie/list');
            setMovies(response.data);
            setFilteredMovies(response.data); 
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const filterMovies = async (title) => {
        try {
            const response = await authApi.get('/movie/search', {
                params: { title}
            });
            setFilteredMovies(response.data);
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    const registerMovie = async (movieData) => {
        try {
            const response = await authApi.post('/movie/register', movieData);
            if (response.status === 201) {
                setMovies([...movies, response.data]);
                setFilteredMovies([...filteredMovies, response.data]);
                return { success: true, message: 'Movie successfully created!' };
            }
        } catch (error) {
            console.error("Error registering movie:", error);
            return { success: false, message: 'An error occurred. Please try again later.' };
        }
    };

    return (
        <MovieContext.Provider value={{ filteredMovies, filterMovies, registerMovie, fetchMovies }}>
            {children}
        </MovieContext.Provider>
    );
};
