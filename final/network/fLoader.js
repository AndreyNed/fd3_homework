'use strict';

import { thunkFetch } from "./thunkFetch";

import {
    acDataAccountsLoadError,
    acDataAccountsLoadStart,
    acDataAccountsLoadSuccess,
} from "../actions/acData";

import { SERVER_URL } from "./network_consts";
import {acHideMatGlass} from "../actions/acUI";


const fDataLoadAccounts = function ( dispatch, cbSuccess, cbError ) {
    // console.log( 'fDataLoadAccounts...' );
    dispatch( acDataAccountsLoadStart() );

    let fetchError = function ( errorText ) {
        console.error( 'fDataLoadAccounts: ' + errorText );
        dispatch( acDataAccountsLoadError( errorText ) );
        dispatch( acHideMatGlass() );
        if (cbError)
            cbError( errorText );
    };

    let fetchSuccess = function ( loadedData ) {
        // console.log( 'fDataLoadAccounts: fetchSuccess: loadedData: ', loadedData );
        dispatch( acDataAccountsLoadSuccess( loadedData ) );
        dispatch( acHideMatGlass() );
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
            fetchURI: SERVER_URL,
            fetchOptions: fetchOptions,
            cbError: fetchError,
            cbSuccess: fetchSuccess,
            /*cbGetErrorText: (reply) => {
                if (reply.errorInfo.errorCode != "0") return reply.errorInfo.errorDescription; else return null;
            },
            cbGetData: (reply) => {
                return reply.departmentInfo;
            },*/
            // mockData: require('../../mocks/new_mocks/PartnersSource20171226.json'),
        })
    );
};

export {
    fDataLoadAccounts,
}