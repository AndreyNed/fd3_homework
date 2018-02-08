'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_ACCOUNTS, CONFIG_UI_MODE_TIMEOUT, USER_LOGIN } from "../../config/config";
import {ALIGN_TYPES, DATA_TYPES, DISPLAY_TYPES, OPERATION_TYPES, SORTING} from "../../data_const/data_const";
import '../../utils/utils';

import SmartGrid from '../../components/SmartGrid/SmartGrid';
import ButtonFilter from '../../components/buttons/ButtonFilter/ButtonFilter';

import './PageAccounts.scss';
import { findArrayItemIndex, formatDate, isExists, isNotEmpty } from '../../utils/utils';
import { acUIShowAccountFilterPanel } from '../../actions/acUI';

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

        accountFilters:                 PropTypes.shape({
            dateStart:                  PropTypes.objectOf( Date ),
            dateEnd:                    PropTypes.objectOf( Date ),
            categories:                 PropTypes.arrayOf(
                PropTypes.number
            ),
            accounts:                   PropTypes.arrayOf(
                PropTypes.number
            ),
        }),
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
        const { NUMBER, CURRENCY, STRING, DATE } = DATA_TYPES;
        const { RIGHT, LEFT, CENTER } = ALIGN_TYPES;
        const { NONE } = SORTING;
        const { accountsData, accountFilters } = this.props;
        const { dateStart, dateEnd, accounts } = accountFilters;

        let body = null;

        if ( isNotEmpty( accountsData ) ) {
            body = [];
            accountsData.forEach( ( item, index ) => {
                if ( isExists( accounts ) && accounts.indexOf( item.id ) === -1 ) return;
                let accountInfo = this.getAccountInfo( item.id, item.currency );
                let date = ( isExists( accountInfo.updated ) )
                    ? new Date( accountInfo.updated )
                    : '';
                body.push( {
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
                            id: 'base',
                            value: accountInfo.base,
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
                } );
            } );
        }

        const caption = ( isExists( dateStart ) )
            ? `Счета за период с ${ formatDate( dateStart ) } по ${ formatDate( dateEnd ) }`
            : 'Счета';

        return {
            userLogin: USER_LOGIN,
            tableName: 'accountsMainTable',
            primaryId: 'id',
            withCaption: true,
            caption,
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
                    width: '10%',
                },
                {
                    id: 'base',
                    title: 'База',
                    dataType: CURRENCY,
                    align: RIGHT,
                    isSortable: true,
                    sorting: NONE,
                    isSearchable: false,
                    isVisible: true,
                    width: '10%',
                },
                {
                    id: 'debit',
                    title: 'Приход',
                    dataType: CURRENCY,
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
                    dataType: CURRENCY,
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
                    dataType: CURRENCY,
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
                    dataType: CURRENCY,
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
                    isSortable: false,
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

    btnPanelProps = () => {
        const { block } = DISPLAY_TYPES;
        return {
            btnFilter: {
                label: 'Фильтры',
                display: block,
                withLabel: true,
                cbChanged: this.btnFilter_cbChanged,
            },
        }
    };

    /* == callbacks == */

    btnFilter_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acUIShowAccountFilterPanel() );
    };

    /* == service functions == */

    getAccountInfo = ( accountId, currencyId ) => {
        const {
            operationsData,
            currencyListData,
            accountFilters,
        } = this.props;

        const { CREDIT } = OPERATION_TYPES;

        let result = {
            base: 0,
            amount: 0,
            credit: 0,
            debit: 0,
            currency: '',
            amountBYN: 0,
            rate: 1,
            scale: 1,
            updated: null
        };

        // base amount and debit / credit calculation
        const { dateStart, dateEnd, categories } = accountFilters;

        if ( isNotEmpty( operationsData ) ) {
            operationsData.forEach( ( item ) => {
                if ( item.accountId !== accountId ) return;

                if ( isNotEmpty( categories ) ) {
                    if ( categories.indexOf( item.categoryId ) === -1 ) return;
                }

                if ( ( isExists( dateEnd ) && dateEnd.getTime() < item.date ) ) return;

                result.updated = Math.max( result.updated, item.date );

                if ( isExists( dateStart ) && dateStart.getTime() > item.date ) {

                    ( item.type === CREDIT )
                        ? result.base -= item.sum
                        : result.base += item.sum;

                } else {

                    ( item.type === CREDIT )
                        ? result.credit += item.sum
                        : result.debit += item.sum;

                }

            } );

            result.amount = result.base + result.debit - result.credit;
        }

        if ( isExists( currencyId ) && currencyId > 0 && isNotEmpty( currencyListData ) ) {
            let curIndex = findArrayItemIndex( currencyListData, { id: currencyId } );
            if ( curIndex > -1 ) {
                result.currency = currencyListData[ curIndex ].abbreviation;
                result.rate = currencyListData[ curIndex ].rate;
                result.scale = currencyListData[ curIndex ].scale;
                // console.log( `AccountId: ${accountId}, curAbbreviation: ${curAbbreviation}` );
            }
        }

        result.amountBYN = Math.round( result.amount / result.scale * result.rate * 100 ) / 100;

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
        let props = this.btnPanelProps();
        return (
            <div className = { `${ this.classCSS }_button_section rows` }
                 key="button_section">
                <div className="cols col_3"
                     key="btn_filter">
                    <ButtonFilter { ...props.btnFilter } />
                </div>
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
        accountFilters:                 state.data.accountFilters,
        operationsData:                 state.data.operationsData,
        currencyListData:               state.data.currencyListData,

        currencyData:                   state.currency.currencyData,

        matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( PageAccounts );