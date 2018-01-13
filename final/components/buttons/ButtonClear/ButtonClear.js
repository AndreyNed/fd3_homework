'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
//import { connect } from 'react-redux';

import './ButtonClear.scss';

class ButtonClear extends Button {

    static propTypes = {
        /*label:      PropTypes.string,
        options:    PropTypes.shape({

        }),
        cbChanged:  PropTypes.func,*/
    };

    static defaultProps = {
        label:      '',
        options:    {
            iconWidth: 48,
            iconHeight: 48,
            viewBox:    '0 0 64 64',
            preserveAspectRatio: 'xMidYMid meet',
            addedClass: 'ButtonClear',
        },
        cbChanged:  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonClear_' + ButtonClear.classID;
    };

    constructor( props ) {
        super( props );
        ButtonClear.classID++;
        this.state = {
            htmlID: ButtonClear.getHtmlID( props.htmlID ),
        }
    }

    /*componentWillMount() {

    }*/

    render() {
        let innerSVG = (
            <g className="ButtonClear_inner_svg">
                <circle cx="32" cy="32" r="31"
                        stroke="#d3d3d3"
                        strokeWidth="1"
                        fill="rgba(255,255,255,0)"
                />
                <path d="M 32 8 V 56 M 8 32 H 56"
                      strokeWidth="6"
                      stroke="#898989"
                      fill="none"
                />
            </g>

        );

        return super.render( innerSVG, this.props.options.addedClass )
    }
}

export default ButtonClear;