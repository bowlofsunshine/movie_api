import React, { useState } from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import './registration-view.scss';


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('https://myflixyappy1226.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }).then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
            //// the second argument '_self' is necessary so that the page will open in the current tab
        })
            .catch(e => {
                console.log('error registering user' + error);
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <br></br><br></br>
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
                        <Form.Group controlId="formBasicBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="birthday" placeholder="Enter birthday(12/26/1995)" value={birthday} onChange={e => setBirthday(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Button className="register-button mr-2" id="registerButton" variant="danger" type="submit" onClick={handleRegister}>Register</Button>
                            <Link to={'/'}><Button className="login-button mr-2" id="loginButton =" variant="primary">Login</Button></Link>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}