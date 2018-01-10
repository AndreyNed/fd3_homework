'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MODAL_CONTENT } from "../../data_const/data_const";

import { acUIHideMatGlass } from "../../actions/acUI";

import OperationCard from "../OperationCard/OperationCard";

import './MatGlass.scss';

class MatGlass extends React.PureComponent {

    static propTypes = {
        isVisible:              PropTypes.bool,
        modalContent:           PropTypes.string,
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
        const { isVisible, modalContent } = this.props;
        return (
            ( isVisible ) &&
            <div className = { this.classCSS }
                 onClick = { this.glassClick }>
                {
                    ( modalContent === MODAL_CONTENT.DATA_LOADING ) &&
                        <div className = { this.classCSS + "_message" }>
                            Загрузка данных...
                        </div>
                }
                <OperationCard />
            </div>
        )
    }

}

const mapStateToProps = function ( state ) {
    return {
        isVisible:      state.ui.matGlassIsVisible,
        modalContent:   state.ui.modalContent,
    };
};

export default connect( mapStateToProps )( MatGlass );