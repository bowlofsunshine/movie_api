import React, { useState } from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";

export function ProfileUpdate(props) {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [email, updateEmail] = useState('');
    const [birthday, updateBirthday] = useState('');

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://myflixyappy1226.herokuapp.com/users/${username}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(response => {
            const data = response.data;
            console.log(data);
            window.open('/', '_self');
            //// the second argument '_self' is necessary so that the page will open in the current tab
        })
            .catch(e => {
                console.log('error updating user' + error);
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form className='registrationForm' style={{ width: '16rem' }}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="username" placeholder="choose username" value={username} onChange={e => updateUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={e => updatePassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => updateEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBasicBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control type="birthday" placeholder="Enter birthday(12/26/1995)" value={birthday} onChange={e => updateBirthday(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='updateUser'>
                            <Button id="update-button" variant="danger" type="submit" onClick={handleUpdate}>Update</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}
