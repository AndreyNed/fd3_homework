'use strict';

import {
    DATA_ACCOUNTS_LOAD_START,
    DATA_ACCOUNTS_LOAD_SUCCESS,
    DATA_ACCOUNTS_LOAD_ERROR,
    DATA_ACCOUNTS_SHOULD_BE_RELOADED,
} from "../actions/acData"

const initState = {
    accountsData:           [],
    accountsLoadStatus:     0,
};

function rdData ( state = initState, action ) {
    switch ( action.type ) {

        case DATA_ACCOUNTS_LOAD_START:
            return {
                ...state, ...{
                    accountsLoadStatus: 1,
                    accountsData:       [],
                }
            };

        case DATA_ACCOUNTS_LOAD_SUCCESS:
            return {
                ...state, ...{
                    accountsLoadStatus: 2,
                    accountsData:       action.accountsData,
                }
            };

        case DATA_ACCOUNTS_LOAD_ERROR:
            return {
                ...state, ...{
                    accountsLoadStatus: 3,
                    accountsData:       [],
                }
            };

        case DATA_ACCOUNTS_SHOULD_BE_RELOADED:
            return {
                ...state, ...{
                    accountsLoadStatus: 0,
                }
            };

        default:
            return state;
    }
}

export default rdData;