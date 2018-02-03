'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonLabel from '../../components/buttons/ButtonLabel/ButtonLabel';
import ButtonAdd from '../../components/buttons/ButtonAdd/ButtonAdd';
import ButtonDelete from '../../components/buttons/ButtonDelete/ButtonDelete';
import SmartGrid from '../../components/SmartGrid/SmartGrid';

import { USER_LOGIN, CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_SETTINGS, CONFIG_UI_MODE_TIMEOUT } from "../../config/config";
import { ALIGN_TYPES, DATA_TYPES, DELETE_MODES, DISPLAY_TYPES, SETTINGS_MODES, SORTING } from "../../data_const/data_const";

import {
    acUISetSettingsMode,
    acUIShowDataSavingMessage,
    acUIShowAccountCard,
    acUIShowOperationCategoryCard,
    acUIShowCurrencyListCard,
    acUIShowDeleteConfirmation,
    acUIShowDataDeletingMessage
} from "../../actions/acUI";

import {
    acDataAccountSelect,
    acDataOperationCategorySelect,
    acDataAccountsShouldBeReloaded,
    acDataOperationCategoriesShouldBeReloaded,
    acDataCurrencyListSelect,
    acDataCurrencyListShouldBeReloaded
} from '../../actions/acData';

import {findArrayItemIndex, isNotEmpty} from "../../utils/utils";

import './PageSettings.scss';

class PageSettings extends React.PureComponent {

    static propTypes = {

        settingsMode:                       PropTypes.oneOf([
            SETTINGS_MODES.ACCOUNTS,
            SETTINGS_MODES.OPERATION_CATEGORIES,
            SETTINGS_MODES.CURRENCY_LIST,
        ]),

        accountsData:                   PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
                currency:               PropTypes.number,
            })
        ),

        accountSaveStatus:              PropTypes.number,
        accountDeleteStatus:            PropTypes.number,
        accountsLoadStatus:             PropTypes.number,

        accountValue:                   PropTypes.shape({
            id:                         PropTypes.number,
            name:                       PropTypes.string,
            comment:                    PropTypes.string,
            currency:                   PropTypes.number,
        }),

        accountSelectedIndex:           PropTypes.number,

        operationCategoriesData:        PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                comment:                PropTypes.string,
            })
        ),

        operationCategoryValue:         PropTypes.shape({
            id:                         PropTypes.number,
            name:                       PropTypes.string,
            comment:                    PropTypes.string,
        }),

        operationCategorySelectedIndex: PropTypes.number,

        operationCategorySaveStatus:    PropTypes.number,
        operationCategoryDeleteStatus:  PropTypes.number,
        operationCategoriesLoadStatus:  PropTypes.number,
    };

    static defaultProps = {

    };

    constructor( props ) {
        super( props );

        this.classCSS = 'PageSettings';
        this.debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_PAGE_SETTINGS;
    }

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'PageSettings: prepareData: props: ', props );

        const {
            dispatch,
            accountSaveStatus,
            accountDeleteStatus,
            operationCategorySaveStatus,
            operationCategoryDeleteStatus,
            currencyListSaveStatus,
            currencyListDeleteStatus,
            settingsMode
        } = this.props;

        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;

        if ( settingsMode === ACCOUNTS ) {
            if ( accountSaveStatus === 1 ) {
                dispatch( acUIShowDataSavingMessage() );
            }
            else if ( accountSaveStatus > 1 ) {
                setTimeout( () => {
                    dispatch( acDataAccountsShouldBeReloaded() );
                }, CONFIG_UI_MODE_TIMEOUT );
            }
            if ( accountDeleteStatus === 1 ) {
                dispatch( acUIShowDataDeletingMessage() );
            }
            else if ( accountDeleteStatus > 1 ) {
                setTimeout( () => {
                    dispatch( acDataAccountsShouldBeReloaded() );
                }, CONFIG_UI_MODE_TIMEOUT );
            }
        }
        else if ( settingsMode === OPERATION_CATEGORIES ) {
            if ( operationCategorySaveStatus === 1 ) {
                dispatch( acUIShowDataSavingMessage() );
            }
            else if ( operationCategorySaveStatus > 1 ) {
                setTimeout( () => {
                    dispatch( acDataOperationCategoriesShouldBeReloaded() );
                }, CONFIG_UI_MODE_TIMEOUT );
            }
            if ( operationCategoryDeleteStatus === 1 ) {
                dispatch( acUIShowDataDeletingMessage() );
            }
            else if ( operationCategoryDeleteStatus > 1 ) {
                setTimeout( () => {
                    dispatch( acDataOperationCategoriesShouldBeReloaded() );
                }, CONFIG_UI_MODE_TIMEOUT );
            }
        }
        else if ( settingsMode === CURRENCY_LIST ) {
            if ( currencyListSaveStatus === 1 ) {
                dispatch( acUIShowDataSavingMessage() );
            }
            else if ( currencyListSaveStatus > 1 ) {
                setTimeout( () => {
                    dispatch( acDataCurrencyListShouldBeReloaded() );
                }, CONFIG_UI_MODE_TIMEOUT );
            }
            if ( currencyListDeleteStatus === 1 ) {
                dispatch( acUIShowDataDeletingMessage() );
            }
            else if ( currencyListDeleteStatus > 1 ) {
                setTimeout( () => {
                    dispatch( acDataCurrencyListShouldBeReloaded() );
                }, CONFIG_UI_MODE_TIMEOUT );
            }
        }
    };

    /* == prepare props == */

    leftPanelProps = () => {
        const { settingsMode } = this.props;
        const { LEFT } = ALIGN_TYPES;
        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;

        return {
            btnAccounts: {
                label: 'Счета',
                isActive: ( settingsMode === ACCOUNTS ),
                options: {
                    labelAlign: LEFT,
                },
                cbChanged: this.btnAccounts_cbChanged,
            },
            btnOperationCategories: {
                label: 'Категории',
                isActive: ( settingsMode === OPERATION_CATEGORIES ),
                options: {
                    labelAlign: LEFT,
                },
                cbChanged: this.btnOperationCategories_cbChanged,
            },
            btnCurrencyList: {
                label: 'Валюты',
                isActive: ( settingsMode === CURRENCY_LIST ),
                options: {
                    labelAlign: LEFT,
                },
                cbChanged: this.btnCurrencyList_cbChanged,
            },
        }
    };

    tableProps = () => {
        ( this.debug_mode ) &&
            console.log( 'PageSettings: tableProps: props: ', this.props );

        const {
            settingsMode,
            accountsData,
            operationCategoriesData,
            accountSelectedIndex,
            operationCategorySelectedIndex,
            currencyListData,
            currencyListSelectedIndex,
        } = this.props;
        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;
        const { NUMBER, STRING, DATE, DATE_TIME, DATE_MS_INT } = DATA_TYPES;
        const { NONE, ASCENDED, DESCENDED } = SORTING;
        const { LEFT, CENTER, RIGHT } = ALIGN_TYPES;
        let caption = '';
        let headers = [];
        let body = [];
        let defValue = null;
        switch ( settingsMode ) {
            case ACCOUNTS:
                caption = 'Счета';
                defValue = ( accountSelectedIndex > -1 )
                               ? accountsData[ accountSelectedIndex ].id
                               : -1;
                headers = [
                    {
                        id:           'id',
                        title:        'ID',
                        dataType:     NUMBER,
                        align:        RIGHT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '15%',
                    },
                    {
                        id:           'name',
                        title:        'Наименование',
                        dataType:     STRING,
                        align:        LEFT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '30%',
                    },
                    {
                        id:           'currency',
                        title:        'Валюта',
                        dataType:     STRING,
                        align:        LEFT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '15%',
                    },
                    {
                        id:           'comment',
                        title:        'Комментарий',
                        dataType:     STRING,
                        align:        LEFT,
                        isSortable:   false,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        'auto',
                    },
                ];
                body = accountsData.map( ( row, index ) => {
                    let currencyValue = '';
                    if ( isNotEmpty( currencyListData ) ) {
                        let curIndex = findArrayItemIndex( currencyListData, { id: row.currency } );
                        if ( curIndex > -1 ) {
                            const { name, abbreviation } = currencyListData[ curIndex ];
                            currencyValue = `${name} (${abbreviation})`;
                        }
                        // console.log( `TEST: account name: ${row.name}, currency: ${row.currency}, currencyValue: ${currencyValue}`);
                    }
                    return {
                        rowIndex: index,
                        cells: [
                            {
                                id: 'id',
                                value: row.id,
                            },
                            {
                                id: 'name',
                                value: row.name,
                            },
                            {
                                id: 'currency',
                                value: currencyValue,
                            },
                            {
                                id: 'comment',
                                value: row.comment,
                            },
                        ]
                    }
                } );
                break;

            case OPERATION_CATEGORIES:
                caption = 'Категории операций';
                defValue = ( operationCategorySelectedIndex > -1 )
                               ? operationCategoriesData[ operationCategorySelectedIndex ].id
                               : -1;
                headers = [
                    {
                        id:           'id',
                        title:        'ID',
                        dataType:     NUMBER,
                        align:        RIGHT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '15%',
                    },
                    {
                        id:           'name',
                        title:        'Наименование',
                        dataType:     STRING,
                        align:        LEFT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '30%',
                    },
                    {
                        id:           'comment',
                        title:        'Комментарий',
                        dataType:     STRING,
                        align:        LEFT,
                        isSortable:   false,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        'auto',
                    },
                ];
                body = operationCategoriesData.map( ( row, index ) => {
                    return {
                        rowIndex: index,
                        cells: [
                            {
                                id: 'id',
                                value: row.id,
                            },
                            {
                                id: 'name',
                                value: row.name,
                            },
                            {
                                id: 'comment',
                                value: row.comment,
                            },
                        ]
                    }
                } );
                break;

            case CURRENCY_LIST:
                caption = 'Валюта для счета';
                defValue = ( currencyListSelectedIndex > -1 )
                    ? currencyListData[ currencyListSelectedIndex ].id
                    : -1;
                headers = [
                    {
                        id:           'id',
                        title:        'ID',
                        dataType:     NUMBER,
                        align:        RIGHT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '5%',
                    },
                    {
                        id:           'name',
                        title:        'Наименование',
                        dataType:     STRING,
                        align:        LEFT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '20%',
                    },
                    {
                        id:           'code',
                        title:        'Код',
                        dataType:     STRING,
                        align:        CENTER,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '10%',
                    },
                    {
                        id:           'abbreviation',
                        title:        'Абревиатура',
                        dataType:     STRING,
                        align:        CENTER,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '10%',
                    },
                    {
                        id:           'scale',
                        title:        'Соотношение',
                        dataType:     NUMBER,
                        align:        RIGHT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '10%',
                    },
                    {
                        id:           'rate',
                        title:        'Курс к BYN',
                        dataType:     NUMBER,
                        align:        RIGHT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        '15%',
                    },
                    {
                        id:           'updated',
                        title:        'Обновление',
                        dataType:     DATE_MS_INT,
                        align:        RIGHT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        'auto',
                    },
                ];
                body = ( isNotEmpty( currencyListData ) )
                ? currencyListData.map( ( row, index ) => {
                    return {
                        rowIndex: index,
                        cells: [
                            {
                                id: 'id',
                                value: row.id,
                            },
                            {
                                id: 'name',
                                value: row.name,
                            },
                            {
                                id: 'code',
                                value: row.code,
                            },
                            {
                                id: 'abbreviation',
                                value: row.abbreviation,
                            },
                            {
                                id: 'scale',
                                value: row.scale,
                            },
                            {
                                id: 'rate',
                                value: row.rate,
                            },
                            {
                                id: 'updated',
                                value: row.updated,
                            },
                        ]
                    }
                } )
                : [];
                break;

            default:
                ( this.debug_mode ) &&
                    console.log( '%c%s','color: orange;','Warning: Page settings: tableProps: unknown settingsMode: ', settingsMode );
        }
        return {
            userLogin:      USER_LOGIN,
            tableName:      settingsMode,

            withCaption:        true,
            withFilter:         true,
            withFooter:         true,
            withButtonExport:   true,

            caption:        caption,
            rowsPerPage:    10,
            defValue:       defValue,

            primaryId:      'id',
            headers:        headers,
            body:           body,

            cbChanged:      this.table_cbChanged,
            cbSelected:     this.table_cbSelected,
        }
    };

    buttonPanelProps = () => {
        const { block, inlineBlock, hidden, none } = DISPLAY_TYPES;
        const { settingsMode, accountSelectedIndex, operationCategorySelectedIndex, currencyListSelectedIndex } = this.props;
        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;
        let display = {
            btnAdd: block,
            btnDelete: ( settingsMode === ACCOUNTS && accountSelectedIndex > -1 )
                ? block
                : ( settingsMode === OPERATION_CATEGORIES && operationCategorySelectedIndex > -1 )
                    ? block
                    : ( settingsMode === CURRENCY_LIST && currencyListSelectedIndex > -1 )
                        ? block
                        : none,
        };
        return {
            btnAdd: {
                label:      'Добавить',
                display:    display.btnAdd,
                cbChanged:  this.buttonPanel_btnAdd_cbChanged,
            },
            btnDelete: {
                label:      'Удалить',
                display:    display.btnDelete,
                cbChanged:  this.buttonPanel_btnDelete_cbChanged,
            },
        }
    };

    /* == callbacks == */

    btnAccounts_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acUISetSettingsMode( SETTINGS_MODES.ACCOUNTS ) );
    };

    btnOperationCategories_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acUISetSettingsMode( SETTINGS_MODES.OPERATION_CATEGORIES ) );
    };

    btnCurrencyList_cbChanged = () => {
        const { dispatch } = this.props;
        dispatch( acUISetSettingsMode( SETTINGS_MODES.CURRENCY_LIST ) );
    };

    table_cbChanged = ( newId ) => {
        const { settingsMode } = this.props;
        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;

        switch ( settingsMode ) {
            case ACCOUNTS:
                this.accountsChanged( newId );
                break;

            case OPERATION_CATEGORIES:
                this.operationCategoriesChanged( newId );
                break;

            case CURRENCY_LIST:
                // this.currencyListChanged( newId );
                break;

            default:
        }
    };

    table_cbSelected = ( newSelectedIndex ) => {
        const { settingsMode } = this.props;
        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;

        switch ( settingsMode ) {
            case ACCOUNTS:
                this.accountSelected( newSelectedIndex );
                break;

            case OPERATION_CATEGORIES:
                this.operationCategoriesSelected( newSelectedIndex );
                break;

            case CURRENCY_LIST:
                this.currencyListSelected( newSelectedIndex );
                break;

            default:
        }
    };

    buttonPanel_btnAdd_cbChanged = () => {
        const { settingsMode } = this.props;
        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;
        switch( settingsMode ) {
            case ACCOUNTS:
                this.accountAdd();
                break;
            case OPERATION_CATEGORIES:
                this.operationCategoryAdd();
                break;
            case CURRENCY_LIST:
                this.currencyListAdd();
                break;
        }
    };

    buttonPanel_btnDelete_cbChanged = () => {
        const { settingsMode } = this.props;
        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;
        switch( settingsMode ) {
            case ACCOUNTS:
                this.accountDelete();
                break;
            case OPERATION_CATEGORIES:
                this.operationCategoryDelete();
                break;
            case CURRENCY_LIST:
                this.currencyListDelete();
                break;
        }
    };

    /* action functions */

    accountsChanged = ( newAccountId ) => {
        // console.log( 'PageSettings: accountsChanged: ', newAccountId );
        const { dispatch, accountsData } = this.props;
        let newAccountSelectedIndex = findArrayItemIndex( accountsData, { id: newAccountId } );
        // console.log( 'PageOperations: accountsChanged: newAccountSelectedIndex: ', newAccountSelectedIndex );
        dispatch( acDataAccountSelect( newAccountSelectedIndex ) );
        dispatch( acUIShowAccountCard( false ) );
    };

    operationCategoriesChanged = ( newOperationCategoryId ) => {
        // console.log( 'PageSettings: accountsChanged: ', newOperationCategoryId );
        const { dispatch, operationCategoriesData } = this.props;
        let newOperationCategorySelectedIndex = findArrayItemIndex( operationCategoriesData, { id: newOperationCategoryId } );
        // console.log( 'PageOperations: accountsChanged: newAccountSelectedIndex: ', newAccountSelectedIndex );
        dispatch( acDataOperationCategorySelect( newOperationCategorySelectedIndex ) );
        dispatch( acUIShowOperationCategoryCard( false ) );
    };

    currencyListChanged = ( newCurrencyListId ) => {
        // console.log( 'PageSettings: currencyListChanged: ', newCurrencyListId );
        const { dispatch, currencyListData } = this.props;
        let newCurrencyListSelectedIndex = findArrayItemIndex( currencyListData, { id: newCurrencyListId } );
        // console.log( 'PageSettings: currencyListChanged: newCurrencyListSelectedIndex: ', newCurrencyListSelectedIndex );
        dispatch( acDataCurrencyListSelect( newCurrencyListSelectedIndex ) );
        // dispatch( acUIShowCurrencyListCard( false ) );
    };

    accountSelected = ( newAccountSelectedIndex ) => {
        // console.log( 'PageSettings: accountSelected: ', newAccountSelectedIndex );
        const { dispatch } = this.props;
        dispatch( acDataAccountSelect( newAccountSelectedIndex ) );
    };

    operationCategoriesSelected = ( newOperationCategorySelectedIndex ) => {
        // console.log( 'PageSettings: operationCategoriesSelected: ', newOperationCategorySelectedIndex );
        const { dispatch } = this.props;
        dispatch( acDataOperationCategorySelect( newOperationCategorySelectedIndex) );
    };

    currencyListSelected = ( newCurrencyListSelectedIndex ) => {
        // console.log( 'PageSettings: currencyListSelected: ', newCurrencyListSelectedIndex );
        const { dispatch } = this.props;
            dispatch( acDataCurrencyListSelect( newCurrencyListSelectedIndex) );
    };

    accountAdd = () => {
        const { dispatch } = this.props;
        dispatch( acUIShowAccountCard( true ) );
    };

    operationCategoryAdd = () => {
        const { dispatch } = this.props;
        dispatch( acUIShowOperationCategoryCard( true ) );
    };

    currencyListAdd = () => {
        const { dispatch } = this.props;
        dispatch( acUIShowCurrencyListCard( true ) );
    };

    accountDelete = () => {
        const { dispatch } = this.props;
        const { ACCOUNTS } = DELETE_MODES;
        dispatch( acUIShowDeleteConfirmation( ACCOUNTS ) )
    };

    operationCategoryDelete = () => {
        const { dispatch } = this.props;
        const { OPERATION_CATEGORIES } = DELETE_MODES;
        dispatch( acUIShowDeleteConfirmation( OPERATION_CATEGORIES ) )
    };

    currencyListDelete = () => {
        const { dispatch } = this.props;
        const { CURRENCY_LIST } = DELETE_MODES;
        dispatch( acUIShowDeleteConfirmation( CURRENCY_LIST ) )
    };

    /* == render functions == */

    renderLeftSection = () => {
        const { settingsMode } = this.props;
        const { ACCOUNTS, OPERATION_CATEGORIES, CURRENCY_LIST } = SETTINGS_MODES;
        let props = this.leftPanelProps();
        return (
            <div className = { this.classCSS + '_left_section' }>
                <div className = { 'rows ' + 'btn_accounts' }
                     key="btn_accounts">
                    <div className="cols col_16"
                         style = {{
                             fontWeight: ( settingsMode === ACCOUNTS )
                             ? 'bold'
                             : 'normal'
                         }}>
                        <ButtonLabel { ...props.btnAccounts }/>
                    </div>
                </div>
                <div className = { 'rows ' + 'btn_operation_categories' }
                     key="btn_operationCategories">
                    <div className="cols col_16"
                         style = {{
                             fontWeight: ( settingsMode === OPERATION_CATEGORIES )
                                 ? 'bold'
                                 : 'normal'
                         }}>
                        <ButtonLabel { ...props.btnOperationCategories }/>
                    </div>
                </div>
                <div className = { 'rows ' + 'btn_currency_list' }
                     key="btn_currencyList">
                    <div className="cols col_16"
                         style = {{
                             fontWeight: ( settingsMode === CURRENCY_LIST )
                                 ? 'bold'
                                 : 'normal'
                         }}>
                        <ButtonLabel { ...props.btnCurrencyList }/>
                    </div>
                </div>
            </div>
        )
    };

    renderMainSection = () => {
        let props = this.tableProps();
        return (
            <div className = { this.classCSS + '_main_section' }>
                <div className = { this.classCSS + '_table' }>
                    <SmartGrid { ...props }/>
                </div>
                <div className = { this.classCSS + '_button_panel' }>
                    { this.renderButtonPanel() }
                </div>
            </div>
        )
    };

    renderButtonPanel = () => {
        let props = this.buttonPanelProps();
        return (
            <div className = { this.classCSS + '_button_panel' }>
                <div className="rows button_panel">
                    <div className="cols col_2 btn_add"
                         key="btn_add">
                        <ButtonAdd { ...props.btnAdd }/>
                    </div>
                    <div className="cols col_2 btn_delete"
                         key="btn_delete">
                        <ButtonDelete { ...props.btnDelete }/>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className = { this.classCSS }>
                <div className="wrapper">
                    { this.renderLeftSection() }
                    { this.renderMainSection() }
                </div>
            </div>
        )
    }
}

const mapStateToProps = function ( state ) {
    return {
        settingsMode:                   state.ui.settingsMode,

        accountsData:                   state.data.accountsData,
        accountValue:                   state.data.accountValue,
        accountSelectedIndex:           state.data.accountSelectedIndex,
        operationCategoriesData:        state.data.operationCategoriesData,
        operationCategoryValue:         state.data.operationCategoryValue,
        operationCategorySelectedIndex: state.data.operationCategorySelectedIndex,
        currencyListData:               state.data.currencyListData,
        currencyListValue:              state.data.currencyListValue,
        currencyListSelectedIndex:      state.data.currencyListSelectedIndex,

        accountSaveStatus:              state.data.accountSaveStatus,
        accountDeleteStatus:            state.data.accountDeleteStatus,
        accountsLoadStatus:             state.data.accountsLoadStatus,
        operationCategorySaveStatus:    state.data.operationCategorySaveStatus,
        operationCategoryDeleteStatus:  state.data.operationCategoryDeleteStatus,
        operationCategoriesLoadStatus:  state.data.operationCategoriesLoadStatus,
        currencyListSaveStatus:         state.data.currencyListSaveStatus,
        currencyListDeleteStatus:       state.data.currencyListDeleteStatus,
        currencyListLoadStatus:         state.data.currencyListLoadStatus,
    }
};

export default connect( mapStateToProps )( PageSettings );
