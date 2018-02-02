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
import {findArrayItemIndex, isExists, isNotEmpty} from "../../utils/utils";

import {
    fDataLoadAccounts,
    fDataLoadOperationCategories,
    fDataLoadOperations,
    fDataLoadCurrencyList,
} from "../../network/fData";
import {acUIHideMatGlass, acUIShowDataLoadingMessage} from "../../actions/acUI";
import {
    acDataCurrencyListSetData, acDataSetAccountsData, acDataSetOperationCategoriesData,
    acDataSetOperationsData
} from "../../actions/acData";
import {acCurrencySetCurrencyData, acCurrencySetCurrencyAllData} from "../../actions/acCurrency";
import { fCurrencyDailyAll, fCurrencyAll } from "../../network/fCurrency";

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

        currencyListLoadStatus:         PropTypes.number,
        currencyListPrepareStatus:      PropTypes.number,
        currencyListSource:             PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                code:                   PropTypes.string,
                name:                   PropTypes.string,
                abbreviation:           PropTypes.string,
                scale:                  PropTypes.number,
                rate:                   PropTypes.number,
                updated:                PropTypes.any,
            })
        ),
        currencyListData:               PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                code:                   PropTypes.string,
                name:                   PropTypes.string,
                abbreviation:           PropTypes.string,
                scale:                  PropTypes.number,
                rate:                   PropTypes.number,
                updated:                PropTypes.number,
            })
        ),

        currencyAllSource:              PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Cur_ParentID:           PropTypes.number,
                Cur_Code:               PropTypes.string,
                Cur_Abbreviation:       PropTypes.string,
                Cur_Scale:              PropTypes.number,
                Cur_Name:               PropTypes.string,
                Cur_Name_Bel:           PropTypes.string,
                Cur_Name_Eng:           PropTypes.string,
                Cur_QuotName:           PropTypes.string,
                Cur_QuotName_Bel:       PropTypes.string,
                Cur_QuotName_Eng:       PropTypes.string,
                Cur_NameMulti:          PropTypes.string,
                Cur_Name_BelMulti:      PropTypes.string,
                Cur_Name_EngMulti:      PropTypes.string,
                Cur_Periodicity:        PropTypes.number,
                Cur_DateStart:          PropTypes.string,
                Cur_DateEnd:            PropTypes.string,
            })
        ),

        currencyAllDate:                PropTypes.arrayOf(
            PropTypes.shape({
                Cur_ID:                 PropTypes.number,
                Cur_Code:               PropTypes.string,
                Cur_Abbreviation:       PropTypes.string,
                Cur_Scale:              PropTypes.number,
                Cur_Name:               PropTypes.string,
                Cur_QuotName:           PropTypes.string,
                Cur_NameMulti:          PropTypes.string,
            })
        ),

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
                Date:                   PropTypes.objectOf( Date ),
                Cur_Abbreviation:       PropTypes.string,
                Cur_Scale:              PropTypes.number,
                Cur_Name:               PropTypes.string,
                Cur_OfficialRate:       PropTypes.number,
            })
        ),

        currencyLoadStatus:             PropTypes.number,
        currencyPrepareStatus:          PropTypes.number,

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
            MODAL_CONTENT.CURRENCY_LIST_CARD,
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

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'Loader: prepareData: data: ', props );

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
            currencyListSource,
            currencyListLoadStatus,
            currencyListPrepareStatus,
            modalContent,
            currencyAllSource,
            currencyAllData,
            currencyAllLoadStatus,
            currencyAllPrepareStatus,
            currencySource,
            currencyLoadStatus,
            currencyPrepareStatus,
        } = props;

        if ( !accountsLoadStatus ||
             !operationCategoriesLoadStatus ||
             !operationsLoadStatus ||
             !currencyListLoadStatus ||
             !currencyAllLoadStatus ||
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

        if ( !currencyListLoadStatus ) {
            ( this.debug_mode ) &&
            console.log( 'Loader: Currency list need to be loaded...' );

            fDataLoadCurrencyList(
                dispatch,
                null,
                () => { console.log( 'Error: ', text ) },
            )
        }

        if ( !currencyAllLoadStatus ) {
            ( this.debug_mode ) &&
                console.log( 'Loader: Currency all list need to be loaded...' );
            fCurrencyAll( dispatch, null, null );
        }

        if ( !currencyLoadStatus ) {
            ( this.debug_mode ) &&
                console.log( 'Loader: Currency need to be loaded...' );
            fCurrencyDailyAll( dispatch, null, null );
        }

        if ( accountsLoadStatus === 2 &&
             operationCategoriesLoadStatus === 2 &&
             operationsLoadStatus === 2 &&
             currencyListLoadStatus === 2 &&
             currencyAllLoadStatus === 2 &&
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

        if ( !currencyListPrepareStatus && currencyListLoadStatus === 2 ) {
            this.prepareCurrencyListData( currencyListSource );
        }

        if ( !currencyAllPrepareStatus && currencyAllLoadStatus === 2 ) {
            this.prepareCurrencyAllData( currencyAllSource );
        }

        if ( !currencyPrepareStatus && currencyLoadStatus === 2 && currencyAllPrepareStatus === 2 ) {
            this.prepareCurrencyData( currencySource, currencyAllData );
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

    prepareCurrencyListData = ( currencyListSource ) => {
        console.log( 'prepareCurrencyListData: currencyListSource: ', currencyListSource );
        const { dispatch } = this.props;
        let currencyListData = [ ...currencyListSource ];
        dispatch( acDataCurrencyListSetData( currencyListData ) );
    };

    prepareCurrencyData = ( currencySource, currencyAllData ) => {
        const { dispatch } = this.props;
        let currencyData = currencySource.map( ( item ) => {
            let date = new Date( Date.parse( item.Date ) );
            let currencyAllIndex = findArrayItemIndex( currencyAllData, { Cur_ID: item.Cur_ID } );
            const { Cur_Code, Cur_Name, Cur_NameMulti, Cur_QuotName } = currencyAllData[ currencyAllIndex ];
            // console.log( 'TEST: item.Cur_ID:', item.Cur_ID, ': index: ', currencyAllIndex );
            return {
                ...item,
                Date: date,
                Cur_Code,
                Cur_Name,
                Cur_NameMulti,
                Cur_QuotName,
                // Cur_Code: currencyAllData[ currencyAllIndex ].Cur_Code,
            }
        } );
        dispatch( acCurrencySetCurrencyData( currencyData ) );
    };

    prepareCurrencyAllData = ( currencyAllSource ) => {
        const { dispatch } = this.props;
        let currencyAllData = currencyAllSource.map( ( item ) => {
            const {
                Cur_ID,
                Cur_Code,
                Cur_Abbreviation,
                Cur_Scale,
                Cur_Name,
                Cur_QuotName,
                Cur_NameMulti,
            } = item;
            return {
                Cur_ID,
                Cur_Code,
                Cur_Abbreviation,
                Cur_Scale,
                Cur_Name,
                Cur_QuotName,
                Cur_NameMulti,
            }
        } );
        dispatch( acCurrencySetCurrencyAllData( currencyAllData ) );
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
    // console.log( 'Loader: mapStateToProps: state: ', state );
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

        currencyListLoadStatus:         state.data.currencyListLoadStatus,
        currencyListPrepareStatus:      state.data.currencyListPrepareStatus,
        currencyListSource:             state.data.currencyListSource,
        currencyListData:               state.data.currencyListData,

        currencyAllLoadStatus:          state.currency.currencyAllLoadStatus,
        currencyAllPrepareStatus:       state.currency.currencyAllPrepareStatus,
        currencyAllSource:              state.currency.currencyAllSource,
        currencyAllData:                state.currency.currencyAllData,

        currencyLoadStatus:             state.currency.currencyLoadStatus,
        currencyPrepareStatus:          state.currency.currencyPrepareStatus,
        currencySource:                 state.currency.currencySource,
        currencyData:                   state.currency.currencyData,

        matGlassIsVisible:              state.ui.matGlassIsVisible,
        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( Loader );