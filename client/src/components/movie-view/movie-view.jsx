import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { MainView } from '../main-view/main-view';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

import "./movie-view.scss"

export class MovieView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    addFavoriteMovie(e) {
        const { movie } = this.props;
        e.preventDefault();
        axios.post(`https://myflixyappy1226.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${movie._id}`,
            { username: localStorage.getItem('user') },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }

        ).then(response => {
            console.log(`${movie.Title} added to your favorites`);
        }).catch(error => {
            console.log(error)
        });
    }

    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view">
                <Card border="danger" style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title className="movie-title" >{movie.Title}</Card.Title>
                        <Card.Text >Description: {movie.Description}</Card.Text>
                        <ListGroup variant="flush">

                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <ListGroup.Item>Genre: {movie.Genre.Name}</ListGroup.Item>
                            </Link>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <ListGroup.Item>Director: {movie.Director.Name}</ListGroup.Item>
                            </Link>

                        </ListGroup>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Button block variant="outline-danger" onClick={e => this.addFavoriteMovie(e)}> Add to Favorites </Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link to={`/`}>
                                    <Button block className="button-back" variant="danger">Back to movies</Button>
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}