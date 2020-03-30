import React from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import "./main-view.scss"

export class MainView extends React.Component {
    constructor(props) {
        // call the superclass constructor so react can initialize it 
        super(props);

        //initialize the state to an empty object so we can destructure it later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null,
            register: false
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
    //The parameter has been renamed from user to authData, as you need to use both the user and the token.
    onLoggedIn(authData) {
        //The authData has been logged in the console. We recommend you open the console and check the authData that’s been sent.
        console.log(authData);
        //The user’s username (authData.user.Username) has been saved in the user state
        this.setState({
            user: authData.user.Username
        });
        //The auth information received from the handleSubmit method—the token and the user—has been saved in localStorage. localStorage has a setItem method that accepts two arguments: a key and a value. In this example, the token and username have been saved.
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        //this.getMovies(authData) is called and will get the movies from your API once the user is logged in. Note the use of the this keyword, which is a special keyword in JavaScript. this refers to the object itself, in this case, the MainView class.
        this.getMovies(authData.token);
    }
    register() {
        this.setState({
            register: true
        });
    }
    alreadyMember() {
        this.setState({
            register: false
        })
    }
    onButtonClick() {
        this.setState({
            selectedMovie: null
        });
    }

    getMovies(token) {
        axios.get('myflixyappy1226.herokuapp.com/movies', {
            //By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.
            headers: { Authorization: 'Bearer ${token}' }
        })
            .then(response => {
                //assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //this overrides the rendure() method of the superclass, no need to call super() though, as it does nothing by default 
    render() {
        //if the state isnt initialized this will throw on runtime before the data is initally loaded 
        const { movies, selectedMovie, user, register } = this.state;
        if (!user && register === false) return <LoginView onClick={() => this.register()} onLoggedIn={user => this.onLoggedIn(user)} />;
        //before the movie have been loaded 
        if (register) return <RegistrationView onClick={() => this.alreadyMember()} onSignedIn={user => this.onSignedIn(user)} />
        if (!movies) return <div className="main-view" />;

        return (
            <div className="main-view">
                <Container>
                    <Row>
                        <Col sm>
                            {selectedMovie
                                ? <MovieView movie={selectedMovie} onClick={() => this.onButtonClick()} />
                                : movies.map(movie => (
                                    <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                                ))
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}



