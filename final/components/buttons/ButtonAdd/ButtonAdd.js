'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
//import { connect } from 'react-redux';

import './ButtonAdd.scss';

class ButtonAdd extends Button {

    static propTypes = {
        /*label:      PropTypes.string,
        options:    PropTypes.shape({

        }),
        cbChanged:  PropTypes.func,*/
    };

    static defaultProps = {
        label:      '',
        options:    {
            iconWidth: 32,
            iconHeight: 32,
            viewBox:    '0 0 64 64',
            preserveAspectRatio: 'xMidYMid meet',
            addedClass: 'AddHover',
        },
        cbChanged:  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonAdd_' + ButtonAdd.classID;
    };

    constructor( props ) {
        super( props );
        ButtonAdd.classID++;
        this.state = {
            htmlID: ButtonAdd.getHtmlID( props.htmlID ),
        }
    }

    /*componentWillMount() {

    }*/

    render() {
        let innerSVG = (
            <path d="M 32 0 V 64 M 0 32 H 64"
                  strokeWidth="4"
                  stroke="#898989"
                  fill="none"
            />
        );

        return super.render( innerSVG )
    }
}

export default ButtonAdd;