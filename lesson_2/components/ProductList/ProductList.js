'use strict';

import React from 'react';

import { isExists, isNotEmpty, isNotNaN } from "../../utils/utils";

import './ProductList.scss';

class ProductList extends React.PureComponent {

    constructor( props ) {
        super( props );
        this.state = { ...props };
    }

    static defaultProps = {
        listValue: [
            {
                name: 'product 1',
                id:   'p_1',
            },
            {
                name: 'product 1',
                id:   'p_2',
            },
            {
                name: 'product 1',
                id:   'p_3',
            },
            {
                name: 'product 1',
                id:   'p_4',
            },
            {
                name: 'product 1',
                id:   'p_5',
            },

        ],
    };

    componentWillMount() {
        this.prepareState( this.state );
    }

    prepareState = ( props ) => {
        let state = { ...ProductList.defaultProps };
        state = ( isExists( props ) )
            ? { ...state, ...props, options: state.options }
            : null;
        state.options = ( isExists( props.options ) )
            ? { ...state.options, ...props.options }
            : null;
        state.listValue = ( isNotEmpty( state.listValue ) )
            ? state.listValue.map( ( item, index ) => { return { ...item, filtered: true, }  } )
            : null;
        this.setState( state, () => {
            console.log( 'ProductList: prepareState: state: ', this.state );
        } );
    };

    classCSS = 'ProductList';

    itemClick = ( e ) => {
        let index = parseInt( e.currentTarget.dataset.index );
        index = ( isNotNaN( index ) )
            ? index
            : -1;
        if ( index > -1 && isNotEmpty( this.state.listValue ) )
            this.selectItem( index );

    };

    selectItem = ( index ) => {

        let listValue = this.state.listValue.map( ( item, itemIndex ) => {
            return { ...item, selected: ( itemIndex === index ) };
        } );

        this.setState( {
            listValue: listValue,
        }, () => {

        } );

    };

    render() {
        return (
            <div className = { this.classCSS }>
                <div className = { this.classCSS + "_label_box" }>
                    <label htmlFor="">

                    </label>
                </div>
                <div className = { this.classCSS + "_filter_box" }>
                    <div className = { this.classCSS + "_checkbox_container" }>
                        <input type="checkbox"/>
                    </div>
                    <div className = { this.classCSS + "_filter_container" }>
                        <input type="text"/>
                    </div>
                </div>
                <div className = { this.classCSS + "_list_box" }>
                    {
                        isNotEmpty( this.state.listValue ) &&
                            <div className = { this.classCSS + "_list" }>
                                {
                                    this.state.listValue.map( ( item, index ) => {
                                        return ( item.filtered )
                                            ? (
                                                <div className = { this.classCSS + "_list_item" }
                                                     key = { item.id }
                                                     data-index = { index }
                                                     data-selected = { item.selected }
                                                     onClick = { this.itemClick }>
                                                    { item.name }
                                                </div>
                                            )
                                            : null;
                                    } )
                                }
                            </div>

                    }
                </div>

            </div>
        )
    }

}

export default ProductList;
