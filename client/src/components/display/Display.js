import React, { useContext, Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { MovieContext } from '../../contexts/MovieContext.js';
import Input from '../input/Input.js';
//import Modal from '../modal/Modal.js';
import './Display.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button.js';
import ImageRender from '../image-render/ImageRender.js';

const Cards = React.lazy(() => delayForDemo(import('../card/Cards.js')));

function Display() {
    const { filteredMovies } = useContext(MovieContext);
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/register'); 
      };

    return (
            
            <Container className="container-display">
            <Input />
            <Suspense fallback={
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    <Spinner animation="border" role="status" />
                </div>
            }>
                <div className="d-flex justify-content-end">
                    <Button variant="success" onClick={handleNavigate}>+ New</Button>
                </div>
                <Cards movies={filteredMovies} />
            </Suspense>
        </Container>
        
    );
}

function delayForDemo(promise) {
    return new Promise(resolve => {
        setTimeout(resolve, 2000);
    }).then(() => promise);
}


export default Display;
