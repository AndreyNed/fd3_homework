"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Label from '../Label/Label';

require('./ComboInput.scss');

/*
*                  API
* ========================================
* htmlID:                 PropTypes.string,
* label:                  PropTypes.string,
* withLabel:              PropTypes.bool,
* inputType:              PropTypes.oneOf   // component with/without filter icon
        ([
            ComboInput.inputTypes.comboSimple,
            ComboInput.inputTypes.comboFilter,
        ]),
* defValue:               PropTypes.string, // default listItemValue
* listValue:              PropTypes.array,  // array [ { value: ..., text: ..., ... }, ... ]
* asValue:                PropTypes.string, // field name for value
* asText:                 PropTypes.string, // field name for text
* display:                PropTypes.string, // 'dBlock' || 'dInlineBlock' || 'dHidden' || 'dNone'
* isReadOnly:             PropTypes.bool,   // changing is not allowed
* isUpdateByDefValue:     PropTypes.bool,   // new defValue replaces old value / old state.value will not be replaced
* isFirstIsEmpty:         PropTypes.bool,   // first item in list value is empty or not
* options:                PropTypes.shape({
*     labelBoxWidth:      PropTypes.number,
*     inputBoxWidth:      PropTypes.number,
*     listBoxWidth:       PropTypes.number,
*     listBoxHeight:      PropTypes.number,
*     labelPosition:      PropTypes.string, // 'top', 'bottom', 'left', 'right'
*     labelVerticalAlign: PropTypes.string, // 'top', 'middle', 'bottom' - if labelPosition is 'left' || 'right'
* }),
* cbChanged:              PropTypes.func,
* callbacks:              PropTypes.object,
* ========================================
* */

class ComboInput extends React.PureComponent {

    static inputTypes = {
        comboSimple:        'comboSimple',
        comboFilter:        'comboFilter',
    };

    static displayTypes = {
        block:         'dBlock',
        inlineBlock:   'dInlineBlock',
        hidden:        'dHidden',
        none:          'dNone',
    };

    static propTypes = {
        htmlID:             PropTypes.string,
        label:              PropTypes.string,
        withLabel:          PropTypes.bool,
        inputType:          PropTypes.oneOf
        ([
            ComboInput.inputTypes.comboSimple,
            ComboInput.inputTypes.comboFilter,
        ]),
        defValue:           PropTypes.string,
        value:              PropTypes.string,
        editedValue:        PropTypes.string,
        listValue:          PropTypes.array,
        showList:           PropTypes.bool,
        asValue:            PropTypes.string,
        asText:             PropTypes.string,
        display:            PropTypes.oneOf([
            ComboInput.displayTypes.block,
            ComboInput.displayTypes.inlineBlock,
            ComboInput.displayTypes.hidden,
            ComboInput.displayTypes.none,
        ]),
        isReadOnly:         PropTypes.bool,
        isUpdateByDefValue: PropTypes.bool,
        isFirstIsEmpty:     PropTypes.bool,
        isFiltered:         PropTypes.bool,
        options:            PropTypes.shape({
            labelBoxWidth:       PropTypes.number,
            inputBoxWidth:       PropTypes.number,
            listBoxWidth:        PropTypes.number,
            listBoxHeight:       PropTypes.number,
            labelPosition:       PropTypes.string,
            labelVerticalAlign:  PropTypes.string,
            filterActiveColor:   PropTypes.string,
            filterInactiveColor: PropTypes.string,
            filterActiveFill:    PropTypes.string,
            filterInactiveFill:  PropTypes.string,
        }),
        cbChanged:          PropTypes.func,
        callbacks:          PropTypes.object,
    };

    static defaultProps = {
        label:              '',
        withLabel:          true,
        inputType:          ComboInput.inputTypes.comboSimple,
        isVisible:          true,
        isFiltered:         false,
        isReadOnly:         false,
        isInlineBlock:      true,
        isUpdateByDefValue: true,
        isFirstIsEmpty:     false,
        display:            ComboInput.displayTypes.inlineBlock,
        listValue:          null,
        asValue:            'value',
        asText:             'text',
        showList:           false,
        defValue:           null,
        value:              null,
        editedValue:        '',
        options:            {
            labelBoxWidth:       0,
            inputBoxWidth:       0,
            listBoxWidth:        0,
            listBoxHeight:       160,
            labelPosition:       'top',
            labelVerticalAlign:  'middle',
            filterActiveColor:   '#20AC28', // 'rgba(32,172,40,1)'
            filterInactiveColor: '#d8d8d8',
            filterActiveFill:    'rgba(32,172,40,0.1)',
            filterInactiveFill:  'none',
        },
        cbChanged:          null,
        callbacks:          {},
    };

    static classID = 0;

    static getHtmlID = ( props ) => {
        let htmlID = '';
        if ( props.htmlID !== null &&
             props.htmlID !== undefined &&
             props.htmlID.length > 0 ) {
            htmlID = props.htmlID;
        }
        else {
            htmlID = "ComboInput_" + ComboInput.classID;
        }
        return htmlID;
    };

    constructor( props ) {
        super( props );
        ComboInput.classID++;
        this.state = {
            ...props,
            htmlID: ComboInput.getHtmlID( props ),
        }
    }

    classCSS = 'ComboInputR';   // name of the className of component
    items = null;               // array for list items
    empty = 'empty';

    componentWillMount() {
        this.prepareProps( this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareProps( newProps );
    }

    componentDidMount() {
        this.doStyle();
    }

    componentDidUpdate() {
        this.doStyle();
    }

    prepareProps = ( props ) => {
        let state = {
            ...ComboInput.defaultProps,
        };
        let value = null;
        if ( props !== null &&
             props !== undefined ) {
            state = {
                ...state,
                ...props,
                options: {
                    ...state.options,
                }
            };
            if ( props.options !== null &&
                 props.options !== undefined ) {
                state.options = {
                    ...state.options,
                    ...props.options,
                }
            }
            if ( props.defValue !== null &&
                 props.defValue !== undefined /*&&
                 props.defValue.length > 0*/ ) {
                value = props.defValue;
            }
        }
        if ( !this.state.isUpdateByDefValue &&
             this.state.value !== null &&
             this.state.value !== undefined ) {
            value = this.state.value;
        }
        value = ( value !== null ) ? value : ''; // this.empty; // 'empty';
        if ( state.listValue !== null &&
             state.listValue !== undefined &&
             state.listValue.length > 0 ) {
            if ( state.isFirstIsEmpty ) {
                let firstItem = {};
                firstItem[ state.asValue ] = ''; // this.empty; // 'empty';
                firstItem[ state.asText ] = '';
                state.listValue = [ {
                    ...firstItem,
                    listItemValue: this.empty, // 'empty',
                    listItemText: '',
                } ].concat( state.listValue );
            }
            state.listValue = state.listValue.map( ( item, index ) => {
                return {
                    ...item,
                    value:         item[ state.asValue ] + '',
                    listItemIndex: index,
                    listItemValue: item[ state.asValue ] + '',
                    listItemText:  item[ state.asText ],
                    isSelected: ( item[ state.asValue ] === value ),
                }
            } );
        }
        this.setState( {
            ...state,
            value: value,
        }, () => {
            // console.log( '%c%s', 'color: blue', 'ComboInput: prepareProps: state: ', this.state );
        } );
    };

    doStyle = () => {
        this.scrollToSelected( this.state.listValue );
        // console.log( 'inputBox: ', inputBox );
    };

    changed = ( value ) => {
        if ( this.state.cbChanged ) {
            this.state.cbChanged( value )
        }
    };

    // == controller ==
    iconFilterClick = ( e ) => {
        e.stopPropagation();
        let inputBox = ReactDOM.findDOMNode( this.inputBox );
        inputBox.addEventListener( "mouseup", this.inputBoxNativeMouseUp, false );
        document.addEventListener( 'mouseup', this.documentMouseUp, false );
        this.toggleFilteredMode();
    };

    inputChange = ( e ) => {
        this.setState(
            {
                editedValue: e.currentTarget.value,
            },
            () => {
                // console.log( "inputChange: ", this.state.editedValue )
            }
        );
    };

    inputFocus = ( e ) => {
        // console.log( 'input focus: ', e.currentTarget );
        if ( this.state.isReadOnly || !this.state.isFiltered ) e.currentTarget.blur();
    };

    inputBoxNativeMouseUp = (e ) => {
        e.stopPropagation();
    };

    inputContainerClick = (e ) => {
        e.nativeEvent.stopPropagation();
        e.stopPropagation();
        this.setState( {
            showList: !this.state.showList || this.state.isFiltered,
        }, () => {
            if ( this.state.showList ) {
                this.scrollToSelected( this.state.listValue );
                let inputBox = ReactDOM.findDOMNode( this.inputBox );
                inputBox.addEventListener( "mouseup", this.inputBoxNativeMouseUp, false );
                document.addEventListener( 'mouseup', this.documentMouseUp, false );
            }
        } );
    };

    inputKeyDown = ( e ) => {
        switch( e.keyCode ) {
            case 13:
                this.setValueByFilteredFirst();
                break;
            default:
            // console.log( "key pressed: ", e.keyCode );
        }
    };

    itemClick = (e ) => {
        e.nativeEvent.stopPropagation();
        e.stopPropagation();
        let index = parseInt( e.currentTarget.dataset.index );
        index = ( this.isExists( index ) && !isNaN( index ) ) ? index : -1;
        this.selectItem( index );
    };

    documentMouseUp = (e ) => {
        document.removeEventListener( 'mouseup', this.documentMouseUp );
        if ( this.state.showList ) {
            this.setState( {
                showList: false,
                isFiltered: false,
            }, ()=>{} );
        }
    };

    // == action functions ==
    selectItem = ( index ) => {
        let listValue = null;
        let value = '';

        if ( this.isExists( index ) && !isNaN( index ) &&
            this.isExists( this.state.listValue ) &&
            this.state.listValue.length > index ) {
            listValue = this.state.listValue.map( ( item, itemIndex ) => {
                value = ( itemIndex !== index ) ? value :
                    ( item.listItemValue !== this.empty ) ? item.listItemValue : '';
                //console.log( 'selectItem: value: ', value );
                return {
                    ...item,
                    isSelected: ( itemIndex === index ),
                }
            } );
        }
        this.setState( {
            listValue:  listValue,
            value:      value,
            showList:   false,
            isFiltered: false,
        }, () => {
            // console.log( 'selectItem: listValue: ', this.state.listValue );
            // console.log( 'selectItem: state.value: ', this.state.value );
            // console.log( 'selectItem: text: ', this.getTextByArrayValue( 2, this.state.listValue, 'listItemValue', 'listItemText' ) );
            document.removeEventListener( 'mouseup', this.documentMouseUp );
            if ( this.state.isFiltered ) {
                this.input.focus();
            }
            else {
                this.input.blur();
            }
            this.changed(  this.state.value );
        } );
    };

    scrollToSelected = ( list ) => {
        let index = this.getSelectedIndex( list );
        let selected = ( index > -1 ) ? this.items[ index ] : null;
        let viewport = ( this.isExists( selected ) &&
            this.isExists( selected.parentElement ) )
            ? selected.parentElement.parentElement
            : null;
        if ( selected !== null && viewport !== null ) {
            let scrollTop = viewport.scrollTop;
            let parentHeight = selected.parentElement.parentElement.offsetHeight;
            let selectedBottom = selected.offsetTop + selected.offsetHeight;
            let delta = selectedBottom - scrollTop;
            if ( delta > parentHeight || delta < 0 ) {
                viewport.scrollTop += ( delta - parentHeight );
            }
        }
    };

    setValueByFilteredFirst = () => {
        let selectedIndex = -1;
        if ( this.isNotEmpty( this.state.listValue ) &&
            this.isNotEmpty( this.state.editedValue ) ) {
            for ( let i = 0; i < this.state.listValue.length; i++ ) {
                if ( this.isNotEmpty( this.state.listValue[ i ][ this.state.asText ] ) &&
                    this.state.listValue[ i ][ this.state.asText ]
                        .toLowerCase()
                        .indexOf( this.state.editedValue.trim().toLowerCase() ) > -1  ) {
                    selectedIndex = i;
                    break;
                }
            }
        }
        this.selectItem( selectedIndex );
    };

    toggleFilteredMode = () => {
        this.setState(
            {
                isFiltered: !this.state.isFiltered,
                showList:   !this.state.isFiltered,
            },
            () => {
                // console.log( "toggleFilteredMode: ", this.state.isFiltered );
                if ( this.state.isFiltered ) {
                    this.input.focus();
                }
                else {
                    this.input.blur();
                }
            }
        );
    };

    // == additional functions ==
    isExists = ( value ) => ( value !== null && value !== undefined );

    isNotEmpty = ( value ) => ( value !== null && value !== undefined && value.length > 0 );

    isGTZero = ( value ) => ( value !== null && value !== undefined && !isNaN( value ) && value > 0 );

    getTextByArrayValue = ( value, list, fieldValue, fieldText ) => {
        let text = '';
        if ( this.isNotEmpty( value ) &&
            this.isNotEmpty( list ) &&
            this.isNotEmpty( fieldValue ) &&
            this.isNotEmpty( fieldText ) ) {
            list.forEach( ( item ) => {
                text = ( item[ fieldValue ] === value ) ?
                    item[ fieldText ] : text;
            } );
        }
        return text;
    };

    getSelectedIndex = ( list ) => {
        let result = -1;
        if ( this.isNotEmpty( list ) ) {
            list.forEach( ( item, index ) => {
                result = ( item.isSelected ) ? result = index : result;
            } );
        }
        return result;
    };

    // == render functions ==
    renderLabel = () => {
        return (
            ( this.state.withLabel ) &&
            <div className = { this.classCSS + "_label_box" }
                 key = { "label_box" }
                 style = {{
                     width: ( this.isGTZero( this.state.options.labelBoxWidth ) ) ?
                         this.state.options.labelBoxWidth : 'auto',
                 }}
                 data-label_vertical_align = { this.state.options.labelVerticalAlign || 'middle' }>
                {
                    ( this.isNotEmpty( this.state.label ) ) ?
                        <Label postfixClassName = { this.classCSS }
                               htmlFor = { this.state.htmlID }
                               label =   { this.state.label }/> : null
                }
            </div>
        )
    };

    renderItems = () => {
        this.items = null;
        this.items = [];
        return ( this.isNotEmpty( this.state.listValue ) ) ?
            this.state.listValue.map( ( item, index ) => {
                return (
                    (
                        ( this.state.isFiltered &&
                        this.isNotEmpty( this.state.editedValue ) &&
                        this.isExists( item[ this.state.asText ] ) &&
                        item[ this.state.asText ]
                            .toLowerCase()
                            .indexOf( this.state.editedValue.toLowerCase() ) > -1 )
                        || this.state.isFiltered && !this.isNotEmpty( this.state.editedValue )
                        || !this.state.isFiltered
                    ) &&
                    <li className = { this.classCSS + "_item" }
                        key = { this.state.htmlID + '_' + index }
                        ref = { ( elm ) => { this.items[ index ] = elm } }
                        data-value =    { item.listItemValue }
                        data-index =    { item.listItemIndex }
                        data-selected = { item.isSelected }
                        onClick =       { this.itemClick }>
                        { item.listItemText }
                    </li>
                )
            } ) : null;
    };

    renderInputBox = () => {
        return (
            <div className = { this.classCSS + "_input_box" }
                 key = { "input_box" }
                 ref = { ( elm ) => { this.inputBox = elm } }
                 onClick = { this.inputBoxClick }
                 style = {{
                     width: ( this.isGTZero( this.state.options.inputBoxWidth ) ) ?
                         this.state.options.inputBoxWidth : 'auto',
                 }}
                 data-label_vertical_align = { this.state.options.labelVerticalAlign || 'middle' }>
                <div className = { this.classCSS + "_input_container" }
                     key = { "input_box_" + 1 }
                     onClick = { ( !this.state.isReadOnly ) ? this.inputContainerClick : null }>
                    <input type = "text"
                           className = { this.classCSS + "_input" }
                           id = { this.state.htmlID }
                           ref = { ( elm ) => { this.input = elm } }
                           value = { ( this.state.isFiltered )
                               ? ( this.state.editedValue || '' )
                               : this.getTextByArrayValue(
                               this.state.value,
                               this.state.listValue,
                               'listItemValue', // this.state.asValue,
                               this.state.asText ) }
                           data-readonly = { this.state.isReadOnly }
                           data-filter =   { this.state.inputType === ComboInput.inputTypes.comboFilter }
                           onFocus = { this.inputFocus }
                           onChange = { this.inputChange }
                           onKeyDown = { this.inputKeyDown }/>
                    {
                        ( this.state.inputType === ComboInput.inputTypes.comboFilter && !this.state.isReadOnly ) &&
                        <div className = { this.classCSS + "_icon_filter_container" }
                             onClick =   { ( !this.state.isReadOnly ) ? this.iconFilterClick : ()=>{} }
                             data-is_enable = { !this.state.isReadOnly }>
                            <svg width =   "16px"
                                 height =  "16px"
                                 viewBox = "0 0 64 64"
                                 preserveAspectRatio = "none"
                                 xmlns = "http://www.w3.org/2000/svg">
                                <g>
                                    <circle cx="32" cy="32" r="31.5"
                                            stroke = "#e2e2e2"
                                            strokeWidth = "1"
                                            fill = "#ffffff"/>
                                    <path d="M 10 10 H 54 L 36 34 V 59 L 28 55 V 34 Z"
                                          stroke={ ( this.state.isFiltered )
                                              ? this.state.options.filterActiveColor
                                              : this.state.options.filterInactiveColor }
                                          strokeWidth = { 2 }
                                          fill =        { ( this.state.isFiltered )
                                              ? this.state.options.filterActiveFill
                                              : this.state.options.filterInactiveFill }/>
                                    {
                                        ( !this.state.isFiltered ) &&
                                        <path d="M 20 54 L 44 34 M 20 34 L 44 54"
                                              stroke = "#ff0000"
                                              strokeWidth = { 4 }/>
                                    }
                                </g>
                            </svg>
                        </div>
                    }
                    <div className = { this.classCSS + "_icon_container" }
                         data-readonly = { this.state.isReadOnly }>
                        <svg width =   "16px"
                             height =  "16px"
                             viewBox = "0 0 16 16"
                             preserveAspectRatio = "none"
                             xmlns = "http://www.w3.org/2000/svg">
                            <g>
                                <circle cx="8" cy="8" r="8"
                                        stroke = "#f2f2f2"
                                        strokeWidth = "1"
                                        fill = "#ffffff"/>
                                <path d = "M 4 6 L 8 10 L 12 6"
                                      stroke = "#6E6E6E"
                                      strokeWidth = "1"
                                      fill = "none"
                                      transform = { ( this.state.showList || this.state.isFiltered )
                                      	  ? "rotate(0, 8, 8)"
                                      	  : "rotate(90, 8, 8)" }/>
                            </g>
                        </svg>
                    </div>
                </div>
                {
                    ( this.isNotEmpty( this.state.listValue ) ) ?
                        <div className = { this.classCSS + "_list_container" }
                             key = { "input_box_" + 2 }
                             style = {{
                                 width: ( this.isGTZero( this.state.options.listBoxWidth ) ) ?
                                     this.state.options.listBoxWidth : '100%',
                                 height: ( this.isGTZero( this.state.options.listBoxHeight ) ) ?
                                     this.state.options.listBoxHeight : 'auto',
                             }}
                             data-show_list = { this.state.showList || this.state.isFiltered }>
                            <ul className = { this.classCSS + '_list' }>
                                { this.renderItems() }
                            </ul>
                        </div> : null
                }

            </div>
        )
    };

    renderIfLeftOrTop = () => {
        return [
            this.renderLabel(),
            this.renderInputBox(),
        ]
    };

    renderIfRightOrBottom = () => {
        return [
            this.renderInputBox(),
            this.renderLabel(),
        ]
    };

    render() {
        return (
            <div className = { this.classCSS + ' ' + ( this.state.options.addedClass || '' ) }
                 data-display = { this.state.display || ComboInput.displayTypes.block }
                 data-label_position = { this.state.options.labelPosition || 'top' }>
                {
                    ( this.state.options.labelPosition === 'top' ||
                      this.state.options.labelPosition === 'left' ) ?
                        this.renderIfLeftOrTop() : this.renderIfRightOrBottom()
                }

            </div>
        )
    }

}

export default ComboInput;
