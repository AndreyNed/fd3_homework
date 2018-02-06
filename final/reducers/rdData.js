'use strict';

import {
    DATA_CURRENCY_LIST_LOAD_START,
    DATA_CURRENCY_LIST_LOAD_SUCCESS,
    DATA_CURRENCY_LIST_LOAD_ERROR,
    DATA_CURRENCY_LIST_SHOULD_BE_RELOADED,
    DATA_CURRENCY_LIST_SET_DATA,
    DATA_CURRENCY_LIST_SAVE_START,
    DATA_CURRENCY_LIST_SAVE_SUCCESS,
    DATA_CURRENCY_LIST_SAVE_ERROR,
    DATA_CURRENCY_LIST_DELETE_START,
    DATA_CURRENCY_LIST_DELETE_SUCCESS,
    DATA_CURRENCY_LIST_DELETE_ERROR,
    DATA_CURRENCY_LIST_SELECT,

    DATA_ACCOUNTS_LOAD_START,
    DATA_ACCOUNTS_LOAD_SUCCESS,
    DATA_ACCOUNTS_LOAD_ERROR,
    DATA_ACCOUNTS_SHOULD_BE_RELOADED,
    DATA_ACCOUNTS_SET_ACCOUNTS_DATA,
    DATA_ACCOUNT_SAVE_START,
    DATA_ACCOUNT_SAVE_SUCCESS,
    DATA_ACCOUNT_SAVE_ERROR,
    DATA_ACCOUNT_DELETE_START,
    DATA_ACCOUNT_DELETE_SUCCESS,
    DATA_ACCOUNT_DELETE_ERROR,
    DATA_ACCOUNT_SELECT,
    DATA_ACCOUNT_SET_FILTERS,

    DATA_OPERATION_CATEGORIES_LOAD_START,
    DATA_OPERATION_CATEGORIES_LOAD_SUCCESS,
    DATA_OPERATION_CATEGORIES_LOAD_ERROR,
    DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED,
    DATA_SET_OPERATION_CATEGORIES_DATA,
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
    DATA_OPERATIONS_SET_OPERATIONS_DATA,
    DATA_OPERATION_SAVE_START,
    DATA_OPERATION_SAVE_SUCCESS,
    DATA_OPERATION_SAVE_ERROR,
    DATA_OPERATION_DELETE_START,
    DATA_OPERATION_DELETE_SUCCESS,
    DATA_OPERATION_DELETE_ERROR,
    DATA_OPERATION_SELECT,
} from "../actions/acData";

const initState = {
    currencyListSource:             null,
    currencyListData:               null,
    currencyListLoadStatus:         0,
    currencyListPrepareStatus:      0,
    currencyListSaveStatus:         0,
    currencyListDeleteStatus:       0,
    currencyListSelectedIndex:      -1,
    currencyListValue:              {},

    accountsSource:                 null,
    accountsData:                   null,
    accountsLoadStatus:             0,
    accountsPrepareStatus:          0,
    accountSaveStatus:              0,
    accountCreateStatus:            0,
    accountDeleteStatus:            0,
    accountSelectedIndex:           -1,
    accountValue:                   {},
    accountFilters:                 {
        dateStart:     null,
        dateEnd:       null,
        categories:    null,
        accounts:      null,
    },

    operationCategoriesSource:      null,
    operationCategoriesData:        null,
    operationCategoriesLoadStatus:  0,
    operationCategoriesPrepareStatus: 0,
    operationCategorySaveStatus:    0,
    operationCategoryCreateStatus:  0,
    operationCategoryDeleteStatus:  0,
    operationCategorySelectedIndex: -1,
    operationCategoryValue:         {},

    operationsSource:               null,
    operationsData:                 null,
    operationsLoadStatus:           0,
    operationsPrepareStatus:        0,
    operationSaveStatus:            0,
    operationCreateStatus:          0,
    operationDeleteStatus:          0,
    operationSelectedIndex:         -1,
    operationValue:                 {},
};

function rdData ( state = initState, action ) {
    switch ( action.type ) {

        case DATA_CURRENCY_LIST_LOAD_START:
            return {
                ...state, ...{
                    currencyListLoadStatus: 1,
                    currencyListSource:     [],
                }
            };

        case DATA_CURRENCY_LIST_LOAD_SUCCESS:
            return {
                ...state, ...{
                    currencyListLoadStatus:    2,
                    currencyListSource:        action.currencyListSource,
                    currencyListPrepareStatus: 0,
                    currencyListData:          [],
                }
            };

        case DATA_CURRENCY_LIST_LOAD_ERROR:
            return {
                ...state, ...{
                    currencyListLoadStatus: 3,
                    currencyListSource:     [],
                }
            };

        case DATA_CURRENCY_LIST_SHOULD_BE_RELOADED:
            return {
                ...state, ...{
                    currencyListLoadStatus:   0,
                    currencyListSaveStatus:   0,
                    currencyListDeleteStatus: 0,
                }
            };

        case DATA_CURRENCY_LIST_SET_DATA:
            return {
                ...state, ...{
                    currencyListPrepareStatus: 2,
                    currencyListData:          action.currencyListData,
                }
            };

        case DATA_CURRENCY_LIST_SELECT:
            return {
                ...state, ...{
                    currencyListSelectedIndex: action.currencyListSelectedIndex,
                }
            };

        case DATA_CURRENCY_LIST_SAVE_START:
            return {
                ...state, ...{
                    currencyListSaveStatus:    1,
                }
            };

        case DATA_CURRENCY_LIST_SAVE_SUCCESS:
            return {
                ...state, ...{
                    currencyListSaveStatus:    2,
                }
            };

        case DATA_CURRENCY_LIST_SAVE_ERROR:
            return {
                ...state, ...{
                    currencyListSaveStatus:    3,
                }
            };

        case DATA_CURRENCY_LIST_DELETE_START:
            return {
                ...state, ...{
                    currencyListDeleteStatus:  1,
                }
            };

        case DATA_CURRENCY_LIST_DELETE_SUCCESS:
            return {
                ...state, ...{
                    currencyListDeleteStatus:   2,
                    currencyListSelectedIndex: -1,
                }
            };

        case DATA_CURRENCY_LIST_DELETE_ERROR:
            return {
                ...state, ...{
                    currencyListDeleteStatus:  3,
                    currencyListSelectedIndex: -1,
                }
            };

        case DATA_ACCOUNTS_LOAD_START:
            return {
                ...state, ...{
                    accountsLoadStatus: 1,
                    accountsSource:     [],
                }
            };

        case DATA_ACCOUNTS_LOAD_SUCCESS:
            return {
                ...state, ...{
                    accountsLoadStatus:    2,
                    accountsSource:        action.accountsSource,
                    accountsPrepareStatus: 0,
                    accountsData:          [],
                }
            };

        case DATA_ACCOUNTS_LOAD_ERROR:
            return {
                ...state, ...{
                    accountsLoadStatus: 3,
                    accountsSource:     [],
                }
            };

        case DATA_ACCOUNTS_SHOULD_BE_RELOADED:
            return {
                ...state, ...{
                    accountsLoadStatus:   0,
                    accountSaveStatus:    0,
                    accountDeleteStatus:  0,
                }
            };

        case DATA_ACCOUNTS_SET_ACCOUNTS_DATA:
            return {
                ...state, ...{
                    accountsPrepareStatus: 2,
                    accountsData:          action.accountsData,
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

        case DATA_ACCOUNT_SET_FILTERS:
            return {
                ...state, ...{
                    accountFilters: action.accountFilters,
                }
            };

        case DATA_OPERATION_CATEGORIES_LOAD_START:
            return {
                ...state, ...{
                    operationCategoriesLoadStatus: 1,
                    operationCategoriesSource:     [],
                }
            };

        case DATA_OPERATION_CATEGORIES_LOAD_SUCCESS:
            return {
                ...state, ...{
                    operationCategoriesLoadStatus: 2,
                    operationCategoriesSource:     action.operationCategoriesSource,
                    operationCategoriesPrepareStatus: 0,
                    operationCategoriesData:          [],
                }
            };

        case DATA_OPERATION_CATEGORIES_LOAD_ERROR:
            return {
                ...state, ...{
                    operationCategoriesLoadStatus: 3,
                    operationCategoriesSource:     [],
                }
            };

        case DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED:
            return {
                ...state, ...{
                    operationCategoriesLoadStatus: 0,
                    operationCategorySaveStatus:   0,
                    operationCategoryDeleteStatus: 0,
                }
            };

        case DATA_OPERATION_CATEGORY_SAVE_START:
            return {
                ...state, ...{
                    operationCategorySaveStatus: 1,
                }
            };
        case DATA_OPERATION_CATEGORY_SAVE_SUCCESS:
            return {
                ...state, ...{
                    operationCategorySaveStatus: 2,
                }
            };
        case DATA_OPERATION_CATEGORY_SAVE_ERROR:
            return {
                ...state, ...{
                    operationCategorySaveStatus: 3,
                }
            };
        case DATA_OPERATION_CATEGORY_DELETE_START:
            return {
                ...state, ...{
                    operationCategoryDeleteStatus: 1,
                }
            };
        case DATA_OPERATION_CATEGORY_DELETE_SUCCESS:
            return {
                ...state, ...{
                    operationCategoryDeleteStatus:  2,
                    operationCategorySelectedIndex: -1,
                }
            };
        case DATA_OPERATION_CATEGORY_DELETE_ERROR:
            return {
                ...state, ...{
                    operationCategoryDeleteStatus:  3,
                    operationCategorySelectedIndex: -1,
                }
            };

        case DATA_SET_OPERATION_CATEGORIES_DATA:
            return {
                ...state, ...{
                    operationCategoriesPrepareStatus: 2,
                    operationCategoriesData:          action.operationCategoriesData,
                }
            };

        case DATA_OPERATION_CATEGORY_SELECT:
            return {
                ...state, ...{
                    operationCategorySelectedIndex: action.operationCategorySelectedIndex,
                }
            };

        case DATA_OPERATIONS_LOAD_START:
            return {
                ...state, ...{
                    operationsLoadStatus: 1,
                    operationsSource:     [],
                }
            };

        case DATA_OPERATIONS_LOAD_SUCCESS:
            return {
                ...state, ...{
                    operationsLoadStatus:    2,
                    operationsSource:        action.operationsSource,
                    operationsPrepareStatus: 0,
                    operationsData:          [],
                }
            };

        case DATA_OPERATIONS_LOAD_ERROR:
            return {
                ...state, ...{
                    operationsLoadStatus: 3,
                    operationsSource:     [],
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

        case DATA_OPERATIONS_SET_OPERATIONS_DATA:
            return {
                ...state, ...{
                    operationsData:          action.operationsData,
                    operationsPrepareStatus: 2,
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