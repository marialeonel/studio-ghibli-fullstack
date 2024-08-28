import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import ImageRender from '../image-render/ImageRender';
import Container from 'react-bootstrap/esm/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import './MovieRegistration.css'
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function MovieRegistration() {
    // const [title, setTitle] = useState('');
    // const [linkImage, setLinkImage] = useState('');
    // const [description, setDescription] = useState('');
    // const [year, setYear] = useState('');
    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');

    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.post('http://localhost:3001/movie/register', {
    //             title,
    //             link_image: linkImage,
    //             description,
    //             year,
    //         });

    //         if (response.status === 201) {
    //             setSuccess('Movie successfully created!');
    //             setError('');
    //             // Redirecionar para a página de listagem de filmes, por exemplo
    //             navigate('/movies');
    //         }
    //     } catch (error) {
    //         setError('An error occurred. Please try again later.');
    //         setSuccess('');
    //     }
    // };

    return (
        <div>
            <Header></Header>
            <ImageRender></ImageRender>
            <Container className="container-register">

                    <Form.Label htmlFor="basic-url">Title</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                        <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>

                    <Form.Label htmlFor="basic-url">Link of the banner image</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon3">
                        https://example.com/users/
                        </InputGroup.Text>
                        <Form.Control id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>
                    
                    <FloatingLabel controlId="floatingTextarea2" label="Description">
                        <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                        />
                    </FloatingLabel>
            </Container>
        </div>
    );
}

export default MovieRegistration;
