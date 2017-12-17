'use strict';

const SERVICE_URL = "http://localhost:8080/ishop/IShop";

// commands

const COMMAND_GET_PRODUCTS = "?command=get_products";

const COMMAND_CHANGE_PRODUCT = "?command=change_product";

const COMMAND_CREATE_PRODUCT = "?command=add_product";

const COMMAND_DELETE_PRODUCT = "?command=remove_product";

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
        cache:  'no-cache',
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

const commandChangeProduct = ( product, cbSuccess, cbError ) => {
    let values = `&id=${ product.id }&name=${ product.name }&price=${ product.price }&count=${ product.count }&comment=${ product.comment }`;
    let url = SERVICE_URL + COMMAND_CHANGE_PRODUCT + values;

    let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });

    let options = {
        method: 'GET',
        headers: headers,
        mode:   'cors',
        cache:  'no-cache',
    };

    fetch( url, options )
        .then(
            function( response )
            {
                console.log( 'response: ', response );
                return response;
            }
        )
        .then(
            function( data ) {
                if ( cbSuccess )
                {
                    cbSuccess( data )
                }
            }
        )
        .catch( function( err )
            {
                if ( cbError ) {
                    cbError( err )
                }
                else console.log( 'Changing product: fetch error: ', err );
            }
        );
};

const commandCreateProduct = ( product, cbSuccess, cbError ) => {
    let values = `&name=${ product.name }&price=${ product.price }&count=${ product.count }&comment=${ product.comment }`;
    let url = SERVICE_URL + COMMAND_CREATE_PRODUCT + values;

    let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });

    let options = {
        method: 'GET',
        headers: headers,
        mode:   'cors',
        cache:  'no-cache',
    };

    fetch( url, options )
        .then(
            function( response )
            {
                console.log( 'response: ', response );
                return response;
            }
        )
        .then(
            function( data ) {
                if ( cbSuccess )
                {
                    cbSuccess( data )
                }
            }
        )
        .catch( function( err )
            {
                if ( cbError ) {
                    cbError( err )
                }
                else console.log( 'Creating product: fetch error: ', err );
            }
        );
};

const commandDeleteProduct = ( productID, cbSuccess, cbError ) => {
    let values = `&id=${ productID }`;
    let url = SERVICE_URL + COMMAND_DELETE_PRODUCT + values;

    let headers = new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
    });

    let options = {
        method: 'GET',
        headers: headers,
        mode:   'cors',
        cache:  'no-cache',
    };

    fetch( url, options )
        .then(
            function( response )
            {
                console.log( 'response: ', response );
                return response;
            }
        )
        .then(
            function( data ) {
                if ( cbSuccess )
                {
                    cbSuccess( data )
                }
            }
        )
        .catch( function( err )
            {
                if ( cbError ) {
                    cbError( err )
                }
                else console.log( 'Deleting product: fetch error: ', err );
            }
        );
};

export { SERVICE_URL, COMMAND_GET_PRODUCTS, commandGetProducts,
                      COMMAND_CHANGE_PRODUCT, commandChangeProduct,
                      COMMAND_CREATE_PRODUCT, commandCreateProduct,
                      COMMAND_DELETE_PRODUCT, commandDeleteProduct };