'use strict';

require('es6-promise').polyfill();

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore }   from 'redux';
import { Provider }      from 'react-redux';
import combinedReducer   from './reducers'

import PagesRouter from './pages/PagesRouter';
import PagesLinks  from './pages/PagesLinks';

import './App.scss';

let store = createStore( combinedReducer );

class App extends React.PureComponent {

    classCSS = 'App';

    render() {
        let state = store.getState();
        return (
            <BrowserRouter>
                <div className = { this.classCSS }>
                    <PagesLinks />
                    <PagesRouter />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;