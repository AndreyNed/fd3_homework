'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import TextInput from '../TextInput/TextInput';

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
        isVisible:      PropTypes.bool,
    };

    static defaultProps = {
        id:             {},
        name:           {},
        price:          {},
        count:          {},
        comment:        {},
        isVisible:      false,
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
            ( this.state.isVisible ) &&
            <div className = { this.classCSS }>
                <div className = { this.classCSS + "_header rows " }
                     key = { 'Row_' + 'header' }>
                    <h2>Карточка товара</h2>
                </div>
                <div className = { this.classCSS + "_row rows" }
                     key = { 'Row_' + 'id' }>
                    <TextInput { ...this.state.id }/>
                </div>
                <div className = { this.classCSS + "_row rows" }
                     key = { 'Row_' + 'name' }>
                    <TextInput { ...this.state.name }/>
                    <label className = { "invalid_field" }>
                        { this.state.name.validationMessage }
                    </label>
                </div>
                <div className = { this.classCSS + "_row rows" }
                     key = { 'Row_' + 'price' }>
                    <TextInput { ...this.state.price }/>
                    <label className = { "invalid_field" }>
                        { this.state.price.validationMessage }
                    </label>
                </div>
                <div className = { this.classCSS + "_row rows" }
                     key = { 'Row_' + 'count' }>
                    <TextInput { ...this.state.count }/>
                    <label className = { "invalid_field" }>
                        { this.state.count.validationMessage }
                    </label>
                </div>
                <div className = { this.classCSS + "_row rows" }
                     key = { 'Row_' + 'comment' }>
                    <TextInput { ...this.state.comment }/>
                    <label className = { "invalid_field" }>
                        { this.state.comment.validationMessage }
                    </label>
                </div>
            </div>
        )
    }

}

export default ProductCard;
