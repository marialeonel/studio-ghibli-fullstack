import React, { useContext, useState, useEffect } from 'react';
import { MovieContext } from '../../contexts/MovieContext';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function Input() {
    const { filterMovies } = useContext(MovieContext);
    const [searchTitle, setSearchTitle] = useState('');

    const handleInputChange = (e) => {
        filterMovies(e.target.value);
    };

    useEffect(() => {
        filterMovies(searchTitle);
    }, [searchTitle, filterMovies]);

    return (
        <div style={{ paddingTop: '20px' }}>
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    <i className="bi bi-search-heart"></i>
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
