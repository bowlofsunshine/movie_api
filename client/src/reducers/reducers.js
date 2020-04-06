import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

//its signature, or identity card
//Every time an action is dispatched, this reducer will be called, and it’s responsible for addressing the action or not
function visibilityFilter(state = '', action) {
    //This syntax states that if the given action is unrelated to the reducer, then it should return whatever state it's been given
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

//The function above is a reducer

//Here, giving a default value to the state parameter is handy (state = '', action); if state were to be undefined and the 
//action out of scope for a reducer (in the visibilityFilter reducer, if the action wasn’t SET_FILTER), the reducer would 
//return whatever it was passed as the visibilityFilter state, in this case, an empty string ''. Setting defaults in this 
//way is essential for any reducer. A reducer must always return a state, even if there have been no changes — in which case, 
//the reducer must accept and return the same, existing state:

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}
//combined reducer
//It groups all the reducers together and only passes them the state that they care about: the 
//filter for the first reducer and the movies for the last one.
function moviesApp(state = {}, action) {
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        movies: movies(state.movies, action)
    }
}
//moviesApp is a combined reducer (a reducer made out of other reducers). In order to keep the code clean, it splits into two 
//smaller reducers. This pattern is so common that Redux comes with a built-in function to implement it:


//Here's what the code should look like when the combineReducers function is used:


// const moviesApp = combineReducers({
//     visibilityFilter, movies
// });

export default moviesApp;