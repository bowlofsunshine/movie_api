import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import "./movie-card.scss";

/**
 * @requires react
 * @requires prop-types 
 * @requires react-bootstrap/Button
 * @requires react-bootstrap/Card
 * @requires react-router-dom
 * @requires ./movie-card.scss
 */

export class MovieCard extends React.Component {
    render() {
        //this is given to the <MovieCard/> component by the outer world which, in this case, is 'MainView', as 'MainView' is whats connected to your database via the movies endpoint of you API
        const { movie } = this.props;

        return (

            <div className="movie-card">
                <Card border="danger" style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
                            <Button variant="danger">Open</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        );


    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string
    }).isRequired
};