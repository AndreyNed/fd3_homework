'use strict';

import {default as isoFetch} from 'isomorphic-fetch';
import {isExists, isNotEmpty} from "../utils/utils";

const thunkFetch = function ( options ) {
    // console.log( 'thunkFetch: options: ', options.fetchOptions );

    return ( dispatch, getState ) => {
        /*
        * options: {...}
        * . fetchURI
        * . fetchOptions
        *
        * */

        let fetchSuccess = function (response) {

            if ( options.cbSuccess )
                options.cbSuccess( response );
            else console.log("thunkFetch: cbSuccess: response: ", response);
        };

        let fetchError = function (error) {
            console.log("thunkFetch: cbError: error: ", error);
            if ( options.cbError )  options.cbError( error );
        };

        let fetchOptions = { ...options.fetchOptions };

        isoFetch(options.fetchURI, fetchOptions)
            .then(
                function (response) {
                    if (response.status == 200) {
                        return ( response.json());
                    }
                    else {
                        console("Response status: ", response.status);
                        return null;
                    }
                }
            )
            .then(
                function (loadedData) {
                    // console.log( "thunkFetch: json(): ", loadedData );
                    if (loadedData) {
                        fetchSuccess(loadedData);
                    }
                }
            )
            .catch(
                function (error) {
                    fetchError(error);
                }
            );
    }
};

export { thunkFetch }
