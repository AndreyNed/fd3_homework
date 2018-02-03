'use strict';

import { thunkFetch } from "./thunkFetch";

import {
    acDataAccountsLoadError,
    acDataAccountsLoadStart,
    acDataAccountsLoadSuccess,
    acDataAccountSaveStart,
    acDataAccountSaveSuccess,
    acDataAccountSaveError,
    acDataAccountDeleteStart,
    acDataAccountDeleteSuccess,
    acDataAccountDeleteError,
    acDataOperationCategoriesLoadError,
    acDataOperationCategoriesLoadStart,
    acDataOperationCategoriesLoadSuccess,
    acDataOperationCategoryDeleteStart,
    acDataOperationCategoryDeleteSuccess,
    acDataOperationCategoryDeleteError,
    acDataOperationsLoadStart,
    acDataOperationsLoadSuccess,
    acDataOperationsLoadError,
    acDataOperationSaveStart,
    acDataOperationSaveSuccess,
    acDataOperationSaveError,
    acDataOperationDeleteStart,
    acDataOperationDeleteSuccess,
    acDataOperationDeleteError,
    acDataOperationCategorySaveStart,
    acDataOperationCategorySaveSuccess,
    acDataOperationCategorySaveError,
    acDataCurrencyListLoadStart,
    acDataCurrencyListLoadSuccess,
    acDataCurrencyListLoadError,
    acDataCurrencyListSaveStart,
    acDataCurrencyListSaveSuccess,
    acDataCurrencyListSaveError,
    acDataCurrencyListDeleteStart,
    acDataCurrencyListDeleteSuccess,
    acDataCurrencyListDeleteError,
} from "../actions/acData";

import { SERVER_URI } from "./network_consts";

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_F_DATA } from "../config/config";
import {acUIHideMatGlass} from "../actions/acUI";

const debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_F_DATA;

const fDataLoadCurrencyList = function ( dispatch, cbSuccess, cbError ) {
    ( debug_mode ) && console.log( 'fDataLoadCurrencyList...' );
    dispatch( acDataCurrencyListLoadStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataLoadCurrencyList: ' + errorText );
        dispatch( acDataCurrencyListLoadError( errorText ) );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        ( debug_mode ) && console.log( 'fDataLoadCurrencyList: fetchSuccess: loadedData: ', loadedData );
        dispatch( acDataCurrencyListLoadSuccess( loadedData ) );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: 'command=get_currency_all',
    };

    dispatch(
        thunkFetch({
            fetchURI:     SERVER_URI,
            fetchOptions: fetchOptions,
            cbError:      fetchError,
            cbSuccess:    fetchSuccess,
        })
    );
};

const fDataSaveCurrencyToList = function (dispatch, cbSuccess, cbError, currency ) {
    ( debug_mode ) && console.log( 'fDataSaveCurrencyToList...' );
    dispatch( acDataCurrencyListSaveStart() );
    const { id, code, name, abbreviation, scale, rate, updated } = currency;

    let fetchError = function ( errorText ) {
        console.error( 'fDataSaveCurrencyToList: ' + errorText );
        dispatch( acDataCurrencyListSaveError( errorText ) );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
                console.log( '%c%s', 'color: green;font-weight:bold', 'fDataSaveCurrencyToList: fetchSuccess: ', loadedData.responseText );
            dispatch( acDataCurrencyListSaveError( errorText ) );
        }
        else {
            ( debug_mode ) &&
                console.log( '%c%s', 'color: red;font-weight:bold', 'fDataSaveCurrencyToList: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataCurrencyListSaveSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=save_account' +
        `&currency_id=${ id }` +
        `&currency_code=${ code }` +
        `&currency_name=${ name }` +
        `&currency_abbreviation=${ abbreviation }` +
        `&currency_scale=${ scale }` +
        `&currency_rate=${ rate }` +
        `&currency_updated=${ updated }`
    };

    debug_mode && console.log( 'fDataSaveCurrencyToList: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,// + value,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataCreateCurrencyToList = function (dispatch, cbSuccess, cbError, newCurrency ) {
    ( debug_mode ) && console.log( 'fDataCreateCurrencyToList...' );
    dispatch( acDataCurrencyListSaveStart() );
    const { code, name, abbreviation, scale, rate, updated } = newCurrency;

    let fetchError = function ( errorText ) {
        console.error( 'fDataCreateCurrencyToList: ' + errorText );
        dispatch( acDataCurrencyListSaveError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataCreateCurrencyToList: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataCreateCurrencyToList: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataCurrencyListSaveSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=add_currency' +
        `&currency_code=${ code }` +
        `&currency_name=${ name }` +
        `&currency_abbreviation=${ abbreviation }` +
        `&currency_scale=${ scale }` +
        `&currency_rate=${ rate }` +
        `&currency_updated=${ updated }`
    };

    debug_mode && console.log( 'fDataCreateCurrencyToList: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataDeleteCurrencyFromList = function (dispatch, cbSuccess, cbError, currencyId ) {
    ( debug_mode ) && console.log( 'fDataDeleteCurrencyFromList...' );
    dispatch( acDataCurrencyListDeleteStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataDeleteAccount: ' + errorText );
        dispatch( acDataCurrencyListDeleteError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataDeleteCurrencyFromList: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataDeleteCurrencyFromList: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataCurrencyListDeleteSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=delete_currency' +
        `&currency_id=${ currencyId }`
    };

    debug_mode && console.log( 'fDataDeleteCurrencyFromList: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataLoadAccounts = function ( dispatch, cbSuccess, cbError ) {
    ( debug_mode ) && console.log( 'fDataLoadAccounts...' );
    dispatch( acDataAccountsLoadStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataLoadAccounts: ' + errorText );
        dispatch( acDataAccountsLoadError( errorText ) );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        ( debug_mode ) && console.log( 'fDataLoadAccounts: fetchSuccess: loadedData: ', loadedData );
        dispatch( acDataAccountsLoadSuccess( loadedData ) );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: 'command=get_accounts',
    };

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataSaveAccount = function ( dispatch, cbSuccess, cbError, account ) {
    ( debug_mode ) && console.log( 'fDataSaveAccount...' );
    dispatch( acDataAccountSaveStart() );
    const { id, name, comment, currency } = account;

    let fetchError = function ( errorText ) {
        console.error( 'fDataSaveAccount: ' + errorText );
        dispatch( acDataAccountSaveError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataSaveAccount: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataSaveAccount: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataAccountSaveSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=save_account' +
        `&account_id=${ id }` +
        `&account_name=${ name }` +
        `&account_comment=${ comment }` +
        `&account_currency=${ currency }`
    };

    debug_mode && console.log( 'fDataSaveAccount: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,// + value,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataCreateAccount = function ( dispatch, cbSuccess, cbError, newAccount ) {
    ( debug_mode ) && console.log( 'fDataCreateAccount...' );
    dispatch( acDataAccountSaveStart() );
    const { name, comment, currency } = newAccount;

    let fetchError = function ( errorText ) {
        console.error( 'fDataCreateAccount: ' + errorText );
        dispatch( acDataAccountSaveError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataCreateAccount: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataCreateAccount: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataAccountSaveSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=add_account' +
        `&account_name=${ name }` +
        `&account_comment=${ comment }` +
        `&account_currency=${ currency }`
    };

    debug_mode && console.log( 'fDataCreateAccount: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,// + value,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataDeleteAccount = function ( dispatch, cbSuccess, cbError, accountId ) {
    ( debug_mode ) && console.log( 'fDataDeleteAccount...' );
    dispatch( acDataAccountDeleteStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataDeleteAccount: ' + errorText );
        dispatch( acDataAccountDeleteError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataDeleteAccount: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataDeleteAccount: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataAccountDeleteSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=delete_account' +
        `&account_id=${ accountId }`
    };

    debug_mode && console.log( 'fDataDeleteAccount: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataLoadOperationCategories = function ( dispatch, cbSuccess, cbError ) {
    ( debug_mode ) && console.log( 'fDataLoadOperationCategories...' );
    dispatch( acDataOperationCategoriesLoadStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataLoadOperationCategories: ' + errorText );
        dispatch( acDataOperationCategoriesLoadError( errorText ) );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        ( debug_mode ) && console.log( 'fDataLoadOperationCategories: fetchSuccess: loadedData: ', loadedData );
        dispatch( acDataOperationCategoriesLoadSuccess( loadedData ) );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: 'command=get_categories',
    };

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataSaveOperationCategory = function ( dispatch, cbSuccess, cbError, category ) {
    ( debug_mode ) && console.log( 'fDataSaveOperationCategory...' );
    dispatch( acDataOperationCategorySaveStart() );
    const { id, name, comment } = category;

    let fetchError = function ( errorText ) {
        console.error( 'fDataSaveOperationCategory: ' + errorText );
        dispatch( acDataOperationCategorySaveError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataSaveOperationCategory: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataSaveOperationCategory: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataOperationCategorySaveSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=save_category' +
        `&category_id=${ id }` +
        `&category_name=${ name }` +
        `&category_comment=${ comment }`
    };

    debug_mode && console.log( 'fDataSaveOperationCategory: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataCreateOperationCategory = function ( dispatch, cbSuccess, cbError, newCategory ) {
    ( debug_mode ) && console.log( 'fDataCreateOperationCategory...' );
    dispatch( acDataOperationCategorySaveStart() );
    const { name, comment } = newCategory;

    let fetchError = function ( errorText ) {
        console.error( 'fDataCreateOperationCategory: ' + errorText );
        dispatch( acDataOperationCategorySaveError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataCreateOperationCategory: fetchSuccess: ', loadedData.responseText );
            dispatch( acDataOperationCategorySaveSuccess() );
            if ( cbSuccess )
                cbSuccess( loadedData );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataCreateOperationCategory: fetchSuccess: ', loadedData.responseText );
            dispatch( acDataOperationCategorySaveError() );
            if (cbError)
                cbError( loadedData.responseText );
        }
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=add_category' +
        `&category_name=${ name }` +
        `&category_comment=${ comment }`
    };

    debug_mode && console.log( 'fDataCreateOperationCategory: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataDeleteOperationCategory = function ( dispatch, cbSuccess, cbError, categoryId ) {
    ( debug_mode ) && console.log( 'fDataDeleteOperationCategory...' );
    dispatch( acDataOperationCategoryDeleteStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataDeleteOperationCategory: ' + errorText );
        dispatch( acDataOperationCategoryDeleteError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataDeleteOperationCategory: fetchSuccess: ', loadedData.responseText );
            dispatch( acDataOperationCategoryDeleteSuccess() );
            if ( cbSuccess )
                cbSuccess( loadedData );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataDeleteOperationCategory: fetchSuccess: ', loadedData.responseText );
            dispatch( acDataOperationCategoryDeleteError() );
            if (cbError)
                cbError( loadedData.responseText );
        }
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=delete_category' +
        `&category_id=${ categoryId }`
    };

    debug_mode && console.log( 'fDataDeleteOperationCategory: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataLoadOperations = function ( dispatch, cbSuccess, cbError ) {
    ( debug_mode ) &&
        console.log( 'fDataLoadOperations...' );

    dispatch( acDataOperationsLoadStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataLoadOperations: ' + errorText );
        dispatch( acDataOperationsLoadError( errorText ) );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        ( debug_mode ) &&
            console.log( 'fDataLoadOperations: fetchSuccess: loadedData: ', loadedData );

        dispatch( acDataOperationsLoadSuccess( loadedData ) );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: 'command=get_operations',
    };

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataSaveOperation = function ( dispatch, cbSuccess, cbError, operation ) {
    ( debug_mode ) && console.log( 'fDataSaveOperations...' );
    dispatch( acDataOperationSaveStart() );
    const { id, accountId, categoryId, type, sum, date, comment } = operation;

    let fetchError = function ( errorText ) {
        console.error( 'fDataSaveOperation: ' + errorText );
        dispatch( acDataOperationSaveError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataSaveOperation: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataSaveOperation: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataOperationSaveSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=save_operation' +
              `&operation_id=${ id }` +
              `&account_id=${ accountId }` +
              `&category_id=${ categoryId }` +
              `&type=${ type }` +
              `&sum=${ sum }` +
              `&date=${ date }` +
              `&comment=${ comment }`
    };

    debug_mode && console.log( 'fDataSaveOperation: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,// + value,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataCreateOperation = function ( dispatch, cbSuccess, cbError, newOperation ) {
    ( debug_mode ) && console.log( 'fDataLoadOperations...' );
    dispatch( acDataOperationSaveStart() );
    const { accountId, categoryId, type, sum, date, comment } = newOperation;

    let fetchError = function ( errorText ) {
        console.error( 'fDataCreateOperation: ' + errorText );
        dispatch( acDataOperationSaveError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
                console.log( '%c%s', 'color: green;font-weight:bold', 'fDataCreateOperation: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
                console.log( '%c%s', 'color: red;font-weight:bold', 'fDataCreateOperation: fetchSuccess: ', loadedData.responseText )
        }
        dispatch( acDataOperationSaveSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: 'command=add_operation' +
              `&account_id=${ accountId }` +
              `&category_id=${ categoryId }` +
              `&type=${ type }` +
              `&sum=${ sum }` +
              `&date=${ date }` +
              `&comment=${ comment }`
    };

    debug_mode && console.log( 'fDataCreateOperation: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataDeleteOperation = function ( dispatch, cbSuccess, cbError, operationId ) {
    ( debug_mode ) && console.log( 'fDataDeleteOperation...' );
    dispatch( acDataOperationDeleteStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataSaveOperation: ' + errorText );
        dispatch( acDataOperationDeleteError() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        if ( !loadedData.errorCode ) {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: green;font-weight:bold', 'fDataDeleteOperation: fetchSuccess: ', loadedData.responseText );
        }
        else {
            ( debug_mode ) &&
            console.log( '%c%s', 'color: red;font-weight:bold', 'fDataDeleteOperation: fetchSuccess: ', loadedData.responseText );
        }
        dispatch( acDataOperationDeleteSuccess() );
        if ( cbSuccess )
            cbSuccess( loadedData );
    };

    let fetchOptions = {
        method: 'post',
        mode:   'cors',
        cache:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `command=delete_operation&operation_id=${ operationId }`
    };

    debug_mode && console.log( 'fDataDeleteOperation: fetchOptions: ', fetchOptions );

    dispatch(
        thunkFetch({
            fetchURI: SERVER_URI,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

export {
    fDataLoadAccounts, fDataLoadOperationCategories, fDataLoadOperations,
    fDataSaveOperation, fDataCreateOperation, fDataDeleteOperation,
    fDataSaveAccount, fDataCreateAccount, fDataDeleteAccount,
    fDataSaveOperationCategory, fDataCreateOperationCategory, fDataDeleteOperationCategory,
    fDataLoadCurrencyList, fDataCreateCurrencyToList, fDataSaveCurrencyToList, fDataDeleteCurrencyFromList,
}