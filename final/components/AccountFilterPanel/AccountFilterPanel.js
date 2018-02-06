'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DateInput from '../DateInput/DateInput';
import MovingList from '../MovingList/MovingList';
import ButtonOk from '../buttons/ButtonOk/ButtonOk';
import ButtonCancel from '../buttons/ButtonCancel/ButtonCancel';

import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_ACCOUNT_FILTER_PANEL, CONFIG_UI_MODE_TIMEOUT, USER_LOGIN } from '../../config/config';
import {DATA_TYPES, MODAL_CONTENT} from '../../data_const/data_const';

import { acDataAccountSetFilters } from '../../actions/acData';
import {acUIHideMatGlass} from '../../actions/acUI';

import '../../utils/utils';

import './AccountFilterPanel.scss';
import {isExists, isNotEmpty} from '../../utils/utils';

class AccountFilterPanel extends React.PureComponent {

    static propTypes = {
        accountsData:                   PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
                currency:               PropTypes.number,
            })
        ),
        operationCategoriesData:        PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
            })
        ),
        accountFilters:                 PropTypes.shape({
            dateStart:                  PropTypes.objectOf( Date ),
            dateEnd:                    PropTypes.objectOf( Date ),
            categories:                 PropTypes.arrayOf(
                PropTypes.number,
            ),
            accounts:                   PropTypes.arrayOf(
                PropTypes.number,
            ),
        }),

        modalContent:                   PropTypes.string,
    };

    static defaultProps = {

    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'AccountFilterPanel_' + AccountFilterPanel.classID;
    };

    constructor( props ) {
        super( props );
        AccountFilterPanel.classID++;
        this.state = {
            htmlID: AccountFilterPanel.getHtmlID( props.htmlID ),
        };
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_ACCOUNT_FILTER_PANEL;
        this.classCSS = 'AccountFilterPanel';
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'AccountFilterPanel: prepareData: new props: ', props )
        
        // todo
    };

    filterProps = () => {
        const { accountFilters, operationCategoriesData, accountsData } = this.props;
        const { dateStart, dateEnd, categories, accounts } = accountFilters;
        return {
            dateStart: {
                withLabel:      true,
                label:          'Начало периода',
                display:        DateInput.displayTypes.block,
                defValue:       ( isExists( dateStart ) ) ? dateStart : null,
                cbChanged:      this.dateStart_cbChanged,
            },
            dateEnd: {
                withLabel:      true,
                label:          'конец',
                display:        DateInput.displayTypes.block,
                defValue:       ( isExists( dateEnd ) ) ? dateEnd : null,
                cbChanged:      this.dateEnd_cbChanged,
            },
            categories: {
                withLabel: true,
                label: 'Категории операций',
                display: MovingList.DISPLAY_TYPES.BLOCK,
                isEdited: true,
                listValue: ( isNotEmpty( operationCategoriesData ) )
                    ? [ ...operationCategoriesData ]
                    : null,
                asValue: 'id',
                asText: 'name',
                defValue: ( isNotEmpty( categories ) )
                    ? categories.map( ( item ) => { return { id: item } } )
                    : null,
                options: {
                    listBoxWidth: 0,
                    listBoxHeight: 200,
                },
                cbChanged: this.categories_cbChanged,
            },
            accounts: {
                withLabel: true,
                label: 'Счета',
                display: MovingList.DISPLAY_TYPES.BLOCK,
                isEdited: true,
                listValue: ( isNotEmpty( accountsData ) )
                    ? [ ...accountsData ]
                    : null,
                asValue: 'id',
                asText: 'name',
                defValue: ( isNotEmpty( accounts ) )
                    ? accounts.map( ( item ) => { return { id: item } } )
                    : null,
                options: {
                    listBoxWidth: 0,
                    listBoxHeight: 200,
                },
                cbChanged: this.accounts_cbChanged,
            },
            btnOk: {
                label:          'Применить',
                withLabel:      true,
                cbChanged:      this.btnOk_cbChanged,
            },
            btnCancel: {
                label:          'Сбросить',
                withLabel:      true,
                cbChanged:      this.btnCancel_cbChanged,
            },
        }
    };

    /* == callbacks == */

    dateStart_cbChanged = ( value ) => {
        const { dispatch, accountFilters } = this.props;
        let { dateEnd } = accountFilters;
        let dateStart = ( value instanceof Date )
            ? value
            : null;
        if ( !isExists( dateEnd ) ) {
            dateEnd = dateStart;
        } else {
            dateEnd = ( dateStart.getTime() < dateEnd.getTime() )
                ? dateEnd
                : dateStart;
        }
        dispatch( acDataAccountSetFilters( {
            ...accountFilters,
            dateStart,
            dateEnd,
        } ) );
    };

    dateEnd_cbChanged = ( value ) => {
        const { dispatch, accountFilters } = this.props;
        let { dateStart } = accountFilters;
        let dateEnd = ( value instanceof Date )
            ? value
            : null;
        if ( !isExists( dateStart ) ) {
            dateStart = dateEnd;
        } else {
            dateStart = ( dateEnd.getTime() > dateStart.getTime() )
                ? dateStart
                : dateEnd;
        }
        dispatch( acDataAccountSetFilters( {
            ...accountFilters,
            dateStart,
            dateEnd,
        } ) );
    };

    categories_cbChanged = ( value ) => {
        const { dispatch, accountFilters } = this.props;
        let categories = ( isNotEmpty( value ) )
            ? value.map( ( item ) => { return item.id } )
            : null;
        dispatch( acDataAccountSetFilters( {
            ...accountFilters,
            categories
        } ) )
    };

    accounts_cbChanged = ( value ) => {
        const { dispatch, accountFilters } = this.props;
        let accounts = ( isNotEmpty( value ) )
            ? value.map( ( item ) => { return item.id } )
            : null;
        dispatch( acDataAccountSetFilters( {
            ...accountFilters,
            accounts
        } ) )
    };

    btnOk_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acUIHideMatGlass() );
    };

    btnCancel_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acDataAccountSetFilters( {
            dateStart:  null,
            dateEnd:    null,
            categories: null,
            accounts:   null,
        } ) );
        dispatch( acUIHideMatGlass() );
    };

    /* == controller == */

    formClick = (e ) => {
        e.stopPropagation();
        e.preventDefault();
    };

    /* == render functions == */

    render() {
        const { modalContent } = this.props;
        const { ACCOUNT_FILTERS } = MODAL_CONTENT;
        let props = this.filterProps();
        return ( modalContent === ACCOUNT_FILTERS ) &&
            <div className = { this.classCSS }
                 onClick={ this.formClick }>
                <div className = { `${ this.classCSS }_form` }>
                    <div className="rows"
                         key="header">
                        <div className="cols col_16 header">
                            <span className = { this.classCSS + '_header' }>
                                Панель фильтров
                            </span>
                        </div>
                    </div>
                    <div className="rows filter_period"
                         key="filter_period">
                        <div className="cols col_4"
                             key="period_start">
                            <DateInput { ...props.dateStart } />
                        </div>
                        <div className="cols col_4"
                             key="period_end">
                            <DateInput { ...props.dateEnd } />
                        </div>
                    </div>
                    <div className='rows categories'
                         key="categories_accounts">
                        <div className="cols col_8"
                             key="categories">
                            <MovingList { ...props.categories } />
                        </div>
                        <div className="cols col_8"
                             key="accounts">
                            <MovingList { ...props.accounts } />
                        </div>
                    </div>
                    <div className = { `${ this.classCSS }_buttons_panel rows` }
                         key="button_panel">
                        <div className="cols col_2"
                             key="button_ok">
                            <ButtonOk { ...props.btnOk } />
                        </div>
                        <div className="cols col_2"
                             key="button_cancel">
                            <ButtonCancel { ...props.btnCancel } />
                        </div>
                    </div>
                </div>
            </div>
    }
}

const mapStateToProps = function ( state ) {
    return {
        accountsData:                   state.data.accountsData,
        operationCategoriesData:        state.data.operationCategoriesData,
        accountFilters:                 state.data.accountFilters,

        modalContent:                   state.ui.modalContent,
    }
};

export default connect( mapStateToProps )( AccountFilterPanel );