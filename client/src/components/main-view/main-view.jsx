import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';

import "./main-view.scss"
import Button from 'react-bootstrap/Button';

export class MainView extends React.Component {
    constructor() {
        // call the superclass constructor so react can initialize it 
        super();

        //initialize the state to an empty object so we can destructure it later
        this.state = {
            movies: [],
            user: null
        };
    }
    getMovies(token) {
        axios.get('https://myflixyappy1226.herokuapp.com/movies', {
            //By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //ome of the hooks available in react component 
    componentDidMount() {
        //get the value of the token from localStorage
        let accessToken = localStorage.getItem('token');
        //get the value of the token from localStorage
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
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
        this.setState({
            user: null
        })
        window.open('/', '_self');
    }


    onLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        })
        window.open('/', '_self');
    }

    //this overrides the rendure() method of the superclass, no need to call super() though, as it does nothing by default 
    render() {
        //if the state isnt initialized this will throw on runtime before the data is initally loaded 
        const { movies, user } = this.state;

        //before the movie have been loaded 
        if (!movies) return <div className="main-view" />;

        return (
            //tells react-router your routes
            <Router>
                <Container fluid="true">
                    <div className="main-view">
                        <Button variant="primary" type="submit" id="logOutButton" onClick={() => this.onLogOut()}>Log out </Button>

                        <Row>

                            {/* //component has a path prop that expresses what it should match
                                //render() prop that tells it what to render if it matches up with the URL */}
                            <Route exact path='/' render={() => {
                                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                                return movies.map(m => <MovieCard key={m._id} movie={m} />)
                            }} />
                            <Route path="/register" render={() => <RegistrationView />} />
                            {/* path to display a single movie view contains a fixed fragment (movies/:movieId) */}
                            <Route path='/movies/:movieId' render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                            <Route path='/genres/:name' render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                            }} />
                            <Route path='/directors/:name' render={({ match }) => {
                                if (!movies) return <div className="main-view" />;
                                //with this line of code (without the .Director part in the end), you loop through the movies array (using the find method) and compare the director’s name from your database (m.Director.Name) with the director’s name from the URL bar (match.params.name).
                                return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                                //The command above will return whichever movie contains the required director's information. It returns an object that has a Director key, so adding .Director in the returned movie object will get the director's information.
                            }} />


                        </Row>

                    </div>
                </Container>
            </Router>
        );
    }
}



// {selectedMovie

//     ? <MovieView movie={selectedMovie} onClick={() => this.onButtonClick()} />

//     : movies.map(movie => (

//         <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
//     ))
// }

// register() {
//     this.setState({
//         register: true
//     });
// }
// alreadyMember() {
//     this.setState({
//         register: false
//     })
// }

// onMovieClick(movie) {
//     this.setState({
//         selectedMovie: movie
//     });
// }

// onButtonClick() {
//     this.setState({
//         selectedMovie: null
//     });
// }