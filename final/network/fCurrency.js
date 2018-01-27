import { thunkFetch } from "./thunkFetch";

import { CURRENCY_URI, CURRENCY_DAILY_ALL, CURRENCY_DYNAMIC } from "./network_consts";
import {
    acCurrencyDynamicLoadStart,
    acCurrencyDynamicLoadSuccess,
    acCurrencyDynamicLoadError,
    acCurrencyLoadStart,
    acCurrencyLoadSuccess,
    acCurrencyLoadError,
} from "../actions/acCurrency";

const debug_mode = true;

const fCurrencyDailyAll = ( dispatch, cbSuccess, cbError,  ) => {
    ( debug_mode ) &&
        console.log( "fCurrencyDailyAll..." );

    dispatch( acCurrencyLoadStart() );
    let fetchError = function ( errorText ) {
        dispatch( acCurrencyLoadError() );
        if ( cbError ){
            cbError( errorText );
        }
        else {
            console.log( '%c%s', 'color: red;', 'fCurrencyDailyAll: fetch error...', errorText );
        }
    };
    
    let fetchSuccess = function ( loadedData ) {
        ( debug_mode ) &&
            console.log( "fCurrencyDailyAll: fetchSuccess: ", loadedData );
        dispatch( acCurrencyLoadSuccess( loadedData ) );
        if ( cbSuccess ) {
            cbSuccess( loadedData );
        }
    };

    let fetchOptions = {
        method: 'get',
        cashe:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    dispatch(
        thunkFetch({
            fetchURI:     CURRENCY_URI + CURRENCY_DAILY_ALL,
            fetchOptions: fetchOptions,
            cbError:      fetchError,
            cbSuccess:    fetchSuccess,
        })
    );
};

const fCurrencyDynamicRates = ( dispatch, cbSuccess, cbError, options ) => {
    ( debug_mode ) &&
        console.log( "fCurrencyDynamicRates: options: ",  options );

    dispatch( acCurrencyDynamicLoadStart() );

    let fetchError = function ( errorText ) {
        dispatch( acCurrencyDynamicLoadError() );
        if ( cbError ){
            cbError( errorText );
        }
        else {
            console.log( '%c%s', 'color: red;', 'fCurrencyDynamicRates: fetch error...', errorText );
        }
    };

    let fetchSuccess = function ( loadedData ) {
        ( debug_mode ) &&
            console.log( "fCurrencyDynamicRates: fetchSuccess: ", loadedData );
        dispatch( acCurrencyDynamicLoadSuccess( loadedData ) );
        if ( cbSuccess ) {
            cbSuccess( loadedData );
        }
    };

    let fetchOptions = {
        method: 'get',
        cashe:  'no-cache',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    // all dates are string
    const { Cur_ID, startDate, endDate } = options;

    dispatch(
        thunkFetch({
            fetchURI:     CURRENCY_URI + CURRENCY_DYNAMIC( Cur_ID, startDate, endDate ),
            fetchOptions: fetchOptions,
            cbError:      fetchError,
            cbSuccess:    fetchSuccess,
        })
    );
};

export { fCurrencyDailyAll, fCurrencyDynamicRates };
