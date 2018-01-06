"use strict";

import { combineReducers } from 'redux';

import rdMain from './reducers/rdMain';
import rdUI from "./reducers/rdUI";

const combinedReducer=combineReducers({
    main:   rdMain,
    ui:     rdUI,
});

export default combinedReducer;