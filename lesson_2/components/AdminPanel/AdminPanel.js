'use strict';

import React from 'react';

import ProductList from '../ProductList/ProductList';
import ProductCard from '../ProductCard/ProductCard';

import { productsList } from "../../mocks/mock_products";

import './AdminPanel.scss';
import {isExists} from "../../utils/utils";

class AdminPanel extends React.PureComponent {

    constructor( props ) {
        super( props );
        this.state = props;
    }

    static defaultProps = {
        selectedProductID:  '',
        productsList:       productsList,

    };

    classCSS = 'AdminPanel';

    componentWillMount() {
        this.prepareState( this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
    }

    prepareState = ( props ) => {
        let state = { ...AdminPanel.defaultProps };
        if ( isExists( props ) )
            state = {
                ...state,
                ...props,
            };
        this.setState( state, ()=>{} );
    };

    prepareProductList = () => {

        return {
            defValue:  'p_1',
            listValue: this.state.productsList,
            cbChanged: this.pl_cbItemClick,
        }
    };

    prepareProductCard = () => {

        return {
            id:             {
                defValue: 'id',

            },
            name:           {
                defValue: 'name',

            },
            price:          {
                defValue: 0,

            },
            count:          {
                defValue: 0,

            },
            comment:        {
                defValue: 'blabla',

            },
        }
    };

    // == callbacks ==
    pl_cbItemClick = ( value ) => {
        this.setState( {
            selectedProductID: value,
        }, () => {
            console.log( "ProductList callback: ", value );
        } );
    };

    render() {
        return (
                <div className = { this.classCSS }>
                    <div className = { this.classCSS + "_left_section border" }>
                        <ProductList { ...this.prepareProductList() }/>
                    </div>
                    <div className = { this.classCSS + "_main_section" }>
                        <ProductCard { ...this.prepareProductCard() }/>
                    </div>
                </div>
            )
    }

}

export default AdminPanel;