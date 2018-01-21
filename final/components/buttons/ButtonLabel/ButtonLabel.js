'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import { DISPLAY_TYPES, ALIGN_TYPES } from "../../../data_const/data_const";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_BUTTON_LABEL } from "../../../config/config";

import './ButtonLabel.scss';
import {isNotEmpty} from "../../../utils/utils";

class ButtonLabel extends React.PureComponent {

    static propTypes = {
        label:                      PropTypes.string,
        display:                    PropTypes.oneOf([
            DISPLAY_TYPES.block,
            DISPLAY_TYPES.inlineBlock,
            DISPLAY_TYPES.hidden,
            DISPLAY_TYPES.none,
        ]),
        options:                    PropTypes.shape({
            buttonWidth:            PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            labelAlign:             PropTypes.oneOf([
                ALIGN_TYPES.LEFT,
                ALIGN_TYPES.CENTER,
                ALIGN_TYPES.RIGHT,
            ]),
            hoverClass:             PropTypes.string,
            iconWidth:              PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            iconHeight:             PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            preserveAspectRatio:    PropTypes.string,
            viewBox:                PropTypes.string,
        }),
        cbChanged:                  PropTypes.func,
    };

    static defaultProps = {
        label:              '',
        display:            DISPLAY_TYPES.block,
        options: {
            buttonWidth:    0,
            labelAlign:     ALIGN_TYPES.CENTER,
        },
        cbChanged:          null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ButtonLabel_' + ButtonLabel.classID;
    };

    constructor( props ) {
        super( props );
        ButtonLabel.classID++;
        this.state = {
            htmlID: ButtonLabel.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_BUTTON_LABEL;
        this.classCSS = 'ButtonLabel';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'ButtonLabel: prepareData: new props: ', props )
        // todo
    };

    buttonClick = ( e ) => {
        const { cbChanged } = this.props;
        if ( cbChanged ) {
            cbChanged();
        }
        else {
            ( this.debug_mode ) &&
                console.log( 'ButtonLabel: buttonClick: cbChanged is not available...', e.currentTarget );
        }
    };

    render() {
        const { label, display } = this.props;
        const { buttonWidth, labelAlign } = this.props.options;
        return ( display !== DISPLAY_TYPES.none ) &&
            <div className = { this.classCSS }
                 style = {{
                     width: ( buttonWidth !== 0 )
                        ? buttonWidth
                        : 'auto',
                     display: ( display === DISPLAY_TYPES.inlineBlock )
                        ? 'inline-block'
                        : 'block',
                     visibility: ( display === DISPLAY_TYPES.hidden )
                        ? 'hidden'
                        : 'visible',
                 }}
                 onClick = { this.buttonClick }>
                <div className = { this.classCSS + '_label' }
                     data-label_align = { labelAlign }>
                    { label }
                </div>
            </div>
    }
}

export default ButtonLabel;