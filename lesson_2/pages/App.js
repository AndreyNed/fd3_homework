"use strict";

import React from 'react';

import AdminPanel from '../components/AdminPanel/AdminPanel';

import {
    commandGetProducts, commandChangeProduct, commandCreateProduct,
    commandDeleteProduct
} from '../network/services';

import {isExists, isNotEmpty, isNotNaN} from "../utils/utils";

require('./App.scss');

class App extends React.Component {

    constructor( props ) {
        super( props );
        this.state = props;
    }

    componentWillMount() {
        this.prepareState( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
    }

    prepareState = ( props ) => {
        let state = { ...props };

        let cbSuccess = ( data ) => {
            state.productsData = data;
            console.log( 'prepareState: productsData: ', state.productsData );
            this.setState( state, () => {
                console.log( 'App: prepareState: ', this.state );
            } )
        };

        commandGetProducts( cbSuccess );

    };

    getProductsData = () => {
        console.log( 'getProductsData...' );

        let productsData = null;

        let cbSuccess = ( data ) => {
            productsData = data;
            // console.log( 'getProductsData: productsData: ', productsData );
            this.setState( { productsData }, () => {
                console.log( 'App: getProductsData: ', this.state.productsData );
            } )
        };

        commandGetProducts( cbSuccess );

    };

    productChanged = ( product ) => {

        product.id = ( isNotEmpty( product.id ) )
            ? parseInt( product.id )
            : product.id;

        let cbSuccess = () => {
            this.setState( {
                test: Math.random() + '',
            }, () => {
                this.getProductsData();
            } );

        };

        if ( isExists( product ) &&
             isNotNaN( product.id ) &&
             isNotEmpty( product.name ) &&
             isNotNaN( product.price ) &&
             isNotNaN( product.count ) &&
             isNotEmpty( product.comment )
        ) {
            commandChangeProduct( product, cbSuccess );
        }
    };

    productCreated = ( product ) => {

        let cbSuccess = () => {
            this.setState( {
                test: Math.random() + '',
            }, () => {
                this.getProductsData();
            } );

        };

        if ( isExists( product ) &&
            isNotEmpty( product.name ) &&
            isNotNaN( product.price ) &&
            isNotNaN( product.count ) &&
            isNotEmpty( product.comment )
        ) {
            commandCreateProduct( product, cbSuccess );
        }
    };

    productDeleted = ( productID ) => {

        let id = parseInt( productID );

        if ( isNotNaN( id ) ) {

            let cbSuccess = () => {
                this.setState( {
                    test: Math.random() + '',
                }, () => {
                    this.getProductsData();
                } );

            };

            commandDeleteProduct( id, cbSuccess );

        }
        else console.log( 'Error on deleting: wrong ID: ', productID );

    };

    render() {
        let props = {
            test: 'test',
            productsData: ( isExists( this.state.productsData ) )
                ? [ ...this.state.productsData ]
                : null,
            cbProductChanged: this.productChanged,
            cbProductCreated: this.productCreated,
            cbProductDeleted: this.productDeleted,
        };
        return (
            <div className="IShop_wrapper">
                <div className="IShop_header_panel">
                    <h1 className = { "IShop_header" }>iSHOP</h1>
                    <span className = { "IShop_slogan" }>Take it easy</span>
                </div>
                <AdminPanel { ...props }/>
            </div>
        );
    }
}
export default App;
