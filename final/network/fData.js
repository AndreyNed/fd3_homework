'use strict';

import { thunkFetch } from "./thunkFetch";

import {
    acDataAccountsLoadError,
    acDataAccountsLoadStart,
    acDataAccountsLoadSuccess,
    acDataOperationCategoriesLoadError,
    acDataOperationCategoriesLoadStart,
    acDataOperationCategoriesLoadSuccess,
    acDataOperationsLoadStart,
    acDataOperationsLoadSuccess,
    acDataOperationsLoadError,
    acDataOperationSaveStart,
    acDataOperationSaveSuccess,
    acDataOperationSaveError,
    acDataOperationDeleteStart,
    acDataOperationDeleteSuccess,
    acDataOperationDeleteError,
} from "../actions/acData";

import { SERVER_URI } from "./network_consts";

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_F_DATA } from "../config/config";
import {acUIHideMatGlass} from "../actions/acUI";

const debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_F_DATA;

const fDataLoadAccounts = function ( dispatch, cbSuccess, cbError ) {
    // console.log( 'fDataLoadAccounts...' );
    dispatch( acDataAccountsLoadStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataLoadAccounts: ' + errorText );
        dispatch( acDataAccountsLoadError( errorText ) );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        // console.log( 'fDataLoadAccounts: fetchSuccess: loadedData: ', loadedData );
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

const fDataLoadOperationCategories = function ( dispatch, cbSuccess, cbError ) {
    // console.log( 'fDataLoadOperationCategories...' );
    dispatch( acDataOperationCategoriesLoadStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataLoadOperationCategories: ' + errorText );
        dispatch( acDataOperationCategoriesLoadError( errorText ) );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        // console.log( 'fDataLoadOperationCategories: fetchSuccess: loadedData: ', loadedData );
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

const fDataLoadOperations = function ( dispatch, cbSuccess, cbError ) {
    // console.log( 'fDataLoadOperations...' );
    dispatch( acDataOperationsLoadStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataLoadOperations: ' + errorText );
        dispatch( acDataOperationsLoadError( errorText ) );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        // console.log( 'fDataLoadOperations: fetchSuccess: loadedData: ', loadedData );
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
    // console.log( 'fDataLoadOperations...' );
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
    // console.log( 'fDataLoadOperations...' );
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
            fetchURI: SERVER_URI,// + value,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

const fDataDeleteOperation = function ( dispatch, cbSuccess, cbError, operationId ) {
    // console.log( 'fDataDeleteOperation...' );
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
            fetchURI: SERVER_URI,// + value,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
        })
    );
};

export {
    fDataLoadAccounts, fDataLoadOperationCategories, fDataLoadOperations,
    fDataSaveOperation, fDataCreateOperation, fDataDeleteOperation,
}