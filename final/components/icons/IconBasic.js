"use strict";

import React from 'react';
import PropTypes from 'prop-types';

class IconBasic extends React.PureComponent {

    static defaultProps = {
        width:         '100%',
        height:        '100%',
        viewBox:       '0 0 16 16',
        color:         '#000000',
        colorInactive: '#d8d8d8',
        isActive:      true,
        strokeWidth:   1,
        svgInner:      null,
        preserveAspectRatio: 'none',
        options:       {},
    };

    static propTypes = {
        className:              PropTypes.string,
        width:                  PropTypes.string,
        height:                 PropTypes.string,
        viewBox:                PropTypes.string,
        color:                  PropTypes.string,
        colorInactive:          PropTypes.string,
        isActive:               PropTypes.bool,
        strokeWidth:            PropTypes.number,
        preserveAspectRatio:    PropTypes.string,
        svgInner:               PropTypes.element,
        options:                PropTypes.object,
        onClick:                PropTypes.func,
    };

    static classType = 'IconBasic';

    constructor( props ) {
        super( props );
        this.state = { ...props };
    }

    componentWillReceiveProps( newProps ) {
        this.setState( { ...newProps }, ()=>{} );
    }

    render( svgInner ) {
        return (
            <svg className = { this.state.className }
                 width =   { this.state.width }
                 height =  { this.state.height }
                 viewBox = { this.state.viewBox }
                 preserveAspectRatio = { this.state.preserveAspectRatio }
                 xmlns =   "http://www.w3.org/2000/svg"
                 onClick = { this.state.onClick }>
                { svgInner || null }
            </svg>
        )
    }
}

export default IconBasic;