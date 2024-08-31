import React, { useContext, useState, useEffect } from 'react';
import { MovieContext } from '../../contexts/MovieContext';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function Input() {
    const { filterMovies } = useContext(MovieContext);
    const [searchTitle, setSearchTitle] = useState('');

    function debounce(fn, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn(...args);
            }, delay);
        };
    }
    
    const debouncedFilterMovies = debounce((title) => {
        filterMovies(title);
    }, 500);

    useEffect(() => {
        debouncedFilterMovies(searchTitle);
    }, [searchTitle]); 

    return (
        <div style={{ paddingTop: '20px' }}>
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search-heart" viewBox="0 0 16 16">
                        <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
                        <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
                    </svg>
                </InputGroup.Text>
                <Form.Control
                    aria-label="Title"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                />
            </InputGroup>
        </div>
    );
}

export default Input;
