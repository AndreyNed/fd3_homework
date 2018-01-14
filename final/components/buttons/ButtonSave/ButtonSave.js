'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
//import { connect } from 'react-redux';

import './ButtonSave.scss';

class ButtonSave extends Button {

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
            addedClass: 'ButtonSave',
        },
        cbChanged:  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonSave_' + ButtonSave.classID;
    };

    constructor( props ) {
        super( props );
        ButtonSave.classID++;
        this.state = {
            htmlID: ButtonSave.getHtmlID( props.htmlID ),
        }
    }

    /*componentWillMount() {

    }*/

    render() {
        let innerSVG = (
            <g className="ButtonSave_inner_svg">
                <circle cx="32" cy="32" r="31"
                        stroke="#d3d3d3"
                        strokeWidth="1"
                        fill="rgba(255,255,255,0)"
                />
                <path id="ButtonSave_icon_notice" d="M 16 16 H 40 L 48 24 V 48 H 16 Z"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="#898989"
                />
                <path d="M 20 46 V 30 H 44 V 46 Z"
                      strokeWidth="1"
                      stroke="#FFFFFF"
                      fill="#FFFFFF"
                />
                <path d="M 24 34 H 42"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="none"
                />
                <path d="M 24 38 H 42"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="none"
                />
                <path d="M 24 42 H 42"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="none"
                />
                <path d="M 24 18 H 38 V 24 H 24 Z"
                      strokeWidth="1"
                      stroke="#FFFFFF"
                      fill="#FFFFFF"
                />
                <path d="M 35 19 H 36 V 23 H 35 Z"
                      strokeWidth="1"
                      stroke="#898989"
                      fill="none"
                />
            </g>

        );

        return super.render( innerSVG, this.props.options.addedClass )
    }
}

export default ButtonSave;