'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MODAL_CONTENT } from "../../data_const/data_const";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_DATA_LOADING } from "../../config/config";

import './DataSaving.scss';

class DataSaving extends React.PureComponent {

    static propTypes = {
        modalContent:       PropTypes.string,
    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'DataSaving_' + DataSaving.classID;
    };

    constructor( props ) {
        super( props );
        DataSaving.classID++;
        this.state = {
            htmlID: DataSaving.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_DATA_LOADING;

    classCSS = 'DataSaving';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'DataSaving: prepareData: new props: ', props )

        // todo
    };

    render() {
        const { modalContent } = this.props;
        return ( modalContent === MODAL_CONTENT.DATA_SAVING ) &&
            <div className = { this.classCSS }>
                Сохранение данных...
            </div>
    }

}

const mapStateToProps = function ( state ) {
    return {
        modalContent:              state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( DataSaving );