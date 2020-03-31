import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import ListGroup from 'react-bootstrap/ListGroup'

import "./director-view.scss";

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
                <Card>
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
                        <Card.Text>
                            <Link to={'/'} onClick={() => history.back()}><Button className="button-back" variant="danger">Back</Button></Link>
                        </Card.Text>
                        <Card.Text>
                            <Link to={`/`}><Button className="button-back" variant="danger">Back to all movies</Button></Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div >

        )
    }
} 