import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup'

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
                <Card>
                    <Card.Body>
                        <Card.Title>
                            {genre.Name}
                        </Card.Title>
                        <Card.Text>
                            Genre Description: {genre.Description}
                        </Card.Text>
                        <Card.Text>
                            <Link to={'/'} onClick={() => history.back()}><Button className="button-back" variant="danger">Back</Button></Link>
                        </Card.Text>
                        <Card.Text>
                            <Link to={`/`}><Button className="button-back" variant="danger">Back to all movies</Button></Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

        )
    }
} 