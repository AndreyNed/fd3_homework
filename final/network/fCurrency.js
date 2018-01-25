import { thunkFetch } from "./thunkFetch";

import { CURRENCY_URI, CURRENCY_DAILY_ALL } from "./network_consts";
import {acCurrencyLoadError, acCurrencyLoadStart, acCurrencyLoadSuccess} from "../actions/acCurrency";

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

export { fCurrencyDailyAll };
