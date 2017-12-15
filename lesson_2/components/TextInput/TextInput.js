'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { isExists, isNotEmpty, isNotNaN, isGTZero, arraySort, arraySortByField } from "../../utils/utils";

import './TextInput.scss';

class TextInput extends React.PureComponent {

    static propTypes = {
        defValue:           PropTypes.string,
        value:              PropTypes.string,
        label:              PropTypes.string,
        withLabel:          PropTypes.bool,
        isEditable:         PropTypes.bool,
        options:            PropTypes.shape({
            labelBoxWidth:  PropTypes.number,
            inputBoxWidth:  PropTypes.number,
        }),
        cbChanged:          PropTypes.func,
    };

    static defaultProps = {
        defValue:           '',
        value:              '',
        label:              '',
        withLabel:          true,
        isEditable:         true,
        options:            {
            labelBoxWidth:  0,
            inputBoxWidth:  0,
        },
        cbChanged:          null,
    };

    static classID = 0;

    static getHTMLID = ( props ) => {
        return ( isNotEmpty( props ) && isNotEmpty( props.HTMLID ) )
            ? props.HTMLID
            : "TextInput_" + TextInput.classID;
    };

    constructor( props ) {
        super( props );
        TextInput.classID++;
        this.state = {
            ...props,
            HTMLID: TextInput.getHTMLID( props ),
        };
    }



    componentWillMount() {
        this.prepareState( this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
    }

    prepareState = ( props ) => {
        let state = { ...TextInput.defaultProps };
        state = ( isExists( props ) )
            ? { ...state, ...props, options: state.options }
            : null;
        state.options = ( isExists( props.options ) )
            ? { ...state.options, ...props.options }
            : null;
        state.value = ( isNotEmpty( state.defValue ) )
            ? state.defValue
            : '';
        this.setState( state, () => {
            console.log( 'TextInput: prepareState: state: ', this.state );
        } );
    };

    classCSS = 'TextInput';

    changed = ( value ) => {
        if ( this.state.cbChanged ) this.state.cbChanged( value );
    };

    // == controller ==
    inputChanged = ( e ) => {
        if ( this.state.cbChanged ) {
            this.state.cbChanged( e.currentTarget.value );
        }
        else {
            this.setState( {
                value: e.currentTarget.value,
            }, () => {} );
        }
    };


    // == action functions ==



    // == additional functions



    // == render ==

    render() {
        console.log( '%c%s', 'color: red; font-weight: bold;', 'TextInput: render...' );

        return (
            <div className = { this.classCSS }>
                {
                    ( this.state.withLabel ) &&
                        <div className = { this.classCSS + "_label_box" }
                             style = {{
                                 width: ( isGTZero( this.state.options.labelBoxWidth ) )
                                     ? this.state.options.labelBoxWidth
                                     : 'auto',
                             }}>
                            <label className = { this.classCSS + "_label" }
                                   htmlFor="this.state.HTMLID">
                                { this.state.label }
                            </label>
                        </div>
                }
                <div className = { this.classCSS + "_input_box" }
                     style = {{
                         width: ( isGTZero( this.state.options.inputBoxWidth ) )
                             ? this.state.options.inputBoxWidth
                             : 'auto',
                     }}>
                    <input className = { this.classCSS + "_input" }
                           type =      "text"
                           id =        { this.state.HTMLID }
                           value =     { this.state.value }
                           disabled =  { !this.state.isEditable }
                           onChange =  { this.inputChanged }
                           onBlur =    { this.inputChanged }/>
                </div>

            </div>
        )
    }

}

export default TextInput;
