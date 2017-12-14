'use strict';

import React from 'react';

import ProductList from '../ProductList/ProductList';

import './AdminPanel.scss';

class AdminPanel extends React.PureComponent {

    classCSS = 'AdminPanel';

    render() {
        return (
                <div className = { this.classCSS }>
                    <div className = { this.classCSS + "_left_section border" }>
                        <ProductList />
                    </div>
                    <div className = { this.classCSS + "_main_section" }>
                        Карточка товара
                    </div>
                </div>
            )
    }

}

export default AdminPanel;