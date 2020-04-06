import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

import { MovieCard } from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import './movies-list.scss';

//function that converts or transforms the store into props that the MoviesList component will use.
const mapStateToProps = state => {
    // extracted visibilityFilter into a prop named visibilityFilter.
    //This means that MoviesList's props contains two properties 
    const { visibilityFilter } = state;
    return { visibilityFilter };
};
//Now, you can filter the array movies based on the value present in visibilityFilter, then render the filtered array into a list of MovieCard components.

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return (
        <Container>
            <div className="movies-list">
                {/* //added it in what's returned by the component */}
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </div>

            <Row>
                {filteredMovies.map(m => <MovieCard key={m._id} movie={m} />)}
            </Row>
        </Container>
    )
}

//The MoviesList is connected to the store using the same function as before (connect()), but it only receives the first argument.
//The second one, the list of actions to bind, is implicitly null—it could be written export default connect(mapStateToProps, null)(MoviesList);.
export default connect(mapStateToProps)(MoviesList);



