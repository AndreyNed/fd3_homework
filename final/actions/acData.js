'use strict';

const DATA_CURRENCY_LIST_LOAD_START =                   'DATA_CURRENCY_LIST_LOAD_START';
const DATA_CURRENCY_LIST_LOAD_SUCCESS =                 'DATA_CURRENCY_LIST_LOAD_SUCCESS';
const DATA_CURRENCY_LIST_LOAD_ERROR =                   'DATA_CURRENCY_LIST_LOAD_ERROR';
const DATA_CURRENCY_LIST_SHOULD_BE_RELOADED =           'DATA_CURRENCY_LIST_SHOULD_BE_RELOADED';
const DATA_CURRENCY_LIST_SET_DATA =                     'DATA_CURRENCY_LIST_SET_DATA';
const DATA_CURRENCY_LIST_SAVE_START =                   'DATA_CURRENCY_LIST_SAVE_START';
const DATA_CURRENCY_LIST_SAVE_SUCCESS =                 'DATA_CURRENCY_LIST_SAVE_SUCCESS';
const DATA_CURRENCY_LIST_SAVE_ERROR =                   'DATA_CURRENCY_LIST_SAVE_ERROR';
const DATA_CURRENCY_LIST_DELETE_START =                 'DATA_CURRENCY_LIST_DELETE_START';
const DATA_CURRENCY_LIST_DELETE_SUCCESS =               'DATA_CURRENCY_LIST_DELETE_SUCCESS';
const DATA_CURRENCY_LIST_DELETE_ERROR =                 'DATA_CURRENCY_LIST_DELETE_ERROR';
const DATA_CURRENCY_LIST_SELECT =                       'DATA_CURRENCY_LIST_SELECT';

const DATA_ACCOUNTS_LOAD_START =                        'DATA_ACCOUNTS_LOAD_START';
const DATA_ACCOUNTS_LOAD_SUCCESS =                      'DATA_ACCOUNTS_LOAD_SUCCESS';
const DATA_ACCOUNTS_LOAD_ERROR =                        'DATA_ACCOUNTS_LOAD_ERROR';
const DATA_ACCOUNTS_SHOULD_BE_RELOADED =                'DATA_ACCOUNTS_SHOULD_BE_RELOADED';
const DATA_ACCOUNTS_SET_ACCOUNTS_DATA =                 'DATA_ACCOUNTS_SET_ACCOUNTS_DATA';
const DATA_ACCOUNT_SAVE_START =                         'DATA_ACCOUNT_SAVE_START';
const DATA_ACCOUNT_SAVE_SUCCESS =                       'DATA_ACCOUNT_SAVE_SUCCESS';
const DATA_ACCOUNT_SAVE_ERROR =                         'DATA_ACCOUNT_SAVE_ERROR';
const DATA_ACCOUNT_DELETE_START =                       'DATA_ACCOUNT_DELETE_START';
const DATA_ACCOUNT_DELETE_SUCCESS =                     'DATA_ACCOUNT_DELETE_SUCCESS';
const DATA_ACCOUNT_DELETE_ERROR =                       'DATA_ACCOUNT_DELETE_ERROR';
const DATA_ACCOUNT_SELECT =                             'DATA_ACCOUNT_SELECT';
const DATA_ACCOUNT_SET_FILTERS =                        'DATA_ACCOUNT_SET_FILTERS';

const DATA_OPERATION_CATEGORIES_LOAD_START =            'DATA_OPERATION_CATEGORIES_LOAD_START';
const DATA_OPERATION_CATEGORIES_LOAD_SUCCESS =          'DATA_OPERATION_CATEGORIES_LOAD_SUCCESS';
const DATA_OPERATION_CATEGORIES_LOAD_ERROR =            'DATA_OPERATION_CATEGORIES_LOAD_ERROR';
const DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED =    'DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED';
const DATA_SET_OPERATION_CATEGORIES_DATA = 'DATA_SET_OPERATION_CATEGORIES_DATA';
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
const DATA_OPERATIONS_SET_OPERATIONS_DATA =             'DATA_OPERATIONS_SET_OPERATIONS_DATA';
const DATA_OPERATION_SAVE_START =                       'DATA_OPERATION_SAVE_START';
const DATA_OPERATION_SAVE_SUCCESS =                     'DATA_OPERATION_SAVE_SUCCESS';
const DATA_OPERATION_SAVE_ERROR =                       'DATA_OPERATION_SAVE_ERROR';
const DATA_OPERATION_DELETE_START =                     'DATA_OPERATION_DELETE_START';
const DATA_OPERATION_DELETE_SUCCESS =                   'DATA_OPERATION_DELETE_SUCCESS';
const DATA_OPERATION_DELETE_ERROR =                     'DATA_OPERATION_DELETE_ERROR';
const DATA_OPERATION_SELECT =                           'DATA_OPERATION_SELECT';

const acDataCurrencyListLoadStart = function () {
    return {
        type:               DATA_CURRENCY_LIST_LOAD_START,
    }
};

const acDataCurrencyListLoadSuccess = function ( loadedData ) {
    return {
        type:               DATA_CURRENCY_LIST_LOAD_SUCCESS,
        currencyListSource: loadedData,
    }
};

const acDataCurrencyListLoadError = function () {
    return {
        type:               DATA_CURRENCY_LIST_LOAD_ERROR,
    }
};

const acDataCurrencyListShouldBeReloaded = function () {
    return {
        type:               DATA_CURRENCY_LIST_SHOULD_BE_RELOADED,
    }
};

const acDataCurrencyListSetData = function ( currencyListData ) {
    return {
        type:               DATA_CURRENCY_LIST_SET_DATA,
        currencyListData:   currencyListData,
    }
};

const acDataCurrencyListSaveStart = function () {
    return {
        type:               DATA_CURRENCY_LIST_SAVE_START,
    }
};

const acDataCurrencyListSaveSuccess = function () {
    return {
        type:               DATA_CURRENCY_LIST_SAVE_SUCCESS,
    }
};

const acDataCurrencyListSaveError = function () {
    return {
        type:               DATA_CURRENCY_LIST_SAVE_ERROR,
    }
};

const acDataCurrencyListDeleteStart = function () {
    return {
        type:               DATA_CURRENCY_LIST_DELETE_START,
    }
};

const acDataCurrencyListDeleteSuccess = function () {
    return {
        type:               DATA_CURRENCY_LIST_DELETE_SUCCESS,
    }
};

const acDataCurrencyListDeleteError = function () {
    return {
        type:               DATA_CURRENCY_LIST_DELETE_ERROR,
    }
};

const acDataCurrencyListSelect = function ( index ) {
    return {
        type:                      DATA_CURRENCY_LIST_SELECT,
        currencyListSelectedIndex: index,
    }
};

const acDataAccountsLoadStart = function () {
    return {
        type:               DATA_ACCOUNTS_LOAD_START,
    }
};

const acDataAccountsLoadSuccess = function ( loadedData ) {
    return {
        type:               DATA_ACCOUNTS_LOAD_SUCCESS,
        accountsSource:     loadedData,
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

const acDataSetAccountsData = function ( accountsData ) {
    return {
        type:                   DATA_ACCOUNTS_SET_ACCOUNTS_DATA,
        accountsData:           accountsData,
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

const acDataAccountSetFilters = function ( accountFilters ) {
    return {
        type:               DATA_ACCOUNT_SET_FILTERS,
        accountFilters,
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
        operationCategoriesSource:  loadedData,
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

const acDataSetOperationCategoriesData = function ( operationCategoriesData ) {
    return {
        type:                DATA_SET_OPERATION_CATEGORIES_DATA,
        operationCategoriesData: operationCategoriesData,
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
        operationsSource:  loadedData,
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

const acDataSetOperationsData = function ( operationsData ) {
    return {
        type:                   DATA_OPERATIONS_SET_OPERATIONS_DATA,
        operationsData:         operationsData,
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
    DATA_CURRENCY_LIST_LOAD_START,                acDataCurrencyListLoadStart,
    DATA_CURRENCY_LIST_LOAD_SUCCESS,              acDataCurrencyListLoadSuccess,
    DATA_CURRENCY_LIST_LOAD_ERROR,                acDataCurrencyListLoadError,
    DATA_CURRENCY_LIST_SHOULD_BE_RELOADED,        acDataCurrencyListShouldBeReloaded,
    DATA_CURRENCY_LIST_SET_DATA,                  acDataCurrencyListSetData,
    DATA_CURRENCY_LIST_SAVE_START,                acDataCurrencyListSaveStart,
    DATA_CURRENCY_LIST_SAVE_SUCCESS,              acDataCurrencyListSaveSuccess,
    DATA_CURRENCY_LIST_SAVE_ERROR,                acDataCurrencyListSaveError,
    DATA_CURRENCY_LIST_DELETE_START,              acDataCurrencyListDeleteStart,
    DATA_CURRENCY_LIST_DELETE_SUCCESS,            acDataCurrencyListDeleteSuccess,
    DATA_CURRENCY_LIST_DELETE_ERROR,              acDataCurrencyListDeleteError,

    DATA_CURRENCY_LIST_SELECT,                    acDataCurrencyListSelect,

    DATA_ACCOUNTS_LOAD_START,                     acDataAccountsLoadStart,
    DATA_ACCOUNTS_LOAD_SUCCESS,                   acDataAccountsLoadSuccess,
    DATA_ACCOUNTS_LOAD_ERROR,                     acDataAccountsLoadError,
    DATA_ACCOUNTS_SHOULD_BE_RELOADED,             acDataAccountsShouldBeReloaded,
    DATA_ACCOUNTS_SET_ACCOUNTS_DATA,              acDataSetAccountsData,
    DATA_ACCOUNT_SAVE_START,                      acDataAccountSaveStart,
    DATA_ACCOUNT_SAVE_SUCCESS,                    acDataAccountSaveSuccess,
    DATA_ACCOUNT_SAVE_ERROR,                      acDataAccountSaveError,
    DATA_ACCOUNT_DELETE_START,                    acDataAccountDeleteStart,
    DATA_ACCOUNT_DELETE_SUCCESS,                  acDataAccountDeleteSuccess,
    DATA_ACCOUNT_DELETE_ERROR,                    acDataAccountDeleteError,

    DATA_ACCOUNT_SELECT,                          acDataAccountSelect,
    DATA_ACCOUNT_SET_FILTERS,                     acDataAccountSetFilters,

    DATA_OPERATION_CATEGORIES_LOAD_START,         acDataOperationCategoriesLoadStart,
    DATA_OPERATION_CATEGORIES_LOAD_SUCCESS,       acDataOperationCategoriesLoadSuccess,
    DATA_OPERATION_CATEGORIES_LOAD_ERROR,         acDataOperationCategoriesLoadError,
    DATA_OPERATION_CATEGORIES_SHOULD_BE_RELOADED, acDataOperationCategoriesShouldBeReloaded,
    DATA_SET_OPERATION_CATEGORIES_DATA,           acDataSetOperationCategoriesData,
    DATA_OPERATION_CATEGORY_SAVE_START,           acDataOperationCategorySaveStart,
    DATA_OPERATION_CATEGORY_SAVE_SUCCESS,         acDataOperationCategorySaveSuccess,
    DATA_OPERATION_CATEGORY_SAVE_ERROR,           acDataOperationCategorySaveError,
    DATA_OPERATION_CATEGORY_DELETE_START,         acDataOperationCategoryDeleteStart,
    DATA_OPERATION_CATEGORY_DELETE_SUCCESS,       acDataOperationCategoryDeleteSuccess,
    DATA_OPERATION_CATEGORY_DELETE_ERROR,         acDataOperationCategoryDeleteError,

    DATA_OPERATION_CATEGORY_SELECT,               acDataOperationCategorySelect,

    DATA_OPERATIONS_LOAD_START,                   acDataOperationsLoadStart,
    DATA_OPERATIONS_LOAD_SUCCESS,                 acDataOperationsLoadSuccess,
    DATA_OPERATIONS_LOAD_ERROR,                   acDataOperationsLoadError,
    DATA_OPERATIONS_SHOULD_BE_RELOADED,           acDataOperationsShouldBeReloaded,
    DATA_OPERATIONS_SET_OPERATIONS_DATA,          acDataSetOperationsData,
    DATA_OPERATION_SAVE_START,                    acDataOperationSaveStart,
    DATA_OPERATION_SAVE_SUCCESS,                  acDataOperationSaveSuccess,
    DATA_OPERATION_SAVE_ERROR,                    acDataOperationSaveError,
    DATA_OPERATION_DELETE_START,                  acDataOperationDeleteStart,
    DATA_OPERATION_DELETE_SUCCESS,                acDataOperationDeleteSuccess,
    DATA_OPERATION_DELETE_ERROR,                  acDataOperationDeleteError,

    DATA_OPERATION_SELECT,                        acDataOperationSelect,
}