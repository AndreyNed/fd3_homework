'use strict';

import React from 'react';
import PropTypes from 'prop-types';

import {isNotEmpty} from "../../../utils/utils";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_BUTTON } from "../../../config/config";
import { DISPLAY_TYPES } from "../../../data_const/data_const";

import './Button.scss';

class Button extends React.PureComponent {

    static propTypes = {
        label:                   PropTypes.string,
        withLabel:               PropTypes.bool,
        display:                 PropTypes.oneOf([
            DISPLAY_TYPES.block,
            DISPLAY_TYPES.inlineBlock,
            DISPLAY_TYPES.hidden,
            DISPLAY_TYPES.none,
        ]),
        options:                 PropTypes.shape({
            hoverClass:          PropTypes.string,
            iconWidth:           PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            iconHeight:          PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            preserveAspectRatio: PropTypes.string,
            viewBox:             PropTypes.string,
        }),
        cbChanged:               PropTypes.func,
    };

    static defaultProps = {
        label:          '',
        display:        DISPLAY_TYPES.block,
        withLabel:      true,
        options:    {
            iconWidth:  32,
            iconHeight: 32,
            viewBox:    '0 0 64 64',
            preserveAspectRatio: 'xMidYMid meet',
        },
        cbChanged:  null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'Button_' + Button.classID;
    };

    constructor( props ) {
        super( props );
        Button.classID++;
        this.state = {
            htmlID: Button.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_BUTTON;

    classCSS = 'Button';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) && console.log( 'Button: prepareData: new props: ', props );
        this.setState( { dataHover: false }, ()=>{} );
        // todo
    };

    render( innerSVG, addedClass, display = DISPLAY_TYPES.block ) {
        const { withLabel } = this.props;
        const { iconWidth, iconHeight, preserveAspectRatio, viewBox } = this.props.options;
        return ( display !== DISPLAY_TYPES.none ) &&
            <div className = { this.classCSS }
                 data-display = { display }>
                <div className = { this.classCSS + '_icon_box' }
                     key='icon'
                     onClick = { this.props.cbChanged }
                     style = {{
                         width: ( iconWidth !== 0 )
                            ? iconWidth
                            : 'auto',
                         height: ( iconHeight !== 0 )
                            ? iconHeight
                            : 'auto',
                     }}>
                    <svg className = { isNotEmpty ( addedClass ) ? addedClass + '_icon ' : this.classCSS + '_icon' }
                         width =   "100%"
                         height =  "100%"
                         viewBox = { viewBox }
                         preserveAspectRatio = { preserveAspectRatio }
                         xmlns =   "http://www.w3.org/2000/svg">
                        { innerSVG || null }
                    </svg>
                </div>
                {
                    ( withLabel ) &&
                    <div className = { this.classCSS + '_label_box' }
                         key='label'>
                        <label className = { this.classCSS + '_label' }>
                            { this.props.label }
                        </label>
                    </div>
                }
            </div>
    }
}

export default Button;