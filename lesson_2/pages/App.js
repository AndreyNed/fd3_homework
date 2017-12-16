"use strict";

import React from 'react';

import AdminPanel from '../components/AdminPanel/AdminPanel';

import { SERVICE_URL, COMMAND_GET_PRODUCTS, commandGetProducts } from '../network/services';
import {isExists} from "../utils/utils";

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

    render() {
        let props = {
            test: 'test',
            productsData: ( isExists( this.state.productsData ) )
                ? [ ...this.state.productsData ]
                : null,
        };
        return (
            <div className="IShop_wrapper">
                <div className="IShop_header border">

                </div>
                <AdminPanel { ...props }/>
            </div>
        );
    }
}
export default App;
