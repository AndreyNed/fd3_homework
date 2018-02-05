'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_UI_MODE_TIMEOUT, USER_LOGIN } from "../config/config";
import { DATA_TYPES } from "../data_const/data_const";
import '../utils/utils';

// import './ComponentTemplate.scss';

class ComponentTemplate extends React.PureComponent {

    static propTypes = {

    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'ComponentTemplate_' + ComponentTemplate.classID;
    };

    constructor( props ) {
        super( props );
        ComponentTemplate.classID++;
        this.state = {
            htmlID: ComponentTemplate.getHtmlID( props.htmlID ),
        };
        this.debug_mode = true;
        this.classCSS = 'ComponentTemplate';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'ComponentTemplate: prepareData: new props: ', props )
        
        // todo
    };

    render() {
        return (
            <div className = { this.classCSS }>

            </div>
        )
    }

}

const mapStateToProps = function ( state ) {
    return {
        accountsData:                   state.data.accountsData,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( ComponentTemplate );