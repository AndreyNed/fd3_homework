'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MODAL_CONTENT } from "../../data_const/data_const";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_DATA_LOADING } from "../../config/config";

import './DataDeleting.scss';

class DataDeleting extends React.PureComponent {

    static propTypes = {
        modalContent:       PropTypes.string,
    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'DataDeleting_' + DataDeleting.classID;
    };

    constructor( props ) {
        super( props );
        DataDeleting.classID++;
        this.state = {
            htmlID: DataDeleting.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_DATA_LOADING;

    classCSS = 'DataDeleting';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'DataDeleting: prepareData: new props: ', props )

        // todo
    };

    render() {
        const { modalContent } = this.props;
        return ( modalContent === MODAL_CONTENT.DATA_DELETING ) &&
            <div className = { this.classCSS }>
                Идет удаление...
            </div>
    }

}

const mapStateToProps = function ( state ) {
    return {
        modalContent:              state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( DataDeleting );