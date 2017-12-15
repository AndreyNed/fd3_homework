'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { isExists, isNotEmpty, isNotNaN, arraySort, arraySortByField } from "../../utils/utils";

import './ProductCard.scss';

class ProductCard extends React.PureComponent {

    constructor( props ) {
        super( props );
        this.state = { ...props };
    }

    static propTypes = {
        id:             PropTypes.object,
        name:           PropTypes.object,
        price:          PropTypes.object,
        count:          PropTypes.object,
        comment:        PropTypes.object,
    };

    static defaultProps = {
        id:             {},
        name:           {},
        price:          {},
        count:          {},
        comment:        {},
    };

    componentWillMount() {
        this.prepareState( this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
    }

    prepareState = ( props ) => {
        let state = { ...ProductCard.defaultProps };
        state = ( isExists( props ) )
            ? { ...state, ...props, options: state.options }
            : null;
        state.options = ( isExists( props.options ) )
            ? { ...state.options, ...props.options }
            : null;
        this.setState( state, () => {
            console.log( 'ProductCard: prepareState: state: ', this.state );
        } );
    };

    classCSS = 'ProductCard';

    changed = ( value ) => {
        if ( this.state.cbChanged ) this.state.cbChanged( value );
    };

    // == controller ==


    // == action functions ==



    // == additional functions



    render() {
        console.log( '%c%s', 'color: red; font-weight: bold;', 'render...' );

        return (
            <div className = { this.classCSS }>
                <div className = { this.classCSS + "rows" }
                     key = { 'Row_' + 'id' }>
                    { this.state.id.defValue }
                </div>
                <div className = { this.classCSS + "rows" }
                     key = { 'Row_' + 'name' }>
                    { this.state.name.defValue }
                </div>
                <div className = { this.classCSS + "rows" }
                     key = { 'Row_' + 'price' }>
                    { this.state.price.defValue }
                </div>
                <div className = { this.classCSS + "rows" }
                     key = { 'Row_' + 'count' }>
                    { this.state.count.defValue }
                </div>
                <div className = { this.classCSS + "rows" }
                     key = { 'Row_' + 'comment' }>
                    { this.state.comment.defValue }
                </div>
            </div>
        )
    }

}

export default ProductCard;
