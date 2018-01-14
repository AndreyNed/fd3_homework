'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
//import { connect } from 'react-redux';

import './ButtonOk.scss';
import {DISPLAY_TYPES} from "../../../data_const/data_const";

class ButtonOk extends Button {

    static propTypes = {
        /*label:      PropTypes.string,
        options:    PropTypes.shape({

        }),
        cbChanged:  PropTypes.func,*/
    };

    static defaultProps = {
        label:      '',
        display:    DISPLAY_TYPES.block,
        options:    {
            iconWidth: 48,
            iconHeight: 48,
            viewBox:    '0 0 64 64',
            preserveAspectRatio: 'xMidYMid meet',
            addedClass: 'ButtonOk',
        },
        cbChanged:  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonOk_' + ButtonOk.classID;
    };

    constructor( props ) {
        super( props );
        ButtonOk.classID++;
        this.state = {
            htmlID: ButtonOk.getHtmlID( props.htmlID ),
        }
    }

    /*componentWillMount() {

    }*/

    render() {
        const { display } = this.props;
        const { addedClass } = this.props.options;
        let innerSVG = (
            <g className="ButtonOk_inner_svg">
                <circle cx="32" cy="32" r="31"
                        stroke="#d3d3d3"
                        strokeWidth="1"
                        fill="rgba(255,255,255,0)"
                />
                <path d="M 16 28 L 28 44 L 48 20"
                      strokeWidth="6"
                      stroke="#898989"
                      fill="none"
                />
            </g>

        );

        return super.render( innerSVG, addedClass, display )
    }
}

export default ButtonOk;