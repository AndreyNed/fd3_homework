'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { isExists, isNotEmpty, isNotNaN, isGTZero, arraySort, arraySortByField } from "../../utils/utils";

import './Button.scss';

class Button extends React.PureComponent {

    static propTypes = {
        value:              PropTypes.string,
        isEnabled:          PropTypes.bool,
        isVisible:          PropTypes.bool,
        options:            PropTypes.shape
        ({
            buttonWidth:    PropTypes.number,
        }),
        cbClicked:          PropTypes.func,
    };

    static defaultProps = {
        value:              '',
        isEnabled:          true,
        isVisible:          true,
        options:            {
            buttonWidth:    0,
        },
        cbClicked:          PropTypes.func,
    };

    static classID = 0;

    static getHTMLID = ( props ) => {
        return ( isNotEmpty( props ) && isNotEmpty( props.HTMLID ) )
            ? props.HTMLID
            : "Button_" + Button.classID;
    };

    constructor( props ) {
        super( props );
        Button.classID++;
        this.state = {
            ...props,
            HTMLID: Button.getHTMLID( props ),
        };
    }

    componentWillMount() {
        this.prepareState( this.state );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
    }

    prepareState = ( props ) => {
        let state = { ...Button.defaultProps };
        state = ( isExists( props ) )
            ? { ...state, ...props, options: state.options }
            : null;
        state.options = ( isExists( props.options ) )
            ? { ...state.options, ...props.options }
            : null;
        state.value = ( isNotEmpty( state.value ) )
            ? state.value
            : '';
        this.setState( state, () => {
            // console.log( 'Button: prepareState: state: ', this.state );
        } );
    };

    classCSS = 'Button';

    changed = ( value ) => {
        if ( this.state.cbChanged ) this.state.cbChanged( value );
    };

    // == controller ==
    buttonClick = ( e ) => {
        if ( this.state.cbClicked ) {
            this.state.cbClicked( e.currentTarget );
        }
        else {
            // console.log( 'Button ', this.state.value, ' has been clicked...' );
        }
    };

    // == action functions ==



    // == additional functions



    // == render ==

    render() {
        // console.log( '%c%s', 'color: red; font-weight: bold;', 'Button: render...' );

        return (
            ( this.state.isVisible ) &&
            <div className =    { this.classCSS }
                 data-enabled = { this.state.isEnabled }
                 style = {{
                     width: ( isGTZero( this.state.options.buttonWidth ) )
                         ? this.state.options.buttonWidth
                         : 'auto',
                 }}
                 onClick = { ( this.state.isEnabled )
                     ? this.buttonClick
                     : null }>
                <span>
                    { this.state.value }
                </span>
            </div>
        )
    }

}

export default Button;
