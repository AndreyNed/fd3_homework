"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Label from '../Label/Label';

require( './NumberInput.scss' );

class NumberInput extends React.PureComponent {

    static defaultProps = {
        options: {
            labelPosition: 'top',
            labelBoxWidth: 0,
            inputBoxWidth: 0,
        }
    };

    static propTypes = {
        htmlID:         PropTypes.string,
        placeholder:    PropTypes.string,
        label:          PropTypes.string,
        labelPosition:  PropTypes.string,
        labelBoxWidth:  PropTypes.number,
        inputBoxWidth:  PropTypes.number,
        value:          PropTypes.number,
        defValue:       PropTypes.number,
        options:        PropTypes.object,
        cbChanged:      PropTypes.func,
    };

    static classID = 0;

    static getHtmlID = ( props ) => {
        let htmlID = '';
        if ( props.htmlID && props.htmlID.length > 0 ) {
            htmlID = props.htmlID;
        } else {
            htmlID = 'NumberInput_' + NumberInput.classID;
        }
        return htmlID;
    };

    constructor( props ) {
        super( props );
        NumberInput.classID++;
        this.state = {
            ...props,
            htmlID: NumberInput.getHtmlID( props ),
        }
    }

    componentWillMount() {
        this.prepareProps( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareProps( newProps );
    }

    componentDidMount() {
        this.doStyle();
        this.inputElm.value = this.formatInput( this.state.value ).string;
    }

    componentDidUpdate() {
        this.doStyle();
        this.inputElm.value = this.formatInput( this.state.value ).string;
    }

    prepareProps = ( props ) => {
        let value = 0;
        let newState = {
            ...NumberInput.defaultProps,
            options: {
                ...NumberInput.defaultProps.options,
            },
        };
        if ( props !== null &&
             props !== undefined ) {
            newState = {
                ...newState,
                ...props,
                options: {
                    ...newState.options,
                }
            };
            if ( props.options !== null &&
                 props.options !== undefined ) {
                newState.options = {
                    ...newState.options,
                    ...props.options,
                }
            }
            if ( props.defValue !== null &&
                 props.defValue !== undefined &&
                 !isNaN( props.defValue ) ) {
                value = props.defValue;
            }
        }
        if ( this.state.value !== null &&
             this.state.value !== undefined &&
             !isNaN( this.state.value ) ) {
            value = this.state.value;
        }
        this.setState( {
            ...newState,
            value: value,
        }, () => {
            //console.log( 'prepareProps: state: ', this.state );
        } );
    };

    doStyle = () => {
        if ( this.state.options.labelBoxWidth &&
            this.state.options.labelBoxWidth > 0 ) {
            this.labelBox.style.width = this.state.options.labelBoxWidth + 'px';
        }
        if ( this.state.options.inputBoxWidth &&
            this.state.options.inputBoxWidth > 0 ) {
            this.inputBox.style.width = this.state.options.inputBoxWidth + 'px';
        }
        if ( this.state.options.labelPosition &&
            this.state.options.labelPosition.length > 0 ) {
            switch( this.state.options.labelPosition ) {
                case 'left':
                    this.numberInput.style.width = 'auto';
                    break;
                default:
                    let lBox = ReactDOM.findDOMNode( this.labelBox );
                    let iBox = ReactDOM.findDOMNode( this.inputBox );
                    let lBoxRect = lBox.getBoundingClientRect();
                    let iBoxRect = iBox.getBoundingClientRect();
                    let width = ( lBoxRect.width > iBoxRect.width ) ?
                        lBoxRect.width : iBoxRect.width;
                    this.numberInput.style.width = width + 'px';
            }
        }
    };

    // == controller ==
    onBlurInput = ( e ) => {
        e.stopPropagation();
        let value = this.formatInput( e.target.value );
        this.inputElm.value = value.string;
        this.setState( { value: value.number },
            () => { this.changed( this.state.value ) });
    };

    onFocusInput = ( e ) => {
        e.stopPropagation();
        this.inputElm.value = this.state.value;
    };

    onKeyDown = ( e ) => {
        switch ( e.keyCode ) {
            case 13:
                e.target.blur();
                break;
            case 27:
                let escape = ( e.target.value === ( this.state.value + '' ) );
                if ( escape ) {
                    e.target.blur();
                }
                else {
                    e.target.value = this.state.value;
                }
                break;
        }
    };

    // == controller - end ==

    // == logic ==
    formatInput = ( value ) => {
        value += '';
        let re = new RegExp(/[ ]+/gi);
        value = value.replace( re, '' );
        re = new RegExp( /[\,]/ );
        value = value.replace( re, '.' );
        value = parseFloat( value );

        if ( value === undefined ||
             value === null ||
             isNaN(value) ) { value = 0 }

        value = Math.round( value * 100 ) / 100;

        let string = new Intl.NumberFormat( 'ru-RU', { maximumFractionDigits: 2 } ).format( value );

        return { number: value, string: string }
    };
    // == logic - end ==

    changed = ( value ) => {
        if ( this.state.cbChanged ) {
            this.state.cbChanged( value );
        }
    };

    labelRender = () => {
        if ( this.state.label && this.state.label.length > 0 ) {
            return (
                <Label label = { this.state.label }
                       postfixClassName = { 'NumberInput' }
                       htmlFor = { this.state.htmlID }/>
            )
        } else return null;
    };

    render() {
        return (
            <div className = { 'NumberInput ' +
            ( ( this.state.options.addedClass && this.state.options.addedClass.length > 0 ) ?
                this.state.options.addedClass : '' ) }
                 ref = { ( elm ) => { this.numberInput = elm } }>
                <div className = "NumberInput_label_box"
                     ref = { ( elm ) => { this.labelBox = elm } }
                     data-label_position = { this.state.options.labelPosition }>
                    { this.labelRender() }
                </div>
                <div className = "NumberInput_input_box"
                     ref = { ( elm ) => { this.inputBox = elm } }
                     data-label_position = { this.state.options.labelPosition }>
                    <input className = "NumberInput_input"
                           id = { this.state.htmlID }
                           ref = { ( elm ) => { this.inputElm = elm } }
                           type = "text"
                           defaultValue = { this.formatInput( this.state.defValue ).string }
                           placeholder =  { this.state.placeholder }
                           onKeyDown = { this.onKeyDown }
                           onBlur    = { this.onBlurInput }
                           onFocus   = { this.onFocusInput }/>
                </div>
            </div>
        )
    }

}

export default NumberInput;