import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';

import { connect } from "react-redux";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { ProfileUpdate } from '../profile-view/profile-update';
import { RegistrationView } from '../registration-view/registration-view';
import { Link } from "react-router-dom";
// imported the relevant action
import { setUser } from '../../actions/actions';
import { setFilter } from '../../actions/actions';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import "./main-view.scss"
import Button from 'react-bootstrap/Button';


/**
 * @requires react
 * @requires axios
 * @requires react-router-dom
 * @requires react-bootstrap/Container
 * @requires react-bootstrap/Row
 * @requires LoginView
 * @requires react-redux
 * @requires MovieView
 * @requires DirectorView
 * @requires GenreView
 * @requires ProfileView
 * @requires ProfileUpdate
 * @requires RegistrationView
 * @requires Link
 * @requires setUser
 * @requires setMovies
 * @requires MoviesList
 * @requires ./main-view.scss
 * @requires Button
 */

export class MainView extends React.Component {
    constructor() {
        // call the superclass constructor so react can initialize it 
        super();

        //initialize the state to an empty object so we can destructure it later
        this.state = {
            user: null
        };
    }

    /**
     * get all the movies from database 
     * @function getMovies
     * @param {object} token 
     * @returns {array} movies
     */
    getMovies(token) {
        axios.get('https://myflixyappy1226.herokuapp.com/movies', {
            //By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                //extracted out the loop over the movies that renders a bunch of MovieCard components into a new MoviesList component
                this.props.setMovies(response.data);
                // Assign the result to the state
                // this.setState({
                //     movies: response.data
                //});
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    /**
     * update user data when state is changed
     * @function updateUser
     * @param {object} data 
     */
    updateUser(data) {
        this.setState({
            userInfo: data
        });
        localStorage.setItem('user', data.Username);
    }
    /**
    * checks to see if the user is logged in by checking accesstoken 
    * @function componentDidMount
    */

    //Some of the hooks available in react component 
    componentDidMount() {
        //get the value of the token from localStorage
        let accessToken = localStorage.getItem('token');
        //get the value of the token from localStorage
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
            this.getUser(accessToken);
        }
    }

    /**
     * when loggedin user is sent to login view 
     * @function onLoggedIn
     * @param {object} authData
     */
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
        this.getUser(authData.token);
        // window.open('/client', '_self');
    }

    /**
     * when user logs out the page is sent to the login page 
     * @function onLogOut
     */
    onLogOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        })
        window.open('/', '_self');
    }
    /**
     * retrieve the users information 
     * @function getUser
     * @param {object} user 
     * @param {object} token 
     * @returns {object} users data 
     */
    getUser(user, token) {
        axios.get(`https://myflixyappy1226.herokuapp.com/user/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.props.setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //this overrides the rendure() method of the superclass, no need to call super() though, as it does nothing by default 
    render() {
        //if the state isnt initialized this will throw on runtime before the data is initally loaded 
        const { userInfo, token } = this.state;
        let { movies } = this.props;
        let { user } = this.state;
        //before the movie have been loaded 
        if (!movies) return <div className="main-view" />;

        return (
            //tells react-router your routes
            <Router basename="/client">

                <Link to={`/users/${user}`}>
                    <Button className="profile-button ml-2 mr-2" variant="primary">
                        Profile
                            </Button>
                </Link>
                <Button className="logout-button mr-2" variant="primary" type="submit" id="logOutButton" onClick={() => this.onLogOut()}>Log out </Button>
                <div className="main-view">
                    <Container fluid className="main-view">



                        <Row>
                            {/* //component has a path prop that expresses what it should match
                                //render() prop that tells it what to render if it matches up with the URL */}
                            <Route exact path='/' render={() => {
                                if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                                // return movies.map(m => <MovieCard key={m._id} movie={m} />)
                                //receives the movies from the store in stages: first, the movies state is extracted from the store through the connect() 
                                //function before being passed as the movies prop for the MainView component.
                                return <MoviesList movies={movies} />;
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
                            <Route path="/users/:Username" render={({ match }) => { return <ProfileView userInfo={userInfo} movies={movies} /> }} />

                            <Route path="/update/:Username" render={({ match }) => { return <ProfileUpdate user={user} userInfo={userInfo} token={token} updateUser={data => this.updateUser(data)} /> }} />


                        </Row>


                    </Container>
                </div>
            </Router >
        );
    }
}

let mapStateToProps = state => {
    return { movies: state.movies, setUser: state.setUser }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
