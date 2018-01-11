'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MODAL_CONTENT } from "../../data_const/data_const";

import './DataLoading.scss';

class DataLoading extends React.PureComponent {

    static propTypes = {
        modalContent:       PropTypes.string,
    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'DataLoading_' + DataLoading.classID;
    };

    constructor( props ) {
        super( props );
        DataLoading.classID++;
        this.state = {
            htmlID: DataLoading.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = true;

    classCSS = 'DataLoading';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
        console.log( 'DataLoading: prepareData: new props: ', props )

        // todo
    };

    render() {
        const { modalContent } = this.props;
        return ( modalContent === MODAL_CONTENT.DATA_LOADING ) &&
            <div className = { this.classCSS }>
                Загрузка данных...
            </div>
    }

}

const mapStateToProps = function ( state ) {
    return {
        modalContent:              state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( DataLoading );