import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import { MainView } from '../main-view/main-view';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { withRouter } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import './profile-view.scss';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


export class ProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            // username: null,
            // password: null,
            // email: null,
            // birthday: null,
            // favoriteMovies: []
        };
    }

    componentDidMount() {
        //authentication
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
            // this.getMovies(accessToken);
        }
    }

    getUser(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://myflixyappy1226.herokuapp.com/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    userData: response.data,
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                    favoriteMovies: response.data.FavoriteMovies

                });
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // getMovies(token) {
    //     axios.get(`https://myflixyappy1226.herokuapp.com/movies`, {
    //         //By passing bearer authorization in the header of your HTTP requests, you can make authenticated requests to your API.
    //         headers: { Authorization: `Bearer ${token}` }
    //     })
    //         .then(response => {
    //             // Assign the result to the state
    //             this.setState({
    //                 movies: response.data.Movies
    //             });
    //             // console.log(response);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    deleteAccount() {
        axios.delete(`https://myflixyappy1226.herokuapp.com/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                alert('account deleted');
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                this.setState({
                    user: null
                });
                window.open('/', '_self');
            })
            .catch(error => {
                console.log('error deleting account' + error);
            });
    }

    updateAccount() {
        axios.put(`https://myflixyappy1226.herokuapp.com/users/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log('error updating account' + error);
            });
    }

    render() {
        const { username, email, birthday, favoriteMovies, movies, deleteAccount } = this.state;

        // var favMoviesWithTitles = {}

        // console.log(favoriteMovies)

        return (
            <Card className="profile-view" style={{ width: '32rem' }}>
                <Card.Body>
                    <Card.Title className="profile-title">{username}'s Profile</Card.Title>
                    <ListGroup className="list-group-flush" variant="flush">
                        <ListGroup.Item>Username: {username}</ListGroup.Item>
                        <ListGroup.Item>Password: ****** </ListGroup.Item>
                        <ListGroup.Item>Email: {email}</ListGroup.Item>
                        <ListGroup.Item>Birthday: {birthday && birthday.slice(0, 10)}</ListGroup.Item>
                        <ListGroup.Item>Favorite Movies:
                            <div>

                                {/* {favoriteMovies} */}
                                {/* <Card.Title className="movie-title">{movie.Title}</Card.Title> */}

                                {/* {favoriteMovies.map(movies => {
                                    console.log(movies)
                                    // < li key={movies._id} className="movie-item" >
                                    //     <Link to={`/movies/${movies._id}`}>{movies.Title}</Link>
                                    // </li>

                                })} */}

                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="delete-button" variant="danger" type="submit" onClick={() => this.deleteAccount()}>Delete Account</Button>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to={`/users/${username}`}><Button className="update-button" variant="danger">Update Account</Button></Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card >
        );
    }
}








  // deleteFavoriteMovie(event, favoriteMovie) {
    //     console.log(favoriteMovie);
    //     // send a request to the server for authentication
    //     axios.delete(`https://myflixyappy1226.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${favoriteMovie}`, {
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //     })
    //         .then(response => {
    //             console.log('removed movie from favorites');
    //         })
    //         .catch(error => {
    //             console.log('error removing movie' + error);
    //         });
    // }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(username, password);
    //     //send a request to the server for authenitcation then call props.onLoggedIn(username)
    //     // props.onLoggedIn(username);
    //     axios.post('https://myflixyappy1226.herokuapp.com/login', {
    //         Username: username,
    //         Password: password
    //     }).then(response => {
    //         const data = response.data;
    //         props.onLoggedIn(data);
    //     })
    //         .catch(e => {
    //             console.log('user does not exist')
    //         });
    // };


    // deleteMovieFromFavs(event, favoriteMovie) {
    //     event.preventDefault();
    //     console.log(favoriteMovie);
    //     axios.delete(`https://myflixyappy1226.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${favoriteMovie}`, {
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //     })
    //         .then(response => {
    //             this.getUser(localStorage.getItem('token'));
    //         })
    //         .catch(event => {
    //             console.log('Oops... something went wrong...');
    //         });
    // }

    // handleChange(event) {
    //     this.setState({ [event.target.name]: event.target.value })
    // }