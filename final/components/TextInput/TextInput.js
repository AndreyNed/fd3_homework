"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import Label from '../Label/Label';
import { isExists, isNotEmpty } from "../../utils/utils";

import './TextInput.scss';

/*
*                    API
* ===========================================
* htmlID:                 PropTypes.string,
* label:                  PropTypes.string,
* withLabel:              PropTypes.bool,
* inputType:              PropTypes.string, // 'text', 'search'
* defValue:               PropTypes.string, // default listItemValue
* display:                PropTypes.string, // 'dBlock' || 'dInlineBlock' || 'dHidden' || 'dNone'
* isReadOnly:             PropTypes.bool,   // changing is not allowed
* isUpdateByDefValue:     PropTypes.bool,   // new defValue replaces old value / old state.value will not be replaced
* options:                PropTypes.object,
*     labelBoxWidth:      PropTypes.number,
*     inputBoxWidth:      PropTypes.number,
*     labelPosition:      PropTypes.string, // 'top', 'bottom', 'left', 'right'
*     labelVerticalAlign: PropTypes.string, // 'top', 'middle', 'bottom' - if labelPosition is 'left' || 'right'
* cbChanged:              PropTypes.func,
* callbacks:              PropTypes.object,
*     cbSearched:         PropTypes.func,
* */

class TextInput extends React.PureComponent {

    static inputTypes = {
        text:                   'text',
        search:                 'search',
    };

    static displayTypes = {
        block:                  'dBlock',
        inlineBlock:            'dInlineBlock',
        hidden:                 'dHidden',
        none:                   'dNone',
    };

    static position = {
        top:                    'top',
        bottom:                 'bottom',
        left:                   'left',
        right:                  'right',
        middle:                 'middle',
    };

    static propTypes = {
        htmlID:                 PropTypes.string,
        label:                  PropTypes.string,
        withLabel:              PropTypes.bool,
        inputType:              PropTypes.string,
        defValue:               PropTypes.string,
        value:                  PropTypes.string,
        currValue:              PropTypes.string,
        display:                PropTypes.string,
        isReadOnly:             PropTypes.bool,
        isUpdateByDefValue:     PropTypes.bool,
        options:                PropTypes.shape({
            labelBoxWidth:      PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            inputBoxWidth:      PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            labelPosition:      PropTypes.string,
            labelVerticalAlign: PropTypes.string,
        }),
        cbChanged:              PropTypes.func,
        callbacks:              PropTypes.object,
        cbSearched:             PropTypes.func,
    };

    static defaultProps = {
        label:                  '',
        withLabel:              true,
        inputType:              TextInput.inputTypes.text,
        isReadOnly:             false,
        isUpdateByDefValue:     true,
        display:                TextInput.displayTypes.inlineBlock,
        defValue:               null,
        value:                  null,
        currValue:              null,
        options:                {
            labelBoxWidth:      0,
            inputBoxWidth:      0,
            labelPosition:      TextInput.position.top,
            labelVerticalAlign: TextInput.position.middle,
        },
        cbChanged:              null,
        callbacks:              {
            cbSearched:         null,
        },
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
            htmlID = "TextInput_" + TextInput.classID;
        }
        return htmlID;
    };

    constructor( props ) {
        super( props );
        TextInput.classID++;
        this.state = {
            ...props,
            htmlID: TextInput.getHtmlID( props ),
        };
        this.classCSS = 'TextInput';   // name of the className of component
    }

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
            ...TextInput.defaultProps,
        };
        let value = null;
        if ( this.isExists( props ) ) {
            state = {
                ...state,
                ...props,
                options: {
                    ...state.options,
                }
            };
            if ( this.isExists( props.options ) ) {
                state.options = {
                    ...state.options,
                    ...props.options,
                }
            }
            if ( this.isExists( props.defValue ) ) {
                value = props.defValue;
            }
        }
        if ( !this.state.isUpdateByDefValue &&
            this.isExists( this.state.value ) ) {
            value = this.state.value;
        }
        value = ( value !== null ) ? value : '';

        this.setState( {
            ...state,
            value: value,
            currValue: value,
        }, () => {
            // console.log( '%c%s', 'color: blue', 'TextInput: prepareProps: state: ', this.state );
        } );
    };

    doStyle = () => {
        if ( this.state.isReadOnly ) {
            this.input.setAttribute("readonly", "readonly");
        }
        else if ( this.input.hasAttribute( "readonly" ) ) {
            this.input.removeAttribute( "readonly" );
        }
    };

    changed = ( value ) => {
        if ( !this.state.readOnly && this.state.cbChanged ) {
            this.state.cbChanged( value )
        }
    };

    // == controller ==
    inputChange = ( e ) => {
        this.setState( {
            currValue: e.currentTarget.value,
        }, ()=>{
            // console.log( 'TextInput: inputChange: state.currValue: ', this.state.currValue );
        } );
    };

    inputBlur = ( e ) => {
        this.setState( {
            value: this.state.currValue,
        }, ()=>{
            this.changed( this.state.value );
        } );
    };

    inputKeyDown = ( e ) => {
        switch( e.keyCode ) {
            case 13:
                let elm = e.currentTarget;
                elm.blur();
                elm.focus();
                break;
            case 27:
                if ( e.currentTarget.value === this.state.value ) {
                     e.currentTarget.blur();
                }
                else {
                    this.cancelLastInput();
                }
                break ;
        }
    };

    iconSearchClick = ( e ) => {
        this.saveAndSearch();
    };

    crossMouseDown = () => {
        this.clearValue();
    };

    // == action functions ==
    cancelLastInput = () => {
        this.setState( {
            currValue: this.state.value,
        }, ()=>{
            //console.log( 'TextInput: inputChange: state.currValue: ', this.state.currValue );
        } );
    };

    saveAndSearch = () => {
        this.setState( {
            value: this.state.currValue,
        }, ()=>{
            if ( this.state.callbacks.cbSearched ) this.state.callbacks.cbSearched( this.state.value );
            // console.log( 'TextInput: saveAndSearch: ', this.state.value );
        } );
    };

    clearValue = () => {
        this.setState( {
            value: '',
            currValue: '',
        }, () => {
            this.changed( this.state.value );
        } );
    };

    // == additional functions ==
    isExists = ( value ) => ( value !== null && value !== undefined );

    isNotEmpty = ( value ) => ( value !== null && value !== undefined && value.length > 0 );

    isGTZero = ( value ) => ( value !== null && value !== undefined && !isNaN( value ) && value > 0 );

    // == render functions ==
    renderLabel = () => {
        const { labelBoxWidth, labelVerticalAlign } = this.props.options;
        const { label } = this.props;
        const { htmlID } = this.state;
        const { middle, bottom, top, right, left } = TextInput.position;
        return (
            ( this.state.withLabel ) &&
            <div className = { this.classCSS + "_label_box" }
                 key = { "label_box" }
                 style = {{
                     width: ( isExists( labelBoxWidth ) && labelBoxWidth !== 0 )
                         ? labelBoxWidth
                         : 'auto',
                 }}
                 data-label_vertical_align = { labelVerticalAlign || middle }>
                {
                    ( isNotEmpty( label ) ) ?
                        <Label postfixClassName = { this.classCSS }
                               htmlFor = { htmlID }
                               label =   { label }/> : null
                }
            </div>
        )
    };

    renderInputBox = () => {
        const { inputBoxWidth, labelVerticalAlign } = this.props.options;
        const { isReadOnly, inputType } = this.props;
        const { htmlID, currValue } = this.state;
        const { middle } = TextInput.position;
        const { search } = TextInput.inputTypes;
        return (
            <div className = { this.classCSS + "_input_box" }
                 key = { "input_box" }
                 ref = { ( elm ) => { this.inputBox = elm } }
                 onClick = { this.inputBoxClick }
                 style = {{
                     width: ( isExists( inputBoxWidth ) && inputBoxWidth !== 0 )
                         ? inputBoxWidth
                         : 'auto',
                 }}
                 data-label_vertical_align = { labelVerticalAlign || middle }>
                <div className = { this.classCSS + "_input_container" }
                     key = { "input_box_" + 1 }
                     onClick = { ( !isReadOnly ) ? this.inputContainerClick : null }>
                    <input type =      "text"
                           className = { this.classCSS + "_input" }
                           id =        { htmlID }
                           ref =       { ( elm ) => { this.input = elm } }
                           disabled =  { ( isReadOnly ) ? 'disabled' : null }
                           value =     { currValue || '' }
                           data-input_type = { inputType }
                           data-cross = { ( inputType === search && isNotEmpty( currValue ) ) ? 'true' : 'false' }
                           onChange =  { ( !isReadOnly ) ? this.inputChange : null }
                           onBlur =    { this.inputBlur }
                           onKeyDown = { this.inputKeyDown }/>
                    {
                        ( inputType === search && isNotEmpty( currValue ) ) &&
                        <div className = { this.classCSS + "_cross_container" }
                             onMouseDown = { ( !isReadOnly ) ? this.crossMouseDown : null }
                             data-is_enable = { !isReadOnly }>
                            <svg width =   "16px"
                                 height =  "16px"
                                 viewBox = "0 0 16 16"
                                 preserveAspectRatio = "xMidYMid meet"
                                 xmlns = "http://www.w3.org/2000/svg">
                                <g>
                                    <circle cx="8" cy="8" r="8"
                                            stroke = "#ffffff"
                                            strokeWidth = "1"
                                            fill = "#ffffff"/>
                                    <path d = "M 4 4 L 12 12 M 4 12 L 12 4"
                                          stroke = "#6E6E6E"
                                          strokeWidth = "1"
                                          fill = "none"/>
                                </g>
                            </svg>
                        </div>
                    }
                    {
                        ( inputType === search ) &&
                        <div className = { this.classCSS + "_icon_container" }
                             onClick =   { ( !isReadOnly ) ? this.iconSearchClick : null }
                             data-is_enable = { !isReadOnly }>
                            <svg width =   "16px"
                                 height =  "16px"
                                 viewBox = "0 0 16 16"
                                 preserveAspectRatio = "none"
                                 xmlns = "http://www.w3.org/2000/svg">
                                <g>
                                    <circle cx="6" cy="6" r="5"
                                            stroke = "#6e6e6e"
                                            strokeWidth = "1"
                                            fill = "none"/>
                                    <path d = "M 9 10 L 13 15.5"
                                          stroke = "#6E6E6E"
                                          strokeWidth = "1"
                                          fill = "none"/>
                                </g>
                            </svg>
                        </div>
                    }
                </div>
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
        const { addedClass, labelPosition } = this.props.options;
        const { display } = this.props;
        const { block } = TextInput.displayTypes;
        const { top, left } = TextInput.position;
        return (
            <div className = { this.classCSS + ' ' + ( addedClass || '' ) }
                 data-display = { display || block }
                 data-label_position = { labelPosition || top }>
                {
                    ( labelPosition === top ||
                      labelPosition === left ) ?
                      this.renderIfLeftOrTop() : this.renderIfRightOrBottom()
                }

            </div>
        )
    }

}

export default TextInput;
