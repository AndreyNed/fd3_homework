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
        if ( isExists( props ) && isNotEmpty( props.boxes ) ) {
            let color = props.boxes[ 0 ];
            let boxes = ( props.boxes.length > 1 )
            ? props.boxes.filter( ( item, index ) => {
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
            <div className="container"
                 style = {{ backgroundColor: this.state.color }}>
                {
                    ( this.state.boxes !== null ) &&
                        <ColorBox boxes = { this.state.boxes } />
                }
            </div>
        );
    }
}
export default ColorBox;