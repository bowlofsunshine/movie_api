import React, { useState } from 'react';
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

/**
 * @requires react 
 * @requires axios
 * @requires react-bootstrap/Form
 * @requires react-bootstrap/Button
 * @requires react-bootstrap/Container
 * @requires react-bootstrap/Row
 * @requires react-bootstrap/Col
 */

export function ProfileUpdate(props) {

    /**
    * updating the username, password, email, birthday 
    * @constant {string} username
    * @constant {string} password
    * @constant {string} email
    * @constant {string} birthday
    */
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [email, updateEmail] = useState('');
    const [birthday, updateBirthday] = useState('');

    /**
     * @function handleUpdate
     * @param {*} e 
     * @returns {object} updated user data
     */
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://myflixyappy1226.herokuapp.com/users/${localStorage.getItem('user')}`, {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(response => {
            const data = response.data;
            localStorage.setItem("user", username);
            console.log(data);
            window.open('/client', '_self');
            //// the second argument '_self' is necessary so that the page will open in the current tab
        })
            .catch(e => {
                console.log('error updating user' + e);
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form className='updateForm' style={{ width: '16rem' }}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="text" placeholder="desired username" onChange={e => updateUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" placeholder="desired password" onChange={e => updatePassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="text" placeholder="desired email" onChange={e => updateEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control required type="date" placeholder="your email" onChange={e => updateBirthday(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId='newUser'>
                            <Button id="updateButton" variant="danger" type="submit" onClick={handleUpdate}>Update</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

