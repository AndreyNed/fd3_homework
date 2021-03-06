'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { acUIHideMatGlass } from "../../actions/acUI";

import OperationCard from "../OperationCard/OperationCard";
import AccountCard from '../AccountCard/AccountCard';
import OperationCategoryCard from '../OperationCategoryCard/OperationCategoryCard';
import CurrencyListCard from '../CurrencyListCard/CurrencyListCard';
import AccountFilterPanel from '../AccountFilterPanel/AccountFilterPanel';
import DataLoading from "../DataLoading/DataLoading";
import DataSaving from '../DataSaving/DataSaving';
import DataDeleting from '../DataDeleting/DataDeleting';
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmation';

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

    /*

    */

    render() {
        const { isVisible, modalContent } = this.props;
        return (
            ( isVisible ) &&
            <div className = { this.classCSS }
                 onClick = { this.glassClick }>
                <DataLoading />
                <DataSaving />
                <DataDeleting />
                <DeleteConfirmation />
                <OperationCard />
                <AccountCard />
                <AccountFilterPanel />
                <OperationCategoryCard />
                <CurrencyListCard />
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