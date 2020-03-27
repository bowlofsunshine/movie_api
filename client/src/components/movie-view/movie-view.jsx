import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { MainView } from '../main-view/main-view';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

import "./movie-view.scss"

export class MovieView extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        return (

            <div className="movie-view container-fluid align-items-center">
                <img className="movie-poster" src={movie.ImagePath} />
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value mt-1 mb-3">{movie.Description}</span>
                </div>

                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <Button href="/">Go Back</Button>


            </div>
        );
    }
}

{/* <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card> */}