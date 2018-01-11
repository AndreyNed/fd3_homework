"use strict";

import React from 'react';

import IconBasic from './IconBasic';

class IconCalendar extends IconBasic {

    static defaultProps = {
        width:         '1em',
        height:        '1em',
        isActive:      true,
        color:         '#000000',
        colorInactive: '#d8d8d8',
        strokeWidth:   1,
        viewBox:       '0 0 64 74',
        preserveAspectRatio: 'xMidYMid meet',
    };

    constructor( props ){
        super( props );
        this.state = {
            ...props,
        }
    }

    render() {
        let stroke = ( this.state.isActive ) ?
            this.state.color :
            this.state.colorInactive;
        let svgInner = <g>
            <rect x="0.5" y="10" width="63" height="63" rx="8" ry="8"
                  stroke = { stroke }
                  strokeWidth = { this.state.strokeWidth }
                  fill = { stroke }/>
            <rect x="14" y="2.5" width="8" height="18" rx="6" ry="4"
                  stroke = { stroke }
                  strokeWidth = "4" fill = "#ffffff"/>
            <rect x="42" y="2.5" width="8" height="18" rx="6" ry="4"
                  stroke = { stroke }
                  strokeWidth = "4" fill = "#ffffff"/>
            <rect x="6" y="26" width="52" height="42"
                  stroke = "#ffffff" strokeWidth = "1"
                  fill = "#ffffff"/>
            <path d="M 18 26 V 68 M 46 26 V68 M 32 26 V 68 M 6 40 H 58 M 6 55 H 58"
                  stroke = { stroke }
                  strokeWidth = "2" fill = "none"/>
        </g>;
        return  super.render( svgInner )
    }

}

export default IconCalendar;