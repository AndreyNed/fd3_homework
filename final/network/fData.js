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
} from "../actions/acData";

import { SERVER_URI } from "./network_consts";


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

export {
    fDataLoadAccounts, fDataLoadOperationCategories, fDataLoadOperations,
}