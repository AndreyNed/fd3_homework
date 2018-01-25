'use strict';

import {
    CURRENCY_LOAD_START,
    CURRENCY_LOAD_SUCCESS,
    CURRENCY_LOAD_ERROR,
    CURRENCY_SHOULD_BE_RELOADED,

    CURRENCY_SELECT,
    CURRENCY_SET_CURRENCY_DATA,
} from "../actions/acCurrency";

const initState = {
    currencySource:                 null,
    currencyData:                   null,
    currencyLoadStatus:             0,
    currencyPrepareStatus:          0,
    currencySelectedIndex:          -1,
    currencyValue:                  {},
};

function rdCurrency ( state = initState, action ) {
    switch ( action.type ) {

        case CURRENCY_LOAD_START:
            return {
                ...state, ...{
                    currencyLoadStatus: 1,
                    currencySource:     [],
                }
            };

        case CURRENCY_LOAD_SUCCESS:
            return {
                ...state, ...{
                    currencyLoadStatus:    2,
                    currencySaveStatus:    0,
                    currencySource:        action.currencySource,
                    currencyPrepareStatus: 0,
                    currencyData:          [],
                }
            };

        case CURRENCY_LOAD_ERROR:
            return {
                ...state, ...{
                    currencyLoadStatus: 3,
                    currencySource:     [],
                }
            };

        case CURRENCY_SHOULD_BE_RELOADED:
            return {
                ...state, ...{
                    currencyLoadStatus:   0,
                    currencySaveStatus:   0,
                }
            };

        case CURRENCY_SET_CURRENCY_DATA:
            return {
                ...state, ...{
                    currencyPrepareStatus: 2,
                    currencyData:          action.currencyData,
                }
            };

        case CURRENCY_SELECT:
            return {
                ...state, ...{
                    currencySelectedIndex: action.currencySelectedIndex,
                }
            };

        default:
            return state;
    }
}

export default rdCurrency;