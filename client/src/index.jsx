// client/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import MainView from './components/main-view/main-view';
//imports the reducer(remember: it takes a state and an action and returns a new state)
import moviesApp from './reducers/reducers';

// Import statement to indicate that we need to bundle `./index.scss`
import './index.scss';

//create the store and wrap the entire app in a provider that comes from React Redux. 
//That way, the store will be accessible from the entire app.
const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MainView />
            </Provider>
        );
    }
}

// Find the root of our app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render our app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);