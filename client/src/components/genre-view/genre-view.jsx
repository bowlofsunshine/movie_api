import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup';

import Navbar from 'react-bootstrap/Navbar';

import "./genre-view.scss";

export class GenreView extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { genre } = this.props;

        if (!genre) return null;

        return (
            <div className="genre-view" >
                <Card style={{ width: '50rem' }} className="ml-2">
                    <Card.Body>
                        <Card.Title>
                            {genre.Name}
                        </Card.Title>
                        <Card.Text>
                            Genre Description: {genre.Description}
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
            </div>

        )
    }
} 