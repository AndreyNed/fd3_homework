'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
//import { connect } from 'react-redux';

import './ButtonFilter.scss';
import {DISPLAY_TYPES} from "../../../data_const/data_const";

class ButtonFilter extends Button {

    static propTypes = {
        /*label:      PropTypes.string,
        options:    PropTypes.shape({

        }),
        cbChanged:  PropTypes.func,*/
    };

    static defaultProps = {
        label:                      '',
        display:                    DISPLAY_TYPES.block,
        withLabel:                  true,
        options:    {
            iconWidth:              48,
            iconHeight:             48,
            viewBox:                '0 0 64 64',
            preserveAspectRatio:    'xMidYMid meet',
            addedClass:             'ButtonFilter',
        },
        cbChanged:                  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonFilter_' + ButtonFilter.classID;
    };

    constructor( props ) {
        super( props );
        ButtonFilter.classID++;
        this.state = {
            htmlID: ButtonFilter.getHtmlID( props.htmlID ),
        }
    }

    /*componentWillMount() {

    }*/

    render() {
        const { display } = this.props;
        const { addedClass } = this.props.options;
        let innerSVG = (
            <g className="ButtonFilter_inner_svg">
                <circle cx="32" cy="32" r="31"
                        stroke="#d3d3d3"
                        strokeWidth="1"
                        fill="rgba(255,255,255,0)"
                />
                <path className="ButtonFilter_voronka"
                      d="M 12 16 H 52 L 36 36 V56 L 28 50 V 36 Z"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="none"
                />
                <path className="ButtonFilter_filter"
                      d="M 21 24 H 43 L 34 38 V40 H30 V 38 Z"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="#898989"
                />
            </g>

        );

        return super.render( innerSVG, addedClass, display )
    }
}

export default ButtonFilter;