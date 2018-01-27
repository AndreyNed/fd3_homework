'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MatGlass from  '../MatGlass/MatGlass';
import OperationCard from '../OperationCard/OperationCard';
import { BrowserRouter } from 'react-router-dom';
import PagesRouter from '../../pages/PagesRouter';
import PagesLinks  from '../../pages/PagesLinks';
// import CurrencyLoader from '../../components/CurrencyLoader/CurrencyLoader';

import { MODAL_CONTENT } from "../../data_const/data_const";
import { CONFIG_UI_MODE_TIMEOUT, } from "../../config/config";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_LOADER } from "../../config/config";
import {isExists, isNotEmpty} from "../../utils/utils";

import {fDataLoadAccounts, fDataLoadOperationCategories, fDataLoadOperations} from "../../network/fData";
import {acUIHideMatGlass, acUIShowDataLoadingMessage} from "../../actions/acUI";
import {acDataSetAccountsData, acDataSetOperationCategoriesData, acDataSetOperationsData} from "../../actions/acData";
import {acCurrencySetCurrencyData, acCurrencySetDynamicCurrencyData} from "../../actions/acCurrency";
import { fCurrencyDailyAll, fCurrencyDynamicRates } from "../../network/fCurrency";

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
                date:                   PropTypes.number,
                comment:                PropTypes.string,
            })
        ),
        accountsLoadStatus:             PropTypes.number,
        accountsPrepareStatus:          PropTypes.number,
        operationCategoriesLoadStatus:  PropTypes.number,
        operationCategoriesPrepareStatus: PropTypes.number,
        operationsLoadStatus:           PropTypes.number,
        operationsPrepareStatus:        PropTypes.number,

        currencySource:                 PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.string,
                Cur_Abbreviation:       PropTypes.string,
                Cur_Scale:              PropTypes.number,
                Cur_Name:               PropTypes.string,
                Cur_OfficialRate:       PropTypes.number,
            })
        ),

        currencyData:                   PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.date,
                Cur_Abbreviation:       PropTypes.string,
                Cur_Scale:              PropTypes.number,
                Cur_Name:               PropTypes.string,
                Cur_OfficialRate:       PropTypes.number,
            })
        ),

        currencyLoadStatus:             PropTypes.number,
        currencyPrepareStatus:          PropTypes.number,

        currencyDynamicSource:          PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.string,
                Cur_OfficialRate:       PropTypes.number,
            })
        ),

        currencyDynamicData:            PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Date:                   PropTypes.objectOf( Date ),
                Cur_OfficialRate:       PropTypes.number,
            })
        ),

        currencyDynamicLoadStatus:      PropTypes.number,
        currencyDynamicPrepareStatus:   PropTypes.number,
        currencyDynamicCurID:           PropTypes.number,
        currencyDynamicStartDate:       PropTypes.objectOf( Date ),
        currencyDynamicEndDate:         PropTypes.objectOf( Date ),

        matGlassIsVisible:              PropTypes.bool,
        modalContent:                   PropTypes.oneOf([
            MODAL_CONTENT.NONE,
            MODAL_CONTENT.DATA_DELETING,
            MODAL_CONTENT.DELETE_CONFIRMATION,
            MODAL_CONTENT.DATA_SAVING,
            MODAL_CONTENT.DATA_LOADING,
            MODAL_CONTENT.OPERATION_CARD,
            MODAL_CONTENT.ACCOUNT_CARD,
            MODAL_CONTENT.OPERATION_CATEGORY_CARD,
        ]),
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
            currencySource,
            currencyData,
            currencyLoadStatus,
            currencyPrepareStatus,
            currencyDynamicSource,
            currencyDynamicData,
            currencyDynamicLoadStatus,
            currencyDynamicPrepareStatus,
            currencyDynamicCurID,
            currencyDynamicStartDate,
            currencyDynamicEndDate,
        } = props;

        if ( !accountsLoadStatus ||
             !operationCategoriesLoadStatus ||
             !operationsLoadStatus ||
             !currencyLoadStatus )
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

        if ( !currencyLoadStatus ) {
            ( this.debug_mode ) &&
                console.log( 'Loader: Currency need to be loaded...' );
            fCurrencyDailyAll( dispatch, null, null );
        }

        if ( !currencyDynamicLoadStatus ) {
            fCurrencyDynamicRates( dispatch, null, null, {
                Cur_ID: ( currencyDynamicCurID + '' ), startDate: '2017-1-1', endDate: '2017-12-31'
            } )
        }

        if ( accountsLoadStatus === 2 &&
             operationCategoriesLoadStatus === 2 &&
             operationsLoadStatus === 2 &&
             currencyLoadStatus === 2 &&
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

        if ( !currencyPrepareStatus && currencyLoadStatus === 2 ) {
            this.prepareCurrencyData( currencySource );
        }

        if ( currencyDynamicLoadStatus === 2 &&
            currencyDynamicPrepareStatus === 0 ) {
            this.prepareCurrencyDynamicData( currencyDynamicSource );
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

    prepareCurrencyData = ( currencySource ) => {
        const { dispatch } = this.props;
        let currencyData = currencySource.map( ( item ) => {
            let date = new Date( Date.parse( item.Date ) );
            return {
                ...item,
                Date: date,
            }
        } );
        dispatch( acCurrencySetCurrencyData( currencyData ) );
    };

    prepareCurrencyDynamicData = ( currencyDynamicSource ) => {
        ( this.debug_mode ) &&
            console.log( 'Loader: prepareCurrencyDynamicData: currencyDynamicSource: ', currencyDynamicSource );
        const { dispatch } = this.props;
        let currencyDynamicData = ( isNotEmpty( currencyDynamicSource ) )
            ? currencyDynamicSource.map( ( item ) => {
                let date = new Date( Date.parse( item.Date ) );
                return {
                    ...item,
                    Date: date,
                }
            } )
            : [];
        dispatch( acCurrencySetDynamicCurrencyData( currencyDynamicData ) );
    };

    render() {
        // ( this.debug_mode ) &&
        //     console.log( 'Loader: render: props: ', this.props );
        const {
            accountsPrepareStatus, operationCategoriesPrepareStatus, operationsPrepareStatus,
            accountsData, operationCategoriesData, operationsData, currencyPrepareStatus, currencyData,
            modalContent
        } = this.props;
        /**/
        /*( currencyPrepareStatus === 2 && isNotEmpty( currencyData ) ) ) &&*/
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

        currencyLoadStatus:             state.currency.currencyLoadStatus,
        currencyPrepareStatus:          state.currency.currencyPrepareStatus,
        currencySource:                 state.currency.currencySource,
        currencyData:                   state.currency.currencyData,

        currencyDynamicSource:          state.currency.currencyDynamicSource,
        currencyDynamicData:            state.currency.currencyDynamicData,
        currencyDynamicLoadStatus:      state.currency.currencyDynamicLoadStatus,
        currencyDynamicPrepareStatus:   state.currency.currencyDynamicPrepareStatus,
        currencyDynamicCurID:           state.currency.currencyDynamicCurID,
        currencyDynamicStartDate:       state.currency.currencyDynamicStartDate,
        currencyDynamicEndDate:         state.currency.currencyDynamicEndDate,

        matGlassIsVisible:              state.ui.matGlassIsVisible,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( Loader );