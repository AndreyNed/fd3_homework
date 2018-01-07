"use strict";

import { combineReducers } from 'redux';

import rdMain from './reducers/rdMain';
import rdUI from "./reducers/rdUI";
import rdData from "./reducers/rdData";

const combinedReducer=combineReducers({
    main:   rdMain,
    data:   rdData,
    ui:     rdUI,
});

export default combinedReducer;