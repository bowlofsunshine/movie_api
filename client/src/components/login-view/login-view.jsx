import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //send a request to the server for authenitcation then call props.onLoggedIn(username)
        props.onLoggedIn(username);
    };

    return (
        <Form style={{ width: '16rem' }}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button id='loginButton' onClick={handleSubmit}>
                Log in
        </Button>
            <Form.Group controlId='newUser'>
                <Button id="registerButton" onClick={() => props.onClick()}>Register</Button>
            </Form.Group>
        </Form>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};