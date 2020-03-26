import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import "./main-view.scss"

export class MainView extends React.Component {
    constructor() {
        // call the superclass constructor so react can initialize it 
        super();

        //initialize the state to an empty object so we can destructure it later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
        };
    }
    //ome of the hooks available in react component 
    componentDidMount() {
        const movieURL = "https://myflixyappy1226.herokuapp.com/movies";
        axios.get(movieURL)
            .then(response => {
                //assign the resilt to the state 
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    //this overrides the rendure() method of the superclass, no need to call super() though, as it does nothing by default 
    render() {
        //if the state isnt initialized this will throw on runtime before the data is initally loaded 
        const { movies, selectedMovie, user } = this.state;
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        //before the movie have been loaded 
        if (!movies) return <div className="main-view" />;

        return (
            <Container>
                <div className="main-view">
                    <Row>
                        <Col sm>
                            {selectedMovie
                                ? <MovieView movie={selectedMovie} />
                                : movies.map(movie => (
                                    <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                                ))
                            }
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}



