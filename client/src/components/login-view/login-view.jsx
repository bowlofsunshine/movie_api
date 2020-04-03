import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './login-view.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //send a request to the server for authenitcation then call props.onLoggedIn(username)
        // props.onLoggedIn(username);
        axios.post('https://myflixyappy1226.herokuapp.com/login', {
            Username: username,
            Password: password
        }).then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
            .catch(e => {
                console.log('user does not exist')
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <br></br><br></br>
                    <Form style={{ width: '16rem' }}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Button className="login-button mr-2" variant="primary" type="submit" id='loginButton' onClick={handleSubmit}>
                                Log in
                             </Button>
                            <Link to={'/register'}><Button className="register-button mr-2" id="registerButton" variant='danger'>Register</Button></Link>
                        </Form.Group>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
}