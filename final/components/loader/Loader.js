'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MatGlass from  '../MatGlass/MatGlass';
import OperationCard from '../OperationCard/OperationCard';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from '../../pages/PagesRouter';
import PagesLinks  from '../../pages/PagesLinks';

import {fDataLoadAccounts, fDataLoadOperationCategories, fDataLoadOperations} from "../../network/fData";
import {acUIHideMatGlass, acUIShowMatGlass} from "../../actions/acUI";

class Loader extends React.PureComponent {

    static propTypes = {
        accountsData:                   PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                amount:                 PropTypes.number,
            })
        ),
        operationCategoriesData:        PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
            })
        ),
        operationsData:                 PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                accountId:              PropTypes.number,
                categoryId:             PropTypes.number,
                type:                   PropTypes.string,
                sum:                    PropTypes.number,
                date:                   PropTypes.any,
                comment:                PropTypes.string,
            })
        ),
        accountsLoadStatus:             PropTypes.number,
        operationCategoriesLoadStatus:  PropTypes.number,
    };

    static defaultProps = {
        // accountsLoadStatus: 0,
    };

    classCSS = 'Loader';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( data ) => {
        // console.log( 'Loader: prepareData: data: ', data );
        let props = { ...data };

        const {
            dispatch,
            accountsLoadStatus,
            operationCategoriesLoadStatus,
            operationsLoadStatus,
            matGlassIsVisible,
        } = props;

        if ( !accountsLoadStatus ||
             !operationCategoriesLoadStatus )
            dispatch( acUIShowMatGlass() );

        if ( !accountsLoadStatus ) {
            // console.log( 'Accounts need to be loaded...' );
            fDataLoadAccounts(
                dispatch,
                () => { /*console.log( 'Accounts are loaded: ', this.props.accountsData )*/ },
                () => { console.log( 'Error: ', text ) },
            )
        }

        if ( !operationCategoriesLoadStatus ) {
            // console.log( 'Operation categories need to be loaded...' );
            fDataLoadOperationCategories(
                dispatch,
                () => { /*console.log( 'Operation categories are loaded: ', this.props.operationCategoriesData )*/ },
                () => { console.log( 'Error: ', text ) },
            )
        }

        if ( !operationsLoadStatus ) {
            // console.log( 'Operations need to be loaded...' );
            fDataLoadOperations(
                dispatch,
                () => { /*console.log( 'Operations are loaded: ', this.props.operationsData )*/ },
                () => { console.log( 'Error: ', text ) },
            )
        }

        if ( accountsLoadStatus == 2 &&
             operationCategoriesLoadStatus == 2 &&
             operationsLoadStatus == 2 &&
             matGlassIsVisible )
            setTimeout( () => { dispatch( acUIHideMatGlass() ) }, 1000 );
    };

    render() {
        const {
            accountsLoadStatus, operationCategoriesLoadStatus, operationsLoadStatus, matGlassIsVisible
        } = this.props;
        return (
            <div className = { this.classCSS }>
                <MatGlass />
                <OperationCard />
                {
                    ( accountsLoadStatus == 2 &&
                      operationCategoriesLoadStatus == 2 &&
                      operationsLoadStatus == 2 &&
                      !matGlassIsVisible ) &&
                    <BrowserRouter>
                        <div className = { this.classCSS + "_router" }>
                            <PagesLinks />
                            <PagesRouter />
                        </div>
                    </BrowserRouter>
                }
            </div>
        )
    }
}

const mapStateToProps = function ( state ) {
    return {
        accountsData:                   state.data.accountsData,
        operationCategoriesData:        state.data.operationCategoriesData,
        operationsData:                 state.data.operationsData,

        accountsLoadStatus:             state.data.accountsLoadStatus,
        operationCategoriesLoadStatus:  state.data.operationCategoriesLoadStatus,
        operationsLoadStatus:           state.data.operationsLoadStatus,

        matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( Loader );