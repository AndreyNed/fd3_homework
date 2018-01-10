'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { acUIHideMatGlass } from "../../actions/acUI";

import './MatGlass.scss';

class MatGlass extends React.PureComponent {

    static propTypes = {
        isVisible:              PropTypes.bool,
    };

    static defaultProps = {
        isVisible:              true,
    };

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        // todo
    };

    classCSS = 'MatGlass';

    glassClick = ( e ) => {
        this.props.dispatch( acUIHideMatGlass() );
    };

    render() {
        const { isVisible } = this.props;
        return (
            ( isVisible ) &&
            <div className = { this.classCSS }
                 onClick = { this.glassClick }>
                <div className = { this.classCSS + "_message" }>
                    Загрузка данных...
                </div>
            </div>
        )
    }

}

const mapStateToProps = function ( state ) {
    return {
        isVisible:      state.ui.matGlassIsVisible,
    };
};

export default connect( mapStateToProps )( MatGlass );