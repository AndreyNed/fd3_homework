"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import Label from '../Label/Label';
import {isExists, isNotNaN, isNotEmpty} from "../../utils/utils";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_NUMBER_INPUT } from "../../config/config";

import './NumberInput.scss';

/*
*                    API
* ===========================================
* htmlID:                 PropTypes.string,
* label:                  PropTypes.string,
* withLabel:              PropTypes.bool,
* defValue:               PropTypes.number, // default listItemValue
* display:                PropTypes.string, // 'dBlock' || 'dInlineBlock' || 'dHidden' || 'dNone'
* isReadOnly:             PropTypes.bool,   // changing is not allowed
* isUpdateByDefValue:     PropTypes.bool,   // new defValue replaces old value / old state.value will not be replaced
* options:                PropTypes.object,
*     labelBoxWidth:      PropTypes.number,
*     inputBoxWidth:      PropTypes.number,
*     labelPosition:      PropTypes.string, // 'top', 'bottom', 'left', 'right'
*     labelVerticalAlign: PropTypes.string, // 'top', 'middle', 'bottom' - if labelPosition is 'left' || 'right'
* cbChanged:              PropTypes.func,
* */

class NumberInput extends React.PureComponent {

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
        defValue:               PropTypes.number,
        value:                  PropTypes.number,
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
    };

    static defaultProps = {
        label:                  '',
        withLabel:              true,
        isReadOnly:             false,
        isUpdateByDefValue:     true,
        display:                NumberInput.displayTypes.inlineBlock,
        defValue:               0,
        // currValue:              '0',
        options:                {
            labelBoxWidth:      0,
            inputBoxWidth:      0,
            labelPosition:      NumberInput.position.top,
            labelVerticalAlign: NumberInput.position.middle,
        },
        cbChanged:              null,
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
            htmlID = "NumberInput_" + NumberInput.classID;
        }
        return htmlID;
    };

    constructor( props ) {
        super( props );
        NumberInput.classID++;
        this.state = {
            htmlID: NumberInput.getHtmlID( props ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_NUMBER_INPUT;
        this.classCSS = 'NumberInput';
    }

    componentWillMount() {
        this.prepareProps( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareProps( newProps );
    }

    prepareProps = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'NumberInput: prepareProps: ', props );
        let value = 0;
        if ( isExists( props ) ) {
            if ( isExists( props.defValue ) ) {
                value = props.defValue;
            }
        }
        if ( !props.isUpdateByDefValue &&
            isExists( this.state.value ) ) {
            value = this.state.value;
        }
        value = ( value !== null ) ? value : 0;

        this.setState( {
            value: value,
            currValue: this.formatInput( value ).string,
        }, () => {
            ( this.debug_mode ) && console.log( '%c%s', 'color: blue', 'NumberInput: prepareProps: state: ', this.state );
        } );
    };

    /*doStyle = () => {
        if ( this.state.isReadOnly ) {
            this.input.setAttribute("readonly", "readonly");
        }
        else if ( this.input.hasAttribute( "readonly" ) ) {
            this.input.removeAttribute( "readonly" );
        }
    };*/

    changed = () => {
        // console.log("CHANGED");

        const { cbChanged } = this.props;
        const { currValue } = this.state;

        let valueObj = this.formatInput( currValue );
        if ( isExists( cbChanged ) ) {
            this.setState( { currValue: valueObj.string }, () => {
                cbChanged( valueObj.number );
            } );
        }
        else {
            this.setState( {
                value:     valueObj.number,
                currValue: valueObj.string,
            } );
        }
    };

    // == controller ==
    inputChange = ( e ) => {
        this.setState( {
            currValue: e.currentTarget.value,
        }, ()=>{
            ( this.debug_mode ) &&
            console.log( 'NumberInput: inputChange: state.currValue: ', this.state.currValue );
        } );
    };

    inputBlur = ( e ) => {
        // console.log("BLUUUR");
        this.changed();
    };

    inputFocus = ( e ) => {
        const { value, currValue } = this.state;
        this.setState( {
            currValue: value,
        }, () => {
            ( this.debug_mode ) &&
                console.log( `NumberInput: inputFocus: currValue: ${this.state.currValue}, value: ${ this.state.value }` );
        } );
    };

    inputKeyDown = ( e ) => {
        switch( e.keyCode ) {
            case 13:
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.blur();
                break;
            case 27:
                let re = new RegExp( /[\,]/ );
                let value = e.currentTarget.value.replace( re, '.' );
                // value = parseFloat( value );
                if ( value == this.state.value ) {
                    e.currentTarget.blur();
                }
                else {
                    this.cancelLastInput();
                }
                break ;
        }
    };

    // == action functions ==
    cancelLastInput = () => {
        this.setState( {
            currValue: this.formatInput( this.state.value ).string,
        }, ()=>{
            console.log( 'NumberInput: inputChange: state.currValue: ', this.state.currValue );
        } );
    };

    setValue = ( callback ) => {
        const { currValue } = this.state;
        let valueObj = this.formatInput( currValue );
        this.setState( {
            value:     valueObj.number,
            currValue: valueObj.string,
        }, isExists( callback ) && callback );
    };

    // == additional functions ==
    isGTZero = ( value ) => ( value !== null && value !== undefined && !isNaN( value ) && value > 0 );

    formatInput = ( valueArg ) => {
        let value = valueArg + '';
        let re = new RegExp(/[ ]+/gi);
        value = value.replace( re, '' );

        // console.log( `formatInput: valueArg: ${valueArg}, value: ${value}` );

        re = new RegExp( /[\,]/ );
        value = value.replace( re, '.' );
        value = parseFloat( value );
        if ( !isNotNaN( value ) ) { value = 0 }
        value = Math.round( value * 100 ) / 100;
        let string = new Intl.NumberFormat( 'ru-RU', { maximumFractionDigits: 2 } ).format( value );

        return { number: value, string: string }
    };

    // == render functions ==
    renderLabel = () => {
        const { htmlID } = this.state;
        const { label, withLabel } = this.props;
        const { labelBoxWidth, labelVerticalAlign } = this.props.options;
        return (
            ( withLabel ) &&
            <div className = { this.classCSS + "_label_box" }
                 key = { "label_box" }
                 style = {{
                     width: ( isExists( labelBoxWidth ) && labelBoxWidth !== 0 )
                         ? labelBoxWidth
                         : 'auto',
                 }}
                 data-label_vertical_align = { labelVerticalAlign || 'middle' }>
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
        const { isReadOnly } = this.props;
        const { inputBoxWidth, labelVerticalAlign } = this.props.options;
        const { currValue, htmlID } = this.state;
        return (
            <div className = { this.classCSS + "_input_box" }
                 key = { "input_box" }
                 style = {{
                     width: ( isExists( inputBoxWidth ) && inputBoxWidth !== 0 )
                         ? inputBoxWidth
                         : 'auto',
                 }}
                 data-label_vertical_align = { labelVerticalAlign || NumberInput.position.middle }>
                <div className = { this.classCSS + "_input_container" }
                     key = { "input_box_" + 1 }>
                    <input type =      "text"
                           className = { this.classCSS + "_input" }
                           id =        { htmlID }
                           ref =       { ( elm ) => { this.input = elm } }
                           disabled =  { isReadOnly }
                           value =     { currValue || '0' }
                           onChange =  { ( !isReadOnly ) ? this.inputChange : null }
                           onBlur =    { ( !isReadOnly ) ? this.inputBlur : null }
                           onFocus =   { ( !isReadOnly ) ? this.inputFocus : null }
                           onKeyDown = { this.inputKeyDown }/>
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
        const { display } = this.props;
        const { none } = NumberInput.displayTypes;
        const { labelPosition, addedClass } = this.props.options;

        return ( isNotEmpty( display ) && display !== none ) &&
            <div className = { this.classCSS + ' ' + ( addedClass || '' ) }
                 data-display = { display || NumberInput.displayTypes.block }
                 data-label_position = { labelPosition || NumberInput.position.top }>
                {
                    ( labelPosition === NumberInput.position.top ||
                      labelPosition === NumberInput.position.left ) ?
                        this.renderIfLeftOrTop() : this.renderIfRightOrBottom()
                }
            </div>
    }

}

export default NumberInput;
