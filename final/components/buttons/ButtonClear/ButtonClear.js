'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
//import { connect } from 'react-redux';

import './ButtonClear.scss';
import {DISPLAY_TYPES} from "../../../data_const/data_const";

class ButtonClear extends Button {

    static propTypes = {

    };

    static defaultProps = {
        label:                      '',
        withLabel:                  true,
        display:                    DISPLAY_TYPES.block,
        options:    {
            iconWidth:              48,
            iconHeight:             48,
            viewBox:                '0 0 64 64',
            preserveAspectRatio:    'xMidYMid meet',
            addedClass:             'ButtonClear',
        },
        cbChanged:                  null,
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

    render() {
        const { display } = this.props;
        const { addedClass } = this.props.options;
        let innerSVG = (
            <g className="ButtonClear_inner_svg">
                <circle cx="32" cy="32" r="31"
                        stroke="#d3d3d3"
                        strokeWidth="1"
                        fill="rgba(255,255,255,0)"
                />
                <path d="M 20 16 H 38 L 44 22 V 48 H20 Z M 38 16 V 22 H 44"
                      strokeWidth="2"
                      stroke="#898989"
                      fill="none"
                />
            </g>

        );

        return super.render( innerSVG, addedClass, display )
    }
}

export default ButtonClear;