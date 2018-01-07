'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
        }
    }

    debug_mode = true;

    classCSS = 'ComponentTemplate';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( this.classCSS + ': prepareData: new props: ', props )
        
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
        matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( ComponentTemplate );