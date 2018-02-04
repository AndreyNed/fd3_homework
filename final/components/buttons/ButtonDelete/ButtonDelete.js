'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import './ButtonDelete.scss';
import {DISPLAY_TYPES} from "../../../data_const/data_const";

class ButtonDelete extends Button {

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
            addedClass:             'ButtonDelete',
        },
        cbChanged:                  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonDelete_' + ButtonDelete.classID;
    };

    constructor( props ) {
        super( props );
        ButtonDelete.classID++;
        this.state = {
            htmlID: ButtonDelete.getHtmlID( props.htmlID ),
        }
    }

    /*componentWillMount() {

    }*/

    render() {
        const { display } = this.props;
        const { addedClass } = this.props.options;
        let innerSVG = (
            <g className="ButtonDelete_inner_svg">
                <circle cx="32" cy="32" r="31"
                        stroke="#d3d3d3"
                        strokeWidth="1"
                        fill="rgba(255,255,255,0)"
                />
                <path d="M 24 16 H 40 M 17 22 H 47 M 20.5 44 H 44  M 22 22 V 44 M 28.75 22 V 44 M 35.75 22 V 44 M 42.5 22 V 44"
                      strokeWidth="4"
                      stroke="#898989"
                      fill="none"
                />
            </g>

        );

        return super.render( innerSVG, addedClass, display )
    }
}

export default ButtonDelete;