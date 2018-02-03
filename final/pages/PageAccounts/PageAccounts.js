'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_ACCOUNTS, CONFIG_UI_MODE_TIMEOUT, USER_LOGIN } from "../../config/config";
import {ALIGN_TYPES, DATA_TYPES, OPERATION_TYPES, SORTING} from "../../data_const/data_const";
import '../../utils/utils';

import SmartGrid from '../../components/SmartGrid/SmartGrid';

import './PageAccounts.scss';
import {findArrayItemIndex, formatDate, isExists, isNotEmpty} from "../../utils/utils";

class PageAccounts extends React.PureComponent {

    static propTypes = {
        accountsData:                   PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
                currency:               PropTypes.number,
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


    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'PageAccounts_' + PageAccounts.classID;
    };

    constructor( props ) {
        super( props );
        PageAccounts.classID++;
        this.state = {
            htmlID: PageAccounts.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_PAGE_ACCOUNTS ;
        this.classCSS = 'PageAccounts';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
        console.log( 'PageAccounts: prepareData: new props: ', props )

        // todo
    };

    prepareTableProps = () => {
        const { NUMBER, STRING, DATE } = DATA_TYPES;
        const { RIGHT, LEFT, CENTER } = ALIGN_TYPES;
        const { NONE } = SORTING;
        const { accountsData } = this.props;
        let body = ( isNotEmpty( accountsData ) )
            ? accountsData.map( ( item, index ) => {
                let accountInfo = this.getAccountInfo( item.id, item.currency );
                let date = ( isExists( accountInfo.updated ) )
                    ? new Date( accountInfo.updated )
                    : '';
                // console.log( 'test: date: ', test );
                return {
                    rowIndex: index,
                    cells: [
                        {
                            id: 'id',
                            value: item.id,
                        },
                        {
                            id: 'name',
                            value: item.name,
                        },
                        {
                            id: 'debit',
                            value: accountInfo.debit,
                        },
                        {
                            id: 'credit',
                            value: accountInfo.credit,
                        },
                        {
                            id: 'amount',
                            value: accountInfo.amount,
                        },
                        {
                            id: 'currency',
                            value: accountInfo.currency,
                        },
                        {
                            id: 'amountBYN',
                            value: accountInfo.amountBYN,
                        },
                        {
                            id: 'updated',
                            value: date,
                        },
                        {
                            id: 'comment',
                            value: item.comment,
                        }
                    ]
                }
            } )
            : null;
        return {
            userLogin: USER_LOGIN,
            tableName: 'accountsMainTable',
            primaryId: 'id',
            withCaption: true,
            caption: 'Счета',
            withFilter: true,
            withFooter: true,
            withButtonExport: true,
            headers: [
                {
                    id: 'id',
                    title: 'id',
                    dataType: NUMBER,
                    align: RIGHT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: '5%',
                },
                {
                    id: 'name',
                    title: 'Название',
                    dataType: STRING,
                    align: LEFT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: true,
                    isVisible: true,
                    width: '15%',
                },
                {
                    id: 'debit',
                    title: 'Приход',
                    dataType: NUMBER,
                    align: RIGHT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: '10%',
                },
                {
                    id: 'credit',
                    title: 'Расход',
                    dataType: NUMBER,
                    align: RIGHT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: '10%',
                },
                {
                    id: 'amount',
                    title: 'Сумма',
                    dataType: NUMBER,
                    align: RIGHT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: '10%',
                },
                {
                    id: 'currency',
                    title: 'Валюта',
                    dataType: STRING,
                    align: CENTER,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: '15%',
                },
                {
                    id: 'amountBYN',
                    title: 'Сумма (BYN)',
                    dataType: NUMBER,
                    align: RIGHT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: '15%',
                },
                {
                    id: 'updated',
                    title: 'Обновлено',
                    dataType: DATE,
                    align: RIGHT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: '10%',
                },
                {
                    id: 'comment',
                    title: 'Комментарий',
                    dataType: NUMBER,
                    align: RIGHT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: 'auto',
                },
            ],
            body,
            cbChanged:  null,
        }
    };

    /* == service functions == */

    getAccountInfo = ( accountId, currencyId ) => {
        const { operationsData, currencyListData } = this.props;
        const { CREDIT } = OPERATION_TYPES;
        let result = { amount: 0, credit: 0, debit: 0, currency: '', amountBYN: 0, rate: 1, scale: 1, updated: null };
        if ( isNotEmpty( operationsData ) ) {
            operationsData.forEach( ( item ) => {
                if ( item.accountId === accountId ) {
                    ( item.type === CREDIT )
                        ? result.credit += item.sum
                        : result.debit += item.sum;
                    result.updated = Math.max( result.updated, item.date );
                }
            } );
            result.amount = result.debit - result.credit;
        }
        if ( isExists( currencyId ) && currencyId > 0 && isNotEmpty( currencyListData ) ) {
            let curIndex = findArrayItemIndex( currencyListData, { id: currencyId } );
            if ( curIndex > -1 ) {
                result.currency = currencyListData[ curIndex ].abbreviation;
                result.rate = currencyListData[ curIndex ].rate;
                result.scale = currencyListData[ curIndex ].scale;
                // console.log( `AccountId: ${accountId}, curAbbreviation: ${curAbbreviation}` );
            } else {

            }
        }
        result.amountBYN = result.amount / result.scale * result.rate;
        // ( this.debug_mode ) &&
            // console.log( 'PageAccounts: getAccountInfo: accountId: ', accountId, '; result: ', result );
        return result;
    };

    /* == render functions == */

    renderMainSection = () => {
        let props = this.prepareTableProps();
        return (
            <div className = { this.classCSS + "_main_section" }
                 key="main_section">
                <div className="rows" >
                    <div className="cols col_16">
                        <SmartGrid { ...props }/>
                    </div>
                </div>
            </div>
        )
    };

    renderButtonSection = () => {
        return (
            <div className = { this.classCSS + "_button_section" }
                 key="button_section">
                Button section
            </div>
        )
    };

    render() {
        return (
            <div className = { this.classCSS }>
                <div className="wrapper">
                    { this.renderMainSection() }
                    { this.renderButtonSection() }
                </div>
            </div>
        )
    }

}

const mapStateToProps = function ( state ) {
    return {
        accountsData:                   state.data.accountsData,
        operationsData:                 state.data.operationsData,
        currencyListData:               state.data.currencyListData,

        currencyData:                   state.currency.currencyData,

        matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( PageAccounts );