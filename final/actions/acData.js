'use strict';

const DATA_ACCOUNTS_LOAD_START =                        'DATA_ACCOUNTS_LOAD_START';
const DATA_ACCOUNTS_LOAD_SUCCESS =                      'DATA_ACCOUNTS_LOAD_SUCCESS';
const DATA_ACCOUNTS_LOAD_ERROR =                        'DATA_ACCOUNTS_LOAD_ERROR';
const DATA_ACCOUNTS_SHOULD_BE_RELOADED =                'DATA_ACCOUNTS_SHOULD_BE_RELOADED';

const DATA_OPERATION_CATEGORIES_LOAD_START =            'DATA_OPERATION_CATEGORIES_LOAD_START';
const DATA_OPERATION_CATEGORIES_LOAD_SUCCESS =          'DATA_OPERATION_CATEGORIES_LOAD_SUCCESS';
const DATA_OPERATION_CATEGORIES_LOAD_ERROR =            'DATA_OPERATION_CATEGORIES_LOAD_ERROR';
const DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED =    'DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED';

const DATA_OPERATIONS_LOAD_START =                      'DATA_OPERATIONS_LOAD_START';
const DATA_OPERATIONS_LOAD_SUCCESS =                    'DATA_OPERATIONS_LOAD_SUCCESS';
const DATA_OPERATIONS_LOAD_ERROR =                      'DATA_OPERATIONS_LOAD_ERROR';
const DATA_OPERATIONS_SHOULD_BE_RELOADED =              'DATA_OPERATIONS_SHOULD_BE_RELOADED';

const acDataAccountsLoadStart = function () {
    return {
        type:               DATA_ACCOUNTS_LOAD_START,
    }
};

const acDataAccountsLoadSuccess = function ( loadedData ) {
    return {
        type:               DATA_ACCOUNTS_LOAD_SUCCESS,
        accountsData:       loadedData,
    }
};

const acDataAccountsLoadError = function () {
    return {
        type:               DATA_ACCOUNTS_LOAD_ERROR,
    }
};

const acDataAccountsShouldBeReloaded = function () {
    return {
        type:               DATA_ACCOUNTS_SHOULD_BE_RELOADED,
    }
};

const acDataOperationCategoriesLoadStart = function () {
    return {
        type:               DATA_OPERATION_CATEGORIES_LOAD_START,
    }
};

const acDataOperationCategoriesLoadSuccess = function ( loadedData ) {
    return {
        type:                       DATA_OPERATION_CATEGORIES_LOAD_SUCCESS,
        operationCategoriesData:    loadedData,
    }
};

const acDataOperationCategoriesLoadError = function () {
    return {
        type:               DATA_OPERATION_CATEGORIES_LOAD_ERROR,
    }
};

const acDataOperationCategoriesShouldBeReloaded = function () {
    return {
        type:               DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED,
    }
};

const acDataOperationsLoadStart = function () {
    return {
        type:               DATA_OPERATIONS_LOAD_START,
    }
};

const acDataOperationsLoadSuccess = function ( loadedData ) {
    return {
        type:              DATA_OPERATIONS_LOAD_SUCCESS,
        operationsData:    loadedData,
    }
};

const acDataOperationsLoadError = function () {
    return {
        type:               DATA_OPERATIONS_LOAD_ERROR,
    }
};

const acDataOperationsShouldBeReloaded = function () {
    return {
        type:               DATA_OPERATIONS_SHOULD_BE_RELOADED,
    }
};

export {
    DATA_ACCOUNTS_LOAD_START,           acDataAccountsLoadStart,
    DATA_ACCOUNTS_LOAD_SUCCESS,         acDataAccountsLoadSuccess,
    DATA_ACCOUNTS_LOAD_ERROR,           acDataAccountsLoadError,
    DATA_ACCOUNTS_SHOULD_BE_RELOADED,   acDataAccountsShouldBeReloaded,

    DATA_OPERATION_CATEGORIES_LOAD_START,         acDataOperationCategoriesLoadStart,
    DATA_OPERATION_CATEGORIES_LOAD_SUCCESS,       acDataOperationCategoriesLoadSuccess,
    DATA_OPERATION_CATEGORIES_LOAD_ERROR,         acDataOperationCategoriesLoadError,
    DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED, acDataOperationCategoriesShouldBeReloaded,

    DATA_OPERATIONS_LOAD_START,         acDataOperationsLoadStart,
    DATA_OPERATIONS_LOAD_SUCCESS,       acDataOperationsLoadSuccess,
    DATA_OPERATIONS_LOAD_ERROR,         acDataOperationsLoadError,
    DATA_OPERATIONS_SHOULD_BE_RELOADED, acDataOperationsShouldBeReloaded,
}