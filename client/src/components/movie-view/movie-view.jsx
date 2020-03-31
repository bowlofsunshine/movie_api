import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { MainView } from '../main-view/main-view';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'

import "./movie-view.scss"

export class MovieView extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view">

                <Card border="danger" style={{ width: '20rem' }}>
                    <Card.Title className="movie-title">{movie.Title}</Card.Title>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                        <Card.Title >{movie.Title}</Card.Title>
                        <Card.Text >Description: {movie.Description}</Card.Text>
                        <ListGroup >

                            <Link to={`/genres/${movie.Genre.Name}`}>
                                <ListGroup.Item>Genre: {movie.Genre.Name}</ListGroup.Item>
                            </Link>
                            <Link to={`/directors/${movie.Director.Name}`}>
                                <ListGroup.Item>Director: {movie.Director.Name}</ListGroup.Item>
                            </Link>
                        </ListGroup>
                        <Link to={`/`}>
                            <Button className="button-back" variant="danger">Back to movies</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         _id: PropTypes.string,
//         Title: PropTypes.string,
//         Description: PropTypes.string,
//         ImagePath: PropTypes.string,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string,
//             Description: PropTypes.string

//         }),
//         Director: PropTypes.shape({
//             Name: PropTypes.string
//         })
//     }).isRequired
// };

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string,
//         Description: PropTypes.string,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string
//         }),
//         Director: PropTypes.shape({
//             Name: PropTypes.string
//         })
//     }).isRequired,
//     onClick: PropTypes.func.isRequired
// }

{/* <Card border="danger" style={{ width: '16rem' }} className="movie-view container-fluid align-items-center">
    <Card.Img variant="top" className="movie-poster" src={movie.ImagePath} />
    <Card.Body>
        <Card.Title className="movie-title">{movie.Title}</Card.Title>
        <Card.Lable className="label">Description:</Card.Lable>
        <Card.Text className="value mt-1 mb-3">{movie.Description}</Card.Text>
        <Card.Lable className="label">Description:</Card.Lable>
        <Card.Text className="value mt-1 mb-3">{movie.Genre.Name}</Card.Text>
        <Card.Lable className="label">Description:</Card.Lable>
        <Card.Text className="value mt-1 mb-3">{movie.Director.Name}</Card.Text>
        <Button variant="primary" onClick={() => onClick(movie)}>Open</Button>
    </Card.Body>
</Card> */}

{/* <div className="movie-view container-fluid align-items-center">
               <img className="movie-poster" src={movie.ImagePath} />
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                 <div className="movie-description">
                     <span className="label">Description: </span>
                     <span className="value mt-1 mb-3">{movie.Description}</span>
                </div>

                 <div className="movie-genre">
                     <span className="label">Genre: </span>
                     <span className="value">{movie.Genre.Name}</span>
                 </div>
                 <div className="movie-director">
                   <span className="label">Director: </span>
                     <span className="value">{movie.Director.Name}</span>
                </div>
                 <Button variant="primary" onClick={() => onClick()} className="backButton">
                   Go back
                       </Button>


             </div> */}