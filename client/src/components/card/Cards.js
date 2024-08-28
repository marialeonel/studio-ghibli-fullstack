import React, { useContext } from 'react';
import { MovieContext } from '../../contexts/MovieContext';
import Card from 'react-bootstrap/Card';

function Cards() {
    const { filteredMovies } = useContext(MovieContext);

    return (
        <div className="row">
            {filteredMovies.length > 0 ? (
                filteredMovies.map((movie) => (
                    <Card key={movie._id} style={{ width: '18rem', margin: '20px' }}>
                        <Card.Img variant="top" src={movie.link_image} style={{ marginTop: '10px' }} />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.description}</Card.Text>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>No movies available.</p>
            )}
        </div>
    );
}

export default Cards;
