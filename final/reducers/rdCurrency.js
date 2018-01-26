'use strict';

import {
    CURRENCY_LOAD_START,
    CURRENCY_LOAD_SUCCESS,
    CURRENCY_LOAD_ERROR,
    CURRENCY_SHOULD_BE_RELOADED,

    CURRENCY_SELECT,
    CURRENCY_SET_CURRENCY_DATA,

    CURRENCY_DYNAMIC_LOAD_START,
    CURRENCY_DYNAMIC_LOAD_SUCCESS,
    CURRENCY_DYNAMIC_LOAD_ERROR,
    CURRENCY_DYNAMIC_SHOULD_BE_RELOADED,

    CURRENCY_DYNAMIC_SELECT,
    CURRENCY_DYNAMIC_SET_CURRENCY_DATA,
} from "../actions/acCurrency";

const initState = {
    currencySource:                 null,
    currencyData:                   null,
    currencyLoadStatus:             0,
    currencyPrepareStatus:          0,
    currencySelectedIndex:          -1,
    currencyValue:                  {},

    currencyDynamicSource:          null,
    currencyDynamicData:            null,
    currencyDynamicLoadStatus:      0,
    currencyDynamicPrepareStatus:   0,
    currencyDynamicStartDate:       null,
    currencyDynamicEndDate:         null,
    currencyDynamicSelectedIndex:   -1,
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

        case CURRENCY_DYNAMIC_LOAD_START:
            return {
                ...state, ...{
                    currencyDynamicLoadStatus: 1,
                    currencyDynamicSource:     [],
                }
            };

        case CURRENCY_DYNAMIC_LOAD_SUCCESS:
            return {
                ...state, ...{
                    currencyDynamicLoadStatus:    2,
                    currencyDynamicSource:        action.currencyDynamicSource,
                    currencyDynamicPrepareStatus: 0,
                    currencyDynamicData:          [],
                }
            };

        case CURRENCY_DYNAMIC_LOAD_ERROR:
            return {
                ...state, ...{
                    currencyDynamicLoadStatus: 3,
                    currencyDynamicSource:     [],
                }
            };

        case CURRENCY_DYNAMIC_SHOULD_BE_RELOADED:
            return {
                ...state, ...{
                    currencyDynamicLoadStatus:   0,
                }
            };

        case CURRENCY_DYNAMIC_SET_CURRENCY_DATA:
            return {
                ...state, ...{
                    currencyDynamicPrepareStatus: 2,
                    currencyDynamicData:          action.currencyDynamicData,
                }
            };

        case CURRENCY_DYNAMIC_SELECT:
            return {
                ...state, ...{
                    currencyDynamicSelectedIndex: action.currencyDynamicSelectedIndex,
                }
            };

        default:
            return state;
    }
}

export default rdCurrency;