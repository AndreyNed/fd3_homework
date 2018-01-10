'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './OperationCard.scss';

class OperationCard extends React.PureComponent {

    static propTypes = {
        operationCardIsVisible: PropTypes.bool,
    };

    static defaultProps = {
        operationCardIsVisible: false,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'OperationCard_' + OperationCard.classID;
    };

    constructor( props ) {
        super( props );
        OperationCard.classID++;
        this.state = {
            htmlID: OperationCard.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = true;

    classCSS = 'OperationCard';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
        console.log( 'OperationCard: prepareData: new props: ', props )

        // todo
    };

    render() {
        const { operationCardIsVisible } = this.props;
        return ( operationCardIsVisible ) &&
            <div className = { this.classCSS }>
                <div className = { this.classCSS + '_form' }>
                    Operation card
                </div>
            </div>
    }

}

const mapStateToProps = function ( state ) {
    return {
        accountsData:                   state.data.accountsData,
        operationCardIsVisible:         state.ui.operationCardIsVisible,
    }
};

export default connect( mapStateToProps )( OperationCard );