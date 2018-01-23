'use strict';
import 'babel-polyfill';
// require('es6-promise').polyfill();

import React from 'react';
import Loader from './components/loader/Loader';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import combinedReducer from './reducers'

import './App.scss';

let store = createStore( combinedReducer, composeWithDevTools( applyMiddleware( thunk ) ) );

class App extends React.PureComponent {

    classCSS = 'App';

    render() {
        // let state = store.getState();
        return (
            <Provider store = { store }>
                <Loader />
            </Provider>
        )
    }
}

export default App;