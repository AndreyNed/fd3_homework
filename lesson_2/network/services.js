'use strict';

const SERVICE_URL = "http://localhost:8080/ishop/IShop";

// commands

const COMMAND_GET_PRODUCTS = "?command=get_products";

// fetch

const commandGetProducts = ( cbSuccess, cbError ) => {
    let url = SERVICE_URL + COMMAND_GET_PRODUCTS;

    let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });

    let options = {
        method: 'GET',
        headers: headers,
        mode:   'cors',
        cache:  'default',
    };

    fetch( url, options )
        .then(
            function( response )
            {
                console.log( 'response: ', response.status );
                return response.json();
            }
        )
        .then(
            function( data ) {
                if ( cbSuccess )
                {
                    cbSuccess( data )
                }
                else console.log( data );
            }
        )
        .catch( function( err )
            {
                if ( cbError ) {
                    cbError( err )
                }
                else console.log( 'fetch error: ', err );
            }
        );
};

export { SERVICE_URL, COMMAND_GET_PRODUCTS, commandGetProducts };