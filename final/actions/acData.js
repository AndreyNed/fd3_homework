'use strict';

const DATA_ACCOUNTS_LOAD_START =                        'DATA_ACCOUNTS_LOAD_START';
const DATA_ACCOUNTS_LOAD_SUCCESS =                      'DATA_ACCOUNTS_LOAD_SUCCESS';
const DATA_ACCOUNTS_LOAD_ERROR =                        'DATA_ACCOUNTS_LOAD_ERROR';
const DATA_ACCOUNTS_SHOULD_BE_RELOADED =                'DATA_ACCOUNTS_SHOULD_BE_RELOADED';
const DATA_ACCOUNT_SAVE_START =                         'DATA_ACCOUNT_SAVE_START';
const DATA_ACCOUNT_SAVE_SUCCESS =                       'DATA_ACCOUNT_SAVE_SUCCESS';
const DATA_ACCOUNT_SAVE_ERROR =                         'DATA_ACCOUNT_SAVE_ERROR';
const DATA_ACCOUNT_DELETE_START =                       'DATA_ACCOUNT_DELETE_START';
const DATA_ACCOUNT_DELETE_SUCCESS =                     'DATA_ACCOUNT_DELETE_SUCCESS';
const DATA_ACCOUNT_DELETE_ERROR =                       'DATA_ACCOUNT_DELETE_ERROR';
const DATA_ACCOUNT_SELECT =                             'DATA_ACCOUNT_SELECT';

const DATA_OPERATION_CATEGORIES_LOAD_START =            'DATA_OPERATION_CATEGORIES_LOAD_START';
const DATA_OPERATION_CATEGORIES_LOAD_SUCCESS =          'DATA_OPERATION_CATEGORIES_LOAD_SUCCESS';
const DATA_OPERATION_CATEGORIES_LOAD_ERROR =            'DATA_OPERATION_CATEGORIES_LOAD_ERROR';
const DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED =    'DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED';
const DATA_OPERATION_CATEGORY_SAVE_START =              'DATA_OPERATION_CATEGORY_SAVE_START';
const DATA_OPERATION_CATEGORY_SAVE_SUCCESS =            'DATA_OPERATION_CATEGORY_SAVE_SUCCESS';
const DATA_OPERATION_CATEGORY_SAVE_ERROR =              'DATA_OPERATION_CATEGORY_SAVE_ERROR';
const DATA_OPERATION_CATEGORY_DELETE_START =            'DATA_OPERATION_CATEGORY_DELETE_START';
const DATA_OPERATION_CATEGORY_DELETE_SUCCESS =          'DATA_OPERATION_CATEGORY_DELETE_SUCCESS';
const DATA_OPERATION_CATEGORY_DELETE_ERROR =            'DATA_OPERATION_CATEGORY_DELETE_ERROR';
const DATA_OPERATION_CATEGORY_SELECT =                  'DATA_OPERATION_CATEGORY_SELECT';

const DATA_OPERATIONS_LOAD_START =                      'DATA_OPERATIONS_LOAD_START';
const DATA_OPERATIONS_LOAD_SUCCESS =                    'DATA_OPERATIONS_LOAD_SUCCESS';
const DATA_OPERATIONS_LOAD_ERROR =                      'DATA_OPERATIONS_LOAD_ERROR';
const DATA_OPERATIONS_SHOULD_BE_RELOADED =              'DATA_OPERATIONS_SHOULD_BE_RELOADED';
const DATA_OPERATION_SAVE_START =                       'DATA_OPERATION_SAVE_START';
const DATA_OPERATION_SAVE_SUCCESS =                     'DATA_OPERATION_SAVE_SUCCESS';
const DATA_OPERATION_SAVE_ERROR =                       'DATA_OPERATION_SAVE_ERROR';
const DATA_OPERATION_DELETE_START =                     'DATA_OPERATION_DELETE_START';
const DATA_OPERATION_DELETE_SUCCESS =                   'DATA_OPERATION_DELETE_SUCCESS';
const DATA_OPERATION_DELETE_ERROR =                     'DATA_OPERATION_DELETE_ERROR';
const DATA_OPERATION_SELECT =                           'DATA_OPERATION_SELECT';

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

const acDataAccountSaveStart = function () {
    return {
        type:               DATA_ACCOUNT_SAVE_START,
    }
};

const acDataAccountSaveSuccess = function () {
    return {
        type:               DATA_ACCOUNT_SAVE_SUCCESS,
    }
};

const acDataAccountSaveError = function () {
    return {
        type:               DATA_ACCOUNT_SAVE_ERROR,
    }
};

const acDataAccountDeleteStart = function () {
    return {
        type:               DATA_ACCOUNT_DELETE_START,
    }
};

const acDataAccountDeleteSuccess = function () {
    return {
        type:              DATA_ACCOUNT_DELETE_SUCCESS,
    }
};

const acDataAccountDeleteError = function () {
    return {
        type:               DATA_ACCOUNT_DELETE_ERROR,
    }
};

const acDataAccountSelect = function ( index ) {
    return {
        type:               DATA_ACCOUNT_SELECT,
        accountSelectedIndex: index,
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

const acDataOperationCategorySaveStart = function () {
    return {
        type:               DATA_OPERATION_CATEGORY_SAVE_START,
    }
};

const acDataOperationCategorySaveSuccess = function () {
    return {
        type:               DATA_OPERATION_CATEGORY_SAVE_SUCCESS,
    }
};

const acDataOperationCategorySaveError = function () {
    return {
        type:               DATA_OPERATION_CATEGORY_SAVE_ERROR,
    }
};

const acDataOperationCategoryDeleteStart = function () {
    return {
        type:               DATA_OPERATION_CATEGORY_DELETE_START,
    }
};

const acDataOperationCategoryDeleteSuccess = function () {
    return {
        type:              DATA_OPERATION_CATEGORY_DELETE_SUCCESS,
    }
};

const acDataOperationCategoryDeleteError = function () {
    return {
        type:               DATA_OPERATION_CATEGORY_DELETE_ERROR,
    }
};

const acDataOperationCategorySelect = function ( index ) {
    return {
        type:                   DATA_OPERATION_CATEGORY_SELECT,
        operationCategorySelectedIndex: index,
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

const acDataOperationSaveStart = function () {
    return {
        type:               DATA_OPERATION_SAVE_START,
    }
};

const acDataOperationSaveSuccess = function () {
    return {
        type:              DATA_OPERATION_SAVE_SUCCESS,
    }
};

const acDataOperationSaveError = function () {
    return {
        type:               DATA_OPERATION_SAVE_ERROR,
    }
};

const acDataOperationDeleteStart = function () {
    return {
        type:               DATA_OPERATION_DELETE_START,
    }
};

const acDataOperationDeleteSuccess = function () {
    return {
        type:              DATA_OPERATION_DELETE_SUCCESS,
    }
};

const acDataOperationDeleteError = function () {
    return {
        type:               DATA_OPERATION_DELETE_ERROR,
    }
};

const acDataOperationSelect = function ( index ) {
    return {
        type:                   DATA_OPERATION_SELECT,
        operationSelectedIndex: index,
    }
};

export {
    DATA_ACCOUNTS_LOAD_START,           acDataAccountsLoadStart,
    DATA_ACCOUNTS_LOAD_SUCCESS,         acDataAccountsLoadSuccess,
    DATA_ACCOUNTS_LOAD_ERROR,           acDataAccountsLoadError,
    DATA_ACCOUNTS_SHOULD_BE_RELOADED,   acDataAccountsShouldBeReloaded,
    DATA_ACCOUNT_SAVE_START,            acDataAccountSaveStart,
    DATA_ACCOUNT_SAVE_SUCCESS,          acDataAccountSaveSuccess,
    DATA_ACCOUNT_SAVE_ERROR,            acDataAccountSaveError,
    DATA_ACCOUNT_DELETE_START,          acDataAccountDeleteStart,
    DATA_ACCOUNT_DELETE_SUCCESS,        acDataAccountDeleteSuccess,
    DATA_ACCOUNT_DELETE_ERROR,          acDataAccountDeleteError,
    DATA_ACCOUNT_SELECT,                acDataAccountSelect,

    DATA_OPERATION_CATEGORIES_LOAD_START,         acDataOperationCategoriesLoadStart,
    DATA_OPERATION_CATEGORIES_LOAD_SUCCESS,       acDataOperationCategoriesLoadSuccess,
    DATA_OPERATION_CATEGORIES_LOAD_ERROR,         acDataOperationCategoriesLoadError,
    DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED, acDataOperationCategoriesShouldBeReloaded,
    DATA_OPERATION_CATEGORY_SAVE_START,           acDataOperationCategorySaveStart,
    DATA_OPERATION_CATEGORY_SAVE_SUCCESS,         acDataOperationCategorySaveSuccess,
    DATA_OPERATION_CATEGORY_SAVE_ERROR,           acDataOperationCategorySaveError,
    DATA_OPERATION_CATEGORY_DELETE_START,         acDataOperationCategoryDeleteStart,
    DATA_OPERATION_CATEGORY_DELETE_SUCCESS,       acDataOperationCategoryDeleteSuccess,
    DATA_OPERATION_CATEGORY_DELETE_ERROR,         acDataOperationCategoryDeleteError,
    DATA_OPERATION_CATEGORY_SELECT,               acDataOperationCategorySelect,

    DATA_OPERATIONS_LOAD_START,         acDataOperationsLoadStart,
    DATA_OPERATIONS_LOAD_SUCCESS,       acDataOperationsLoadSuccess,
    DATA_OPERATIONS_LOAD_ERROR,         acDataOperationsLoadError,
    DATA_OPERATIONS_SHOULD_BE_RELOADED, acDataOperationsShouldBeReloaded,
    DATA_OPERATION_SAVE_START,          acDataOperationSaveStart,
    DATA_OPERATION_SAVE_SUCCESS,        acDataOperationSaveSuccess,
    DATA_OPERATION_SAVE_ERROR,          acDataOperationSaveError,
    DATA_OPERATION_DELETE_START,        acDataOperationDeleteStart,
    DATA_OPERATION_DELETE_SUCCESS,      acDataOperationDeleteSuccess,
    DATA_OPERATION_DELETE_ERROR,        acDataOperationDeleteError,

    DATA_OPERATION_SELECT,              acDataOperationSelect,
}