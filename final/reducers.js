"use strict";

import { combineReducers } from 'redux';

import rdMain from './reducers/rdMain';

const combinedReducer=combineReducers({
    main: rdMain
});

export default combinedReducer;