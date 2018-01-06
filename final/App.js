'use strict';

require('es6-promise').polyfill();

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import combinedReducer from './reducers'

import PagesRouter from './pages/PagesRouter';
import PagesLinks  from './pages/PagesLinks';

import './App.scss';

let store = createStore( combinedReducer, composeWithDevTools( applyMiddleware( thunk ) ) );

class App extends React.PureComponent {

    classCSS = 'App';

    render() {
        let state = store.getState();
        return (
            <Provider store = { store }>
                <BrowserRouter>
                    <div className = { this.classCSS }>
                        <PagesLinks />
                        <PagesRouter />
                    </div>
                </BrowserRouter>
            </Provider>

        )
    }
}

export default App;