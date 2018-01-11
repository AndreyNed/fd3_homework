'use strict';

import {
    DATA_ACCOUNTS_LOAD_START,
    DATA_ACCOUNTS_LOAD_SUCCESS,
    DATA_ACCOUNTS_LOAD_ERROR,
    DATA_ACCOUNTS_SHOULD_BE_RELOADED,
    DATA_OPERATION_CATEGORIES_LOAD_START,
    DATA_OPERATION_CATEGORIES_LOAD_SUCCESS,
    DATA_OPERATION_CATEGORIES_LOAD_ERROR,
    DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED,
    DATA_OPERATIONS_LOAD_START,
    DATA_OPERATIONS_LOAD_SUCCESS,
    DATA_OPERATIONS_LOAD_ERROR,
    DATA_OPERATIONS_SHOULD_BE_RELOADED,
    DATA_OPERATION_SELECT,
} from "../actions/acData"

const initState = {
    accountsData:                   [],
    accountsLoadStatus:             0,

    operationCategoriesData:        [],
    operationCategoriesLoadStatus:  0,

    operationsData:                 [],
    operationsLoadStatus:           0,
    operationSelectedIndex:         -1,
    operationValue:                 {},
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

        case DATA_OPERATION_CATEGORIES_LOAD_START:
            return {
                ...state, ...{
                    operationCategoriesLoadStatus: 1,
                    operationCategoriesData:       [],
                }
            };

        case DATA_OPERATION_CATEGORIES_LOAD_SUCCESS:
            return {
                ...state, ...{
                    operationCategoriesLoadStatus: 2,
                    operationCategoriesData:       action.operationCategoriesData,
                }
            };

        case DATA_OPERATION_CATEGORIES_LOAD_ERROR:
            return {
                ...state, ...{
                    operationCategoriesLoadStatus: 3,
                    operationCategoriesData:       [],
                }
            };

        case DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED:
            return {
                ...state, ...{
                    operationCategoriesLoadStatus: 0,
                }
            };

        case DATA_OPERATIONS_LOAD_START:
            return {
                ...state, ...{
                    operationsLoadStatus: 1,
                    operationsData:       [],
                }
            };

        case DATA_OPERATIONS_LOAD_SUCCESS:
            return {
                ...state, ...{
                    operationsLoadStatus: 2,
                    operationsData:       action.operationsData,
                }
            };

        case DATA_OPERATIONS_LOAD_ERROR:
            return {
                ...state, ...{
                    operationsLoadStatus: 3,
                    operationsData:       [],
                }
            };

        case DATA_OPERATIONS_SHOULD_BE_RELOADED:
            return {
                ...state, ...{
                    operationsLoadStatus: 0,
                }
            };

        case DATA_OPERATION_SELECT:
            return {
                ...state, ...{
                    operationSelectedIndex: action.operationSelectedIndex,
                }
            };

        default:
            return state;
    }
}

export default rdData;