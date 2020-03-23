import React from 'react';
import axios from 'axios';

class MainView extends React.Component {
    constructor() {
        // call the superclass constructor so react can initialize it 
        super();

        //initialize the state to an empty object so we can destructure it later
        this.state = {};
    }

    //this overrides the rendure() method of the superclass, no need to call super() though, as it does nothing by default 
    render() {
        return (
            <div className="main-view"></div>
        );
    }
}
