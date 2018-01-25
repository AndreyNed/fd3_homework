"use strict";

import { combineReducers } from 'redux';

import rdMain from './reducers/rdMain';
import rdUI from "./reducers/rdUI";
import rdData from "./reducers/rdData";
import rdCurrency from "./reducers/rdCurrency";

const combinedReducer=combineReducers({
    main:       rdMain,
    data:       rdData,
    ui:         rdUI,
    currency:   rdCurrency,
});

export default combinedReducer;