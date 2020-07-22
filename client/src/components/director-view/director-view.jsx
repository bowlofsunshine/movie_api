import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

import Navbar from 'react-bootstrap/Navbar';

import "./director-view.scss";

/**
 * @requires react
 * @requires react-bootstrap/Card
 * @requires react-bootstrap/Button
 * @requires react-router-dom
 * @requires react-bootstrap/ListGroup
 * @requires ./director-view.scss
 */

export class DirectorView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { director } = this.props;

        if (!director) return null;

        return (
            <div className="director-view" >
                <Card style={{ width: '50rem' }} className="ml-2">
                    <Card.Body>
                        <Card.Title>
                            {director.Name}
                        </Card.Title>
                        <Card.Text>
                            Bio: {director.Bio}
                        </Card.Text>
                        <Card.Text>
                            Birth Year: {director.Birth}
                        </Card.Text>
                        <ListGroup variant="flush" >
                            <ListGroup.Item>
                                <Card.Text>
                                    <Link to={'/'} onClick={() => history.back()}><Button className="button-back mr-2" variant="outline-danger">Back</Button></Link>
                                    <Link to={`/`}><Button className="button-back" variant="danger">Back to all movies</Button></Link>
                                </Card.Text>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div >

        )
    }
} 