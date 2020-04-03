import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
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

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favoriteMovies: []
        };
    }

    componentDidMount() {
        //authentication
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    getUser(token) {
        let username = localStorage.getItem('user');
        axios.get(`https://myflixyappy1226.herokuapp.com/users/${localStorage.getItem('user')}`, {
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

    deleteFavoriteMovie(event, favoriteMovie) {
        event.preventDefault();
        console.log(favoriteMovie);
        // send a request to the server for authentication
        axios.delete(`https://myflixyappy1226.herokuapp.com/users/${localStorage.getItem('user')}/favorites/${favoriteMovie}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(response => {
                console.log('removed movie from favorites');
                location.reload();
            })
            .catch(error => {
                console.log('error removing movie' + error);
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
        const { username, email, birthday, favoriteMovies, deleteAccount } = this.state;

        const { movies } = this.props;

        let sortedMovies = [];
        let arrayMovies = movies.map(m => {
            for (let i = 0; i < favoriteMovies.length; i++) {
                const favMov = favoriteMovies[i];
                if (m._id === favMov) {
                    sortedMovies.push(m);
                }
            }
        });

        return (
            <Card className="profile-view ml-2" style={{ width: '32rem' }}>
                <Card.Body>
                    <Card.Title className="profile-title">{username}'s Profile</Card.Title>
                    <ListGroup className="list-group-flush" variant="flush">
                        <ListGroup.Item>Username: {username}</ListGroup.Item>
                        <ListGroup.Item>Password: ****** </ListGroup.Item>
                        <ListGroup.Item>Email: {email}</ListGroup.Item>
                        <ListGroup.Item>Birthday: {birthday && birthday.slice(0, 10)}</ListGroup.Item>
                        <ListGroup.Item>Favorite Movies:
                            
                                {movies && sortedMovies ? (
                                    <div>
                                        {sortedMovies.map(favoriteMovie => (
                                            <ListGroup.Item key={favoriteMovie._id}>
                                                <Link to={`/movies/${favoriteMovie._id}`}>
                                                <Button variant="link">{favoriteMovie.Title}</Button>
                                                </Link>
                                                <Button className="remove-button float-right" variant="outline-danger" size="sm" onClick={event => this.deleteFavoriteMovie(event, favoriteMovie._id)}>remove movie </Button>
                                            </ListGroup.Item>
                                        ))}
                                    </div>
                                    ):("You have no favorite movies")}
                           
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button className="delete-button mr-1" variant="danger" type="submit" onClick={() => this.deleteAccount()}>Delete Account</Button>
                            <Link to={`/update/${username}`}><Button className="update-button mr-1" variant="primary">Update Account</Button></Link>
                            <Link to={`/`}>
                                <Button className="button-back mr-1" variant="danger">Back to movies</Button>
                            </Link>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card >
        );
    }
}

    // let sortedMovies = {};
    //     let arrayMovies = []
    //     if (movies != null) {
    //         Object.entries(movies).map(([key, value]) => {
    //             for (var i = 0; i < favoriteMovies.length; i++) {
    //                 if (value["_id"] == favoriteMovies[i]) {
    //                     sortedMovies[favoriteMovies[i]] = { "title": value["Title"] };
    //                     arrayMovies.push(sortedMovies[value["_id"]]["title"]);
    //                 }
    //             }
    //         })
    //         console.log(arrayMovies);
    //     } else {
    //         console.log("Undedfined stuff");
    //     }

    // {arrayMovies.map(function (key, value) {
    //     return <li key={value}>{key}</li>
    // })}