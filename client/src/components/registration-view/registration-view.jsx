import React, { useState } from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './registration-view.scss';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, name, email, birthday);
        //send a request to the server for authenitcation then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    return (
        <Form className='registrationForm' style={{ width: '16rem' }}>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="choose username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="birthday" placeholder="Enter birthday(12/12/1995)" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='newUser'>
                <Button id="registerButton" onClick={() => props.onClick()}>Register</Button>
            </Form.Group>
        </Form>
    );
}

RegistrationView.propTypes = {
    onSignedIn: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};