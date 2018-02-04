'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import './ButtonExcel.scss';
import {DISPLAY_TYPES} from "../../../data_const/data_const";

class ButtonExcel extends Button {

    static propTypes = {

    };

    static defaultProps = {
        label:                      '',
        withLabel:                  true,
        display:                    DISPLAY_TYPES.block,
        options: {
            iconWidth:              48,
            iconHeight:             48,
            viewBox:                '0 0 64 64',
            preserveAspectRatio:    'xMidYMid meet',
            addedClass:             'ButtonExcel',
        },
        cbChanged:                  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonExcel_' + ButtonExcel.classID;
    };

    constructor( props ) {
        super( props );
        ButtonExcel.classID++;
        this.state = {
            htmlID: ButtonExcel.getHtmlID( props.htmlID ),
        }
    }

    render() {
        const { display } = this.props;
        const { addedClass } = this.props.options;
        let innerSVG = (
            <g className="ButtonExcel_inner_svg">
                <circle cx="32" cy="32" r="31"
                        stroke="#d3d3d3"
                        strokeWidth="1"
                        fill="rgba(255,255,255,0)"
                />
                <path className="ButtonExcel_outer"
                      d="M 10 18 V 48 L 36 56 V 8 Z"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="#898989"
                />
                <path className="ButtonExcel_fields"
                      d="M 37 18 H55 V 48 H 37 Z"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="#898989"
                />
                <path className="ButtonExcel_grids"
                      d="M 37 18.5 H54.5 V 47.5 H 37 M 43.5 18.5 V 47.5 M 37 24 H 54.5 M 37 30 H 54.5 M 37 36 H 54.5 M 37 42 H 54.5"
                      strokeWidth="2"
                      stroke="#ffffff"
                      fill="none"
                />
                <path className="ButtonExcel_logo"
                      d="M 16 22 L 26 44 H 29 L 19 22 Z M 16 44 H 19 L 29 22 H 26 Z"
                      strokeWidth="2"
                      stroke="#ffffff"
                      fill="#ffffff"
                />
            </g>

        );

        return super.render( innerSVG, addedClass, display )
    }
}

export default ButtonExcel;