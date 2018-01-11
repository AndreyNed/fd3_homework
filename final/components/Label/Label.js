"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

require ('./Label.css');

class Label extends React.PureComponent {

    static defaultProps = {
        label:      '',
        options:    {
            labelWidth:     0,
        },
    };

    static propTypes = {
        label:              PropTypes.string.isRequired,
        htmlFor:            PropTypes.string,
        postfixClassName:   PropTypes.string,
        labelPosition:      PropTypes.string,
        labelWidth:         PropTypes.number,
        options:            PropTypes.object,
    };

    componentDidMount() {
        let label = ReactDOM.findDOMNode( this.labelElm );
        if ( this.props.options.labelWidth && this.props.options.labelWidth > 0 ) {
            label.style.width = this.props.options.labelWidth + 'px';
        }
    }

    getClassName = () => {
        if ( this.props.postfixClassName ) {
            return 'Label_' + this.props.postfixClassName;
        } else return 'Label'
    };

    render() {
        if ( this.props.label &&
             this.props.label.length > 0 ) {
            return (
                <label
                    ref =     { ( elm ) => { this.labelElm = elm } }
                    htmlFor = { this.props.htmlFor }
                    className = { this.getClassName() }
                    data-label_position = { this.props.labelPosition }>
                    { this.props.label }
                </label>
            );
        } else return null;
    }
}

export default Label;
