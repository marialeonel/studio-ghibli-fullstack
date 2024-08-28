import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import MovieRegistration from './components/movie-register/MovieRegistration';

function App() {
    return (
      <AuthProvider>
        <MovieProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<MovieRegistration />}></Route>
          </Routes>
        </MovieProvider>
      </AuthProvider>
    );
  }

export default App;
