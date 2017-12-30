"use strict";

import React from 'react';
import PropTypes from 'prop-types';

import {isExists, isNotEmpty, isNotNaN} from "../../utils/utils";

require('./ColorBox.scss');

class ColorBox extends React.Component {

    static propTypes = {
        color:      PropTypes.string,
        boxes:      PropTypes.arrayOf(
            PropTypes.string,
        ),
    };

    constructor( props ) {
        super( props );
    }

    componentWillMount() {
        this.prepareState( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareState( newProps );
    }

    prepareState = ( props ) => {
        console.log( 'children: ', props.children );
        if ( isExists( props ) && isNotEmpty( props.children ) ) {
            let color = props.children[ 0 ];
            let boxes = ( props.children.length > 1 )
            ? props.children.filter( ( item, index ) => {
                return ( index !== 0 )
                } )
            : null;
            this.setState( {
                color: color,
                boxes: boxes,
            }, ()=>{} );
        }
    };

    render() {

        return (
            <div className="ColorBox"
                 style = {{ backgroundColor: this.state.color }}>
                { this.state.color }
                {
                    ( this.state.boxes !== null ) &&
                        <ColorBox>
                            { this.state.boxes }
                        </ColorBox>
                }
            </div>
        );
    }
}
export default ColorBox;