'use strict';

import React from 'react';

import ProductList from '../ProductList/ProductList';

import { productsList } from "../../mocks/mock_products";

import './AdminPanel.scss';

class AdminPanel extends React.PureComponent {

    classCSS = 'AdminPanel';

    prepareProductList = () => {
        return {
            defValue:  'p_1',
            listValue: productsList,
            cbChanged: this.pl_cbItemClick,
        }
    };

    // == callbacks ==
    pl_cbItemClick = ( value ) => {
        console.log( "ProductList callback: ", value );
    };

    render() {
        return (
                <div className = { this.classCSS }>
                    <div className = { this.classCSS + "_left_section border" }>
                        <ProductList { ...this.prepareProductList() }/>
                    </div>
                    <div className = { this.classCSS + "_main_section" }>
                        Карточка товара
                    </div>
                </div>
            )
    }

}

export default AdminPanel;