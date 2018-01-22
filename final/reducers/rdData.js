'use strict';

import {
    DATA_ACCOUNTS_LOAD_START,
    DATA_ACCOUNTS_LOAD_SUCCESS,
    DATA_ACCOUNTS_LOAD_ERROR,
    DATA_ACCOUNTS_SHOULD_BE_RELOADED,
    DATA_ACCOUNT_SAVE_START,
    DATA_ACCOUNT_SAVE_SUCCESS,
    DATA_ACCOUNT_SAVE_ERROR,
    DATA_ACCOUNT_DELETE_START,
    DATA_ACCOUNT_DELETE_SUCCESS,
    DATA_ACCOUNT_DELETE_ERROR,
    DATA_ACCOUNT_SELECT,
    DATA_OPERATION_CATEGORIES_LOAD_START,
    DATA_OPERATION_CATEGORIES_LOAD_SUCCESS,
    DATA_OPERATION_CATEGORIES_LOAD_ERROR,
    DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED,
    DATA_OPERATION_CATEGORY_SAVE_START,
    DATA_OPERATION_CATEGORY_SAVE_SUCCESS,
    DATA_OPERATION_CATEGORY_SAVE_ERROR,
    DATA_OPERATION_CATEGORY_DELETE_START,
    DATA_OPERATION_CATEGORY_DELETE_SUCCESS,
    DATA_OPERATION_CATEGORY_DELETE_ERROR,
    DATA_OPERATION_CATEGORY_SELECT,
    DATA_OPERATIONS_LOAD_START,
    DATA_OPERATIONS_LOAD_SUCCESS,
    DATA_OPERATIONS_LOAD_ERROR,
    DATA_OPERATIONS_SHOULD_BE_RELOADED,
    DATA_OPERATION_SAVE_START,
    DATA_OPERATION_SAVE_SUCCESS,
    DATA_OPERATION_SAVE_ERROR,
    DATA_OPERATION_DELETE_START,
    DATA_OPERATION_DELETE_SUCCESS,
    DATA_OPERATION_DELETE_ERROR,
    DATA_OPERATION_SELECT,
} from "../actions/acData";

const initState = {
    accountsData:                   null,
    accountsLoadStatus:             0,
    accountSaveStatus:              0,
    accountCreateStatus:            0,
    accountDeleteStatus:            0,
    accountSelectedIndex:           -1,
    accountValue:                   {},

    operationCategoriesData:        null,
    operationCategoriesLoadStatus:  0,
    operationCategorySaveStatus:    0,
    operationCategoryCreateStatus:  0,
    operationCategoryDeleteStatus:  0,
    operationCategorySelectedIndex: -1,
    operationCategoryValue:         {},

    operationsData:                 null,
    operationsLoadStatus:           0,
    operationSaveStatus:            0,
    operationCreateStatus:          0,
    operationDeleteStatus:          0,
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

        case DATA_ACCOUNT_SAVE_START:
            return {
                ...state, ...{
                    accountSaveStatus:    1,
                }
            };

        case DATA_ACCOUNT_SAVE_SUCCESS:
            return {
                ...state, ...{
                    accountSaveStatus:    2,
                }
            };

        case DATA_ACCOUNT_SAVE_ERROR:
            return {
                ...state, ...{
                    accountSaveStatus:    3,
                }
            };

        case DATA_ACCOUNT_DELETE_START:
            return {
                ...state, ...{
                    accountDeleteStatus:  1,
                }
            };

        case DATA_ACCOUNT_DELETE_SUCCESS:
            return {
                ...state, ...{
                    accountDeleteStatus:  2,
                    accountSelectedIndex: -1,
                }
            };

        case DATA_ACCOUNT_DELETE_ERROR:
            return {
                ...state, ...{
                    accountDeleteStatus:  3,
                    accountSelectedIndex: -1,
                }
            };

        case DATA_ACCOUNT_SELECT:
            return {
                ...state, ...{
                    accountSelectedIndex: action.accountSelectedIndex,
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
                    operationsLoadStatus:  0,
                    operationSaveStatus:   0,
                    operationDeleteStatus: 0,
                }
            };

        case DATA_OPERATION_CATEGORY_SELECT:
            return {
                ...state, ...{
                    operationCategorySelectedIndex: action.operationCategorySelectedIndex,
                }
            };

        case DATA_OPERATION_SAVE_START:
            return {
            ...state, ...{
                operationSaveStatus:    1,
            }
        };

        case DATA_OPERATION_SAVE_SUCCESS:
            return {
                ...state, ...{
                    operationSaveStatus:    2,
                }
            };

        case DATA_OPERATION_SAVE_ERROR:
            return {
                ...state, ...{
                    operationSaveStatus:    3,
                }
            };

        case DATA_OPERATION_DELETE_START:
            return {
                ...state, ...{
                    operationDeleteStatus:  1,
                }
            };

        case DATA_OPERATION_DELETE_SUCCESS:
            return {
                ...state, ...{
                    operationDeleteStatus:  2,
                    operationSelectedIndex: -1,
                }
            };

        case DATA_OPERATION_DELETE_ERROR:
            return {
                ...state, ...{
                    operationDeleteStatus:  3,
                    operationSelectedIndex: -1,
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