import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import ImageRender from '../image-render/ImageRender';
import Container from 'react-bootstrap/esm/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './MovieRegistration.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import { MovieContext } from '../../contexts/MovieContext';

function MovieRegistration() {
    const [title, setTitle] = useState('');
    const [linkImage, setLinkImage] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { registerMovie } = useContext(MovieContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const movieData = {
            title,
            link_image: linkImage,
            description
        };
        console.log(movieData.title);

        const result = await registerMovie(movieData);

        if (result.success) {
            setSuccess(result.message);
            setError('');
            navigate('/home');
        } else {
            setError(result.message);
            setSuccess('');
        }
    };

    return (
        <div>
            <Header></Header>
            <ImageRender></ImageRender>
            <Container className="container-register">
                    <h3 className='text-center'>Register a new movie!</h3>
                    <Form.Label htmlFor="basic-url">Title</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-film" viewBox="0 0 16 16">
                                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z"/>
                            </svg>
                        </InputGroup.Text>
                        <Form.Control
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                    </InputGroup>

                    <Form.Label htmlFor="basic-url">Link of the banner image</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                                <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                                <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z"/>
                            </svg>
                        </InputGroup.Text>
                        <Form.Control 
                        id="basic-url" 
                        aria-describedby="basic-addon3" 
                        value={linkImage}
                        onChange={(e) => setLinkImage(e.target.value)}
                        required
                        />
                    </InputGroup>
                    
                    <FloatingLabel controlId="floatingTextarea2" label="Film Synopsis">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        />
                    </FloatingLabel>

                    <Col xs="auto" className="mt-3 d-flex justify-content-end">
                        <Button variant="dark" type="submit" onClick={handleSubmit}>ADD</Button>
                    </Col>
            </Container>
        </div>
    );
}

export default MovieRegistration;
