'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { findArrayItemIndex, isExists, isNotEmpty, isExistsAll } from "../../utils/utils";

import './MovingList.scss';

class MovingList extends React.PureComponent {

    static DISPLAY_TYPES = {
        BLOCK:          'BLOCK',
        INLINE_BLOCK:   'INLINE_BLOCK',
        HIDDEN:         'HIDDEN',
        NONE:           'NONE',
    };

    static propTypes = {
        htmlID:                     PropTypes.string,
        withLabel:                  PropTypes.bool,
        label:                      PropTypes.string,
        display:                    PropTypes.oneOf([   // как будет отображаться компонент
            MovingList.DISPLAY_TYPES.BLOCK,
            MovingList.DISPLAY_TYPES.INLINE_BLOCK,
            MovingList.DISPLAY_TYPES.HIDDEN,
            MovingList.DISPLAY_TYPES.NONE,
        ]),
        isEdited:                   PropTypes.bool,     // режим редактирования true/false
        listValue:                  PropTypes.arrayOf(
            PropTypes.shape({
                isMoved:            PropTypes.bool,     // массив всех элементов, поле isMoved - добавляется,
                                                        // true = элемент выбран, его asValue - в массиве value
            })
        ),
        asValue:                    PropTypes.string,   // имя поля, используемого в качестве ID элемента массива
        asText:                     PropTypes.string,   // имя поля, используемого в качестве названия элемента массива
        defValue:                   PropTypes.array,    // начальный массив выбранных элементов вида:
                                                        // [ { [ asValue ]: ... },  ],
        options:                    PropTypes.shape({
            listBoxWidth:           PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            listBoxHeight:          PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
        }),
        cbChanged:                  PropTypes.func,     // callback, передает измененный value родителю
    };

    static defaultProps = {
        withLabel:                  false,
        label:                      '',
        defValue:                   null,
        isEdited:                   true,
        listValue:                  null,
        asText:                     'text',
        asValue:                    'value',
        options: {
            listBoxWidth:           0,
            listBoxHeight:          0,
        },
        cbChanged:                  null,
    };

    static classID = 0;

    static getHtmlId = ( htmlId ) => {
        return isNotEmpty( htmlId )
            ? htmlId
            : 'MovingList_' + MovingList.classID;
    };

    constructor( props ) {
        super( props );
        MovingList.classID++;
        this.state = {
            htmlID: MovingList.getHtmlId( props.htmlID ),
            selectedId: '',
        };
        this.classCSS = 'MovingList';
        this.item = null;
        this.debug_mode = (((false)));
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    componentDidUpdate() {
        this.scrollIntoView();
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'MovingList: prepareData: props: ', props );
        const {
            listValue,
            defValue,
            asValue,
            asText,
        } = props;

        // формируем state из старого и нового
        let state = { ...this.state };

        // здесь будут выбранные элементы ( важно только уникальное поле - [ asValue ] )
        state.value = ( isExists( defValue ) )
            ? [ ...defValue ]
            : defValue;

        // добавляем поле isMoved в state.listValue,
        state.listValue = ( isNotEmpty( listValue ) )
            ? listValue.map( ( item, index ) => {
                let itemIndex = ( isNotEmpty( defValue ) )
                    ? findArrayItemIndex( defValue, { [ asValue ]: item[ asValue ] } )
                    : -1;
                return {
                    ...item,
                    isMoved: ( itemIndex > -1 ),
                }
            } )
            : listValue;
        this.setState( state, () => {
            ( this.debug_mode ) &&
                console.log( "MovingList: prepareData: state: ", this.state );
        } );
    };

    /* == controller == */

    itemClick = ( e ) => {
        this.item = e.currentTarget;
        let itemId = e.currentTarget.dataset.item_id;
        this.selectItem( itemId );
    };

    itemDoubleClick = ( e ) => {
        this.moveItem();
    };

    /* == action functions == */

    selectItem = ( itemId ) => {
        this.setState( { selectedId: itemId }, () => {
            ( this.debug_mode ) &&
                console.log( 'MovingList: selectItem: selectedId: ', this.state.selectedId );
        } )
    };

    moveItem = () => {
        const { listValue, selectedId } = this.state;
        const { asValue } = this.props;
        let newListValue = listValue.map( ( item ) => {
            return {
                ...item,
                isMoved: ( item[ asValue ] + '' === selectedId) ? !item.isMoved : item.isMoved,
            }
        } );
        this.changed( newListValue );
    };

    /* == service == */

    scrollIntoView = () => {
        let id = ( isExists( this.item ) )
            ? this.item.dataset.item_id
            : "";

        let item = ( id !== "" )
            ? document.querySelector(`div[data-item_id="${ id }"]`)
            : null;

        if ( isExists( item ) ) {

            let parent = item.parentElement;

            let p = {
                top:        parent.offsetTop,
                bottom:     parent.offsetTop + parent.offsetHeight,
                height:     parent.offsetHeight,
                middle:     parent.offsetTop + ( parent.offsetHeight / 2 ),
                scrTop:     parent.scrollTop,
                scrHeight:  parent.scrollHeight,
            };

            p.scrBottom = ( p.scrHeight - p.scrTop - p.height );

            let eAbsTop = p.top - p.scrTop + item.offsetTop;

            let e = {
                top:    eAbsTop,
                bottom: eAbsTop + item.offsetHeight,
                middle: eAbsTop + ( item.offsetHeight / 2 ),
                height: item.offsetHeight,
            };

            ( this.debug_mode ) &&
            (() => {
                console.log(
                    '%c%s', 'color: green;', '****************************************'
                );
                console.log(
                    '%c%s', 'color: green;', '                 START'
                );
                console.log(
                    '%c%s', 'color: green;', 'MovingList: scrollIntoView: id: ',
                    id
                );
                console.log(
                    '%c%s', 'color: green;', 'MovingList: scrollIntoView: e: ',
                    e
                );
                console.log(
                    '%c%s', 'color: green;', 'MovingList: scrollIntoView: p: ',
                    p
                );
                console.log(
                    '%c%s', 'color: green;', '****************************************'
                );
            })();

            let delta = 0;

            if ( e.middle < p.middle ) {
                if ( e.top < p.top ) {
                    delta = ( p.middle - e.middle ) >= p.scrTop
                        ? p.scrTop
                        : p.middle - e.middle;
                }
                parent.scrollTop = parent.scrollTop - delta;
            }
            else if ( e.middle > p.middle ) {
                if ( e.bottom > p.bottom ) {
                    delta = ( e.middle - p.middle ) <= p.scrBottom
                        ? ( e.middle - p.middle )
                        : p.scrBottom;
                    parent.scrollTop += delta;
                }
            }
        }
    };

    getValue = ( list ) => {
        const { asValue } = this.props;
        let result = [];
        if ( isNotEmpty( list ) ) {
            list.forEach( ( item ) => {
                if ( item.isMoved ) {
                    result.push( { [ asValue ]: item[ asValue ] } );
                }
            } );
        }
       // return ( isNotEmpty( result ) ) ? result : null;
        return result;
    };

    changed = ( listValue ) => {
        const { cbChanged } = this.props;
        if ( cbChanged ) {
            cbChanged( this.getValue( listValue ) );
        }
        else {
            this.setState( { listValue }, () => {
                console.log( 'MovingList: new value: ( SELF )', this.getValue( this.state.listValue ) )
            } );
        }
    };

    /* == fabric of elements == */

    getChildren = ( list ) => {
        let source = [];
        let value = [];
        if ( isNotEmpty( list ) )
            for ( let i = 0; i < list.length; i++ )
            {
                if ( list[ i ].isMoved ) {
                    value.push( this.createItem( list[ i ] ) )
                }
                else {
                    source.push( this.createItem( list[ i ] ) )
                }
            }
        return {
            source: ( isNotEmpty( source ) ) ? source : null,
            value:  ( isNotEmpty( value ) ) ? value : null,
        };
    };

    createItem = ( item ) => {
        const { asValue, asText, isEdited } = this.props;
        const { selectedId } = this.state;
        return (
            <div className = { this.classCSS + "_item" }
                 key = { "item_" + item[ asValue ] }
                 data-item_id = { item[ asValue ] }
                 data-selected = { ( item[ asValue ] + '' ) === selectedId }
                 onClick = { this.itemClick }
                 onDoubleClick = { ( isEdited ) ? this.itemDoubleClick : null }>
                { item[ asText ] }
            </div>
        )
    };

    /* == render functions == */

    renderLabelBox = () => {
        const { label } = this.props;
        return (
            <div className = { this.classCSS + '_label_box' }>
                <label className = { this.classCSS + "_label" }>
                    {
                        ( isNotEmpty( label ) ) && label
                    }
                </label>
            </div>
        )
    };

    renderValueList = ( items ) => {
        const { listBoxHeight } = this.props.options;
        const { isEdited } = this.props;
        return (
            <div className = { this.classCSS + '_list_value' }
                 key="value"
                 style = {{
                     width: ( isEdited )
                         ? 'calc( 50% - 10px )'
                         : '100%',
                     height: ( listBoxHeight !== 0 )
                         ? listBoxHeight
                         : 'auto',
                 }}>
                <div className = { this.classCSS + '_list_content_box' }>
                    { items }
                </div>
            </div>
        )
    };

    renderSourceList = ( items ) => {
        const { listBoxHeight } = this.props.options;
        return (
            <div className = { this.classCSS + '_list_source' }
                 key="source"
                 style = {{
                     width: 'calc( 50% - 10px )',
                     height: ( listBoxHeight !== 0 )
                         ? listBoxHeight
                         : 'auto',
                 }}>
                <div className = { this.classCSS + '_list_content_box' }>
                    { items }
                </div>
            </div>
        )
    };

    render() {
        const { listValue } = this.state;
        const { isEdited, withLabel } = this.props;
        const { listBoxWidth } = this.props.options;
        let children = this.getChildren( listValue );
        return (
            <div className = { this.classCSS }
                 ref = { ( elm ) => ( this.list = elm ) }>
                { ( withLabel ) && this.renderLabelBox() }
                <div className = { this.classCSS + '_list_box' }
                     style = {{
                         width: ( listBoxWidth !== 0 )
                             ? listBoxWidth
                             : '100%',
                     }}>
                    { this.renderValueList( children.value ) }
                    { ( isEdited ) && this.renderSourceList( children.source ) }
                </div>
            </div>
        );
    }

}

export default MovingList;