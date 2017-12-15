'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { isExists, isNotEmpty, isNotNaN, isGTZero, arraySort, arraySortByField } from "../../utils/utils";

import './ProductList.scss';

class ProductList extends React.PureComponent {

    constructor( props ) {
        super( props );
        this.state = { ...props };
    }

    static propTypes = {
        isSorted:           PropTypes.bool,
        defValue:           PropTypes.string,
        value:              PropTypes.string,
        listValue:          PropTypes.arrayOf(
            PropTypes.shape({
                id:         PropTypes.string,
                name:       PropTypes.string,
                price:      PropTypes.number,
                count:      PropTypes.number,
                comment:    PropTypes.string,
                filtered:   PropTypes.bool,
            })
        ),
        filterValue:        PropTypes.string,
        options:            PropTypes.shape({
            listBoxHeight:  PropTypes.number,
        }),
        cbItemClicked:      PropTypes.func,
        cbCheckboxClicked:  PropTypes.func,
    };

    static defaultProps = {
        isSorted:           false,
        listValue:          null,
        filterValue:        '',
        options: {
            listBoxHeight:  0,
        },
        cbItemClicked:      null,
        cbCheckboxClicked:  null,
    };

    componentWillMount() {
        this.prepareState( this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
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
            ? state.listValue.map( ( item, index ) => {
                return {...item, itemIndex: index, filtered: true }
              } )
            : null;
        state.value = ( isNotEmpty( state.defValue ) )
            ? state.defValue
            : '';
        this.setState( state, () => {
            console.log( 'ProductList: prepareState: state: ', this.state );
        } );
    };

    classCSS = 'ProductList';

    // == controller ==

    itemClick = ( e ) => {
        let index = parseInt( e.currentTarget.dataset.index );
        index = ( isNotNaN( index ) )
            ? index
            : -1;
        if ( index > -1 && isNotEmpty( this.state.listValue ) )
            this.selectItem( index );

    };

    checkboxChange = ( e ) => {
        if ( this.state.cbCheckboxClicked )
            this.state.cbCheckboxClicked( !this.state.isSorted );
        /*this.setState( {
            isSorted: !this.state.isSorted,
        }, () => {
            console.log( "isSorted: ", this.state.isSorted );
        } );*/
    };

    filterChange = ( e ) => {
        this.setState( {
            filterValue: e.currentTarget.value,
        }, () => {
            console.log( "filterValue: ", this.state.filterValue );
        } );
    };

    // == action functions ==

    selectItem = ( index ) => {
        let value = '';
        let listValue = this.state.listValue.map( ( item, itemIndex ) => {
            value = ( itemIndex === index )
                ? item.id
                : value;
            return { ...item, selected: ( itemIndex === index ) };
        } );

        this.setState( {
            value:     value,
            listValue: listValue,
        }, () => {
            if ( this.state.cbItemClicked )
                this.state.cbItemClicked( this.state.value );
        } );
    };

    // == additional functions

    filterItem = (obj, field, filterValue ) => {
        console.log( 'filterItem: ', ( isExists( obj ) && isNotEmpty( field ) ) );
        console.log( 'filterItem: ',  ( filterValue.indexOf( obj[ field ].trim() ) > -1 ) );
        return ( !isNotEmpty( filterValue ) )
            ? true
            : ( isExists( obj ) && isNotEmpty( field ) && ( obj[ field ].trim().indexOf( filterValue.trim() ) > -1 ) );
    };

    render() {
        console.log( '%c%s', 'color: red; font-weight: bold;', 'render...' );
        let listSortedValue = null;
        if ( isNotEmpty( this.state.listValue ) ) {
            listSortedValue = ( this.state.isSorted )
                ? arraySortByField( this.state.listValue, 'name' )
                : [ ...this.state.listValue ];
        }
        console.log( 'render: listSortedValue', listSortedValue );
        return (
            <div className = { this.classCSS }>
                <div className = { this.classCSS + "_label_box" }>
                    <label htmlFor="">

                    </label>
                </div>
                <div className = { this.classCSS + "_filter_box" }>
                    <div className = { this.classCSS + "_checkbox_container" }>
                        <input className = { this.classCSS + "_checkbox" }
                               type="checkbox"
                               checked =  { this.state.isSorted }
                               onChange = { this.checkboxChange }/>
                    </div>
                    <div className = { this.classCSS + "_filter_container" }>
                        <input className = { this.classCSS + "_filter" }
                               type =      "text"
                               value =     { this.state.filterValue }
                               onChange =  { this.filterChange }/>
                    </div>
                </div>
                <div className = { this.classCSS + "_list_box" }
                     style = {{
                         height: ( isGTZero( this.state.options.listBoxHeight > 0 ) )
                             ? this.state.options.listBoxHeight
                             : 'auto',
                     }}>
                    {
                        isNotEmpty( listSortedValue ) &&
                            <div className = { this.classCSS + "_list" }>
                                {
                                    listSortedValue.map( ( item, index ) => {
                                        console.log( "filter result: ", this.filterItem( item, 'name', this.state.filterValue ) );
                                        return ( this.filterItem( item, 'name', this.state.filterValue ) )
                                            ? (
                                                <div className = { this.classCSS + "_list_item" }
                                                     key = { item.id }
                                                     data-value = { item.id }
                                                     data-index = { item.itemIndex }
                                                     data-selected = { item.id === this.state.value } // { item.selected }
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
