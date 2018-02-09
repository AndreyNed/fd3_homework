import React from 'react';
import PropTypes from 'prop-types';

import Label from '../Label/Label';

import { isExists, isNotEmpty, isNotNaN } from '../../utils/utils';

import './NumberIncDec.scss';

class NumberIncDec extends React.PureComponent {

    static displayTypes = {
        block:                  'dBlock',
        inlineBlock:            'dInlineBlock',
        hidden:                 'dHidden',
        none:                   'dNone',
    };

    static buttonTypes = {
        INC:                    'INC',
        DEC:                    'DEC',
    };

    static position = {
        top:                    'top',
        bottom:                 'bottom',
        left:                   'left',
        right:                  'right',
        middle:                 'middle',
    };

    static propTypes = {
        defValue:           PropTypes.number,
        value:              PropTypes.number,
        maxValue:           PropTypes.number,
        label:              PropTypes.string,
        withLabel:          PropTypes.bool,
        isReadOnly:         PropTypes.bool,
        display:            PropTypes.oneOf( [
            NumberIncDec.displayTypes.block,
            NumberIncDec.displayTypes.inlineBlock,
            NumberIncDec.displayTypes.hidden,
            NumberIncDec.displayTypes.none,
        ] ),
        htmlID:             PropTypes.string,
        options:            PropTypes.shape( {
            addedClass:         PropTypes.string,
            labelBoxWidth:      PropTypes.oneOfType( [
                PropTypes.number,
                PropTypes.string,
            ] ),
            inputBoxWidth:      PropTypes.oneOfType( [
                PropTypes.number,
                PropTypes.string,
            ] ),
            labelPosition:      PropTypes.string,
            labelVerticalAlign: PropTypes.string,
        } ),
        cbChanged:          PropTypes.func,
    };

    static defaultProps = {
        defValue:               0,
        maxValue:               100,
        isReadOnly:             false,
        withLabel:              false,
        label:                  '',
        display:                NumberIncDec.displayTypes.inlineBlock,
        options: {
            addedClass:         '',
            labelPosition:      NumberIncDec.position.top,
            labelVerticalAlign: NumberIncDec.position.middle,
            labelBoxWidth:      0,
            inputBoxWidth:      0,
        },
        cbChanged: null,
    };

    static classID = 0;

    static getHtmlID = ( props ) => {
        if ( isNotEmpty( props.htmlID ) ) {
            return props.htmlID;
        } else {
            return `NumberIncDec_${ NumberIncDec.classID }`;
        }
    };

    constructor( props ) {
        super( props );
        NumberIncDec.classID++;
        this.state = {
            ...props,
            htmlID: NumberIncDec.getHtmlID( props ),
        };
        this.debugMode = false;
        this.classCSS = 'NumberIncDec';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debugMode ) &&
            console.log( 'NumberIncDec: prepareData: props: ', props );
        const { defValue } = props;

        let value = ( isExists( defValue ) ) ? defValue : 0;

        this.setState( { value }, () => {
            ( this.debugMode ) &&
                console.log( 'NumberIncDec: prepareData: state: ', this.state );
        } );
    };

    // == controller ==

    btnClick = ( e ) => {
        const { INC, DEC } = NumberIncDec.buttonTypes;
        let t = 0;
        switch ( e.currentTarget.dataset.btn ) {
            case INC:
                t = 1;
                break;
            case DEC:
                t = -1;
                break;
        }
        ( this.debugMode ) &&
            console.log( 'NumberIncDec: btnClick: t: ', t );
        let value = this.state.value + t;
        value = ( value < 0 ) ? 0 : value;
        this.changed( value );
    };

    inputChange = ( e ) => {
        let value = parseInt( e.currentTarget.value );
        value = ( isNotNaN( value ) ) ? value : 0;
        this.changed( value );
    };

    // == controller - end ==

    changed = ( newValue ) => {
        const { maxValue } = this.props;
        const value = ( newValue <= maxValue ) ? newValue : maxValue;

        if ( this.props.cbChanged ) {
            this.props.cbChanged( value );
        } else {
            this.setState( { value }, () => {
                ( this.debugMode ) &&
                    console.log( 'NumberIncDec: changed: cbChanged is missed: value: ', this.state.value );
            } );
        }
    };

    /* == render functions == */

    /*labelRender = () => {
        return (
            <Label postfixClassName = "NumberIncDec"
                   label =   { this.state.label }
                   htmlFor = { this.state.htmlID }/>
        )
    };*/

    /*renderInputBox() {
        return (
            <div className = { 'NumberIncDec ' +
            ( ( this.props.options.addedClass &&
                this.props.options.addedClass.length > 0 ) ?
                this.props.options.addedClass : '' ) }
                ref = { ( elm ) => { this.numberIncDec = elm } }>

                <div className = "NumberIncDec_input_box"
                     ref = { ( elm ) => { this.inputBox = elm } }>


                </div>
            </div>
        )
    }*/

    renderLabel = () => {
        const { labelBoxWidth, labelVerticalAlign } = this.props.options;
        const { label } = this.props;
        const { htmlID } = this.state;
        const { middle } = NumberIncDec.position;
        return (
            ( this.state.withLabel ) &&
            <div className = { `${ this.classCSS }_label_box` }
                 key = "labelBox"
                 style = { {
                     width: ( isExists( labelBoxWidth ) && labelBoxWidth !== 0 )
                         ? labelBoxWidth
                         : 'auto',
                 } }
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
        const { isReadOnly } = this.props;
        const { htmlID } = this.state;
        const { middle } = NumberIncDec.position;
        const { INC, DEC } = NumberIncDec.buttonTypes;

        return (
            <div className = { `${ this.classCSS }_input_box` }
                 key="inputBox"
                 ref = { ( elm ) => { this.inputBox = elm } }
                 data-label_vertical_align = { labelVerticalAlign || middle }
                 style = { {
                     width: ( isExists( inputBoxWidth ) && inputBoxWidth !== 0 )
                         ? inputBoxWidth
                         : 'auto',
                 } }>
                <div className = { `${ this.classCSS }_input_container` }
                     key="inputContainer">
                    <input className = "NumberIncDec_input"
                           id = { htmlID }
                           ref = { ( elm ) => { this.input = elm } }
                           type = 'text'
                           disabled =  { ( isReadOnly ) ? 'disabled' : null }
                           value = { this.state.value }
                           onChange = { this.inputChange }/>
                </div>
                <div className = "NumberIncDec_btn_box">
                    <div className = "NumberIncDec_btn"
                         data-btn = { INC }
                         onClick = { this.btnClick }>
                        <svg width =   "100%"
                             height =  "100%"
                             viewBox = "0 0 16 16"
                             preserveAspectRatio = "none"
                             xmlns = "http://www.w3.org/2000/svg">
                            <path d = "M 4 8 L 12 8 M 8 4 L 8 12"
                                  stroke = "#6E6E6E"
                                  strokeWidth = "1"
                                  fill = "none" />
                        </svg>
                    </div>
                    <div className = "NumberIncDec_btn"
                         data-btn = { DEC }
                         onClick = { this.btnClick }>
                        <svg width =   "100%"
                             height =  "100%"
                             viewBox = "0 0 16 16"
                             preserveAspectRatio = "none"
                             xmlns = "http://www.w3.org/2000/svg">
                            <path d = "M 4 8 L 12 8"
                                  stroke = "#6E6E6E"
                                  strokeWidth = "1"
                                  fill = "none" />
                        </svg>
                    </div>
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
        const { block, none } = NumberIncDec.displayTypes;
        const { top, left } = NumberIncDec.position;
        return ( display !== none ) &&
            <div className = { `${ this.classCSS } ${ addedClass || ''}` }
                 data-display = { display || block }
                 data-label_position = { labelPosition || top }>
                {
                    ( labelPosition === top ||
                        labelPosition === left ) ?
                        this.renderIfLeftOrTop() : this.renderIfRightOrBottom()
                }

            </div>
    }

}

export default NumberIncDec;