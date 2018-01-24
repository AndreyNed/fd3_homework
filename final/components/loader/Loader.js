'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MatGlass from  '../MatGlass/MatGlass';
import OperationCard from '../OperationCard/OperationCard';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from '../../pages/PagesRouter';
import PagesLinks  from '../../pages/PagesLinks';

import { MODAL_CONTENT } from "../../data_const/data_const";
import { CONFIG_UI_MODE_TIMEOUT, } from "../../config/config";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_LOADER } from "../../config/config";
import {isExists, isNotEmpty} from "../../utils/utils";

import {fDataLoadAccounts, fDataLoadOperationCategories, fDataLoadOperations} from "../../network/fData";
import {acUIHideMatGlass, acUIShowMatGlass, acUIShowDataLoadingMessage} from "../../actions/acUI";
import { acDataSetAccountsData, acDataSetOperationCategoriesData, acDataSetOperationsData } from "../../actions/acData";

class Loader extends React.PureComponent {

    static propTypes = {
        accountsSource:                 PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
            })
        ),
        accountsData:                   PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
            })
        ),
        operationCategoriesSource:      PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
            })
        ),
        operationCategoriesData:        PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
            })
        ),
        operationsSource:               PropTypes.arrayOf(
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
        accountsPrepareStatus:          PropTypes.number,
        operationCategoriesLoadStatus:  PropTypes.number,
        operationCategoriesPrepareStatus: PropTypes.number,
        operationsLoadStatus:           PropTypes.number,
        operationsPrepareStatus:        PropTypes.number,
        matGlassIsVisible:              PropTypes.bool,
        modalContent:                   PropTypes.string,
    };

    static defaultProps = {
        // accountsLoadStatus: 0,
    };

    classCSS = 'Loader';

    debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_LOADER;

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( data ) => {
        ( this.debug_mode ) &&
            console.log( 'Loader: prepareData: data: ', data );

        let props = { ...data };

        const {
            dispatch,
            accountsLoadStatus,
            accountsSource,
            accountsPrepareStatus,
            operationCategoriesLoadStatus,
            operationCategoriesSource,
            operationCategoriesPrepareStatus,
            operationsLoadStatus,
            operationsSource,
            operationsPrepareStatus,
            matGlassIsVisible,
            modalContent,
        } = props;

        if ( !accountsLoadStatus ||
             !operationCategoriesLoadStatus ||
             !operationsLoadStatus )
            dispatch( acUIShowDataLoadingMessage() );

        if ( !accountsLoadStatus ) {
            ( this.debug_mode ) &&
                console.log( 'Loader: Accounts need to be loaded...' );

            fDataLoadAccounts(
                dispatch,
                null,
                () => { console.log( 'Error: ', text ) },
            )
        }

        if ( !operationCategoriesLoadStatus ) {
            ( this.debug_mode ) &&
                console.log( 'Loader: Operation categories need to be loaded...' );

            fDataLoadOperationCategories(
                dispatch,
                null,
                () => { console.log( 'Error: ', text ) },
            )
        }

        if ( !operationsLoadStatus ) {
            ( this.debug_mode ) &&
                console.log( 'Loader: Operations need to be loaded...' );

            fDataLoadOperations(
                dispatch,
                null,
                () => { console.log( 'Error: ', text ) },
            )
        }

        if ( accountsLoadStatus === 2 &&
             operationCategoriesLoadStatus === 2 &&
             operationsLoadStatus === 2 &&
             modalContent === MODAL_CONTENT.DATA_LOADING )
            setTimeout( () => { dispatch( acUIHideMatGlass() ) }, CONFIG_UI_MODE_TIMEOUT );

        if ( !accountsPrepareStatus && accountsLoadStatus === 2 ) {
            this.prepareAccountsData( accountsSource );
        }

        if ( !operationCategoriesPrepareStatus && operationCategoriesLoadStatus === 2 ) {
            this.prepareOperationCategoriesData( operationCategoriesSource );
        }

        if ( !operationsPrepareStatus && operationsLoadStatus === 2 ) {
            this.prepareOperationsData( operationsSource );
        }
    };

    prepareAccountsData = ( accountsSource ) => {
        const { dispatch } = this.props;
        let accountsData = [ ...accountsSource ];
        dispatch( acDataSetAccountsData( accountsData ) );
    };

    prepareOperationCategoriesData = ( operationCategoriesSource ) => {
        const { dispatch } = this.props;
        let operationCategoriesData = [ ...operationCategoriesSource ];
        dispatch( acDataSetOperationCategoriesData( operationCategoriesData ) );
    };

    prepareOperationsData = ( operationsSource ) => {
        const { dispatch } = this.props;
        let operationsData = [ ...operationsSource ];
        dispatch( acDataSetOperationsData( operationsData ) );
    };

    render() {
        ( this.debug_mode ) &&
            console.log( 'Loader: render: props: ', this.props );
        const {
            accountsPrepareStatus, operationCategoriesPrepareStatus, operationsPrepareStatus,
            accountsData, operationCategoriesData, operationsData,
            modalContent
        } = this.props;

        /*


                    */

        return (
            <div className = { this.classCSS }>
                <MatGlass />
                {
                    ( ( accountsPrepareStatus === 2 && isNotEmpty( accountsData ) ) &&
                      ( operationCategoriesPrepareStatus === 2 && isNotEmpty( operationCategoriesData ) ) &&
                      ( operationsPrepareStatus === 2 && isNotEmpty( operationsData ) ) ) &&
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
        accountsSource:                 state.data.accountsSource,
        operationCategoriesSource:      state.data.operationCategoriesSource,
        operationsSource:               state.data.operationsSource,

        accountsData:                   state.data.accountsData,
        operationCategoriesData:        state.data.operationCategoriesData,
        operationsData:                 state.data.operationsData,

        accountsLoadStatus:             state.data.accountsLoadStatus,
        operationCategoriesLoadStatus:  state.data.operationCategoriesLoadStatus,
        operationsLoadStatus:           state.data.operationsLoadStatus,

        accountsPrepareStatus:          state.data.accountsPrepareStatus,
        operationCategoriesPrepareStatus: state.data.operationCategoriesPrepareStatus,
        operationsPrepareStatus:         state.data.operationsPrepareStatus,

        matGlassIsVisible:              state.ui.matGlassIsVisible,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( Loader );