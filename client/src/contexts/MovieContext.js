import React, { createContext, useState, useEffect, useContext } from 'react';
import authApi from '../services/authApi';
import { AuthContext } from './AuthContext';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext); 
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const fetchMovies = async () => {
        try {
            const response = await authApi.get('/movie/movies');
            setMovies(response.data);
            setFilteredMovies(response.data); 
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchMovies(); 
        }
    }, [isAuthenticated]);

    const filterMovies = async (title) => {
        try {
            const response = await authApi.get('/movie/movies', {
                params: { title }
            });
            setFilteredMovies(response.data);
        } catch (error) {
            console.error("Error searching movies:", error);
        }
    };

    const registerMovie = async (movieData) => {
        try {
            const response = await authApi.post('/movie/new-movie', movieData);
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

