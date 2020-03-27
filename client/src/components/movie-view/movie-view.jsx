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
                <Button variant="primary" onClick={() => onClick()} className="backButton">
                    Go back
                      </Button>


            </div>
        );
    }
}