'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
//import { connect } from 'react-redux';

import './ButtonCancel.scss';
import {DISPLAY_TYPES} from "../../../data_const/data_const";

class ButtonCancel extends Button {

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
            addedClass:             'ButtonCancel',
        },
        cbChanged:                  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonCancel_' + ButtonCancel.classID;
    };

    constructor( props ) {
        super( props );
        ButtonCancel.classID++;
        this.state = {
            htmlID: ButtonCancel.getHtmlID( props.htmlID ),
        }
    }

    /*componentWillMount() {

    }*/

    render() {
        const { display } = this.props;
        const { addedClass } = this.props.options;
        let innerSVG = (
            <g className="ButtonCancel_inner_svg">
                <circle cx="32" cy="32" r="31"
                        stroke="#d3d3d3"
                        strokeWidth="1"
                        fill="rgba(255,255,255,0)"
                />
                <path d="M 20 20 L 44 44 M 44 20 L 20 44"
                      strokeWidth="6"
                      stroke="#898989"
                      fill="none"
                />
            </g>

        );

        return super.render( innerSVG, addedClass, display )
    }
}

export default ButtonCancel;