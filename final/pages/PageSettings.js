'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonLabel from '../components/buttons/ButtonLabel/ButtonLabel';
import SmartGrid from '../components/SmartGrid/SmartGrid';

import { USER_LOGIN, CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_SETTINGS } from "../config/config";
import {ALIGN_TYPES, DATA_TYPES, SETTINGS_MODES, SORTING} from "../data_const/data_const";

import { acUISetSettingsMode } from "../actions/acUI";

import './PageSettings.scss';

class PageSettings extends React.PureComponent {

    static propTypes = {

        settingsMode:                   PropTypes.oneOf([
            SETTINGS_MODES.ACCOUNTS,
            SETTINGS_MODES.OPERATION_CATEGORIES,
        ]),

        accountsData:                   PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
                amount:                 PropTypes.number,
            })
        ),

        accountSaveStatus:              PropTypes.number,
        accountDeleteStatus:            PropTypes.number,
        accountsLoadStatus:             PropTypes.number,

        accountValue:                   PropTypes.shape({
            id:                         PropTypes.number,
            name:                       PropTypes.string,
            amount:                     PropTypes.number,
        }),

        accountSelectedIndex:           PropTypes.number,

        operationCategoriesData:        PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.number,
                name:                   PropTypes.string,
            })
        ),

        operationCategoryValue:         PropTypes.shape({
            id:                         PropTypes.number,
            name:                       PropTypes.string,
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
            console.log( 'Page settings: prepareData: props: ', props );

    };

    /* == prepare props == */

    leftPanelProps = () => {
        const { settingsMode } = this.props;
        const { LEFT, RIGHT, CENTER } = ALIGN_TYPES;
        const { ACCOUNTS, OPERATION_CATEGORIES } = SETTINGS_MODES;

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
        }
    };

    tableProps = () => {
        ( this.debug_mode ) && console.log( 'PageSettings: tableProps: props: ', this.props );
        const { settingsMode, accountsData, operationCategoriesData } = this.props;
        const { ACCOUNTS, OPERATION_CATEGORIES } = SETTINGS_MODES;
        const { NUMBER, STRING, DATE, DATE_TIME, DATE_MS_INT } = DATA_TYPES;
        const { NONE, ASCENDED, DESCENDED } = SORTING;
        const { LEFT, CENTER, RIGHT } = ALIGN_TYPES;
        let headers = [];
        let body = [];
        switch ( settingsMode ) {
            case ACCOUNTS:
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
                        width:        '40%',
                    },
                    {
                        id:           'amount',
                        title:        'Сумма',
                        dataType:     NUMBER,
                        align:        RIGHT,
                        isSortable:   true,
                        sorting:      NONE,
                        isSearchable: true,
                        isVisible:    true,
                        width:        'auto',
                    },
                ];
                body = accountsData.map( ( row, index ) => {
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
                                id: 'amount',
                                value: row.amount
                            }
                        ]
                    }
                } );
                break;

            case OPERATION_CATEGORIES:
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
                        ]
                    }
                } );
                break;

            default:
                ( this.debug_mode ) &&
                    console.log( '%c%s','color: orange;','Warning: Page settings: tableProps: unknown settingsMode: ', settingsMode );
        }
        return {
            userLogin:  USER_LOGIN,
            tableName:  settingsMode,
            primaryId:  'id',
            headers:    headers,
            body:       body,
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

    /* == render functions == */

    renderLeftSection = () => {
        const { settingsMode } = this.props;
        let props = this.leftPanelProps();
        return (
            <div className = { this.classCSS + '_left_section' }>
                <div className = { 'rows ' + 'btn_accounts' }
                     key="btn_accounts">
                    <div className="cols col_16"
                         style = {{
                             fontWeight: ( settingsMode === SETTINGS_MODES.ACCOUNTS )
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
                             fontWeight: ( settingsMode === SETTINGS_MODES.OPERATION_CATEGORIES )
                                 ? 'bold'
                                 : 'normal'
                         }}>
                        <ButtonLabel { ...props.btnOperationCategories }/>
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
                    BUTTONS
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

        accountSaveStatus:              state.data.accountSaveStatus,
        accountDeleteStatus:            state.data.accountDeleteStatus,
        accountsLoadStatus:             state.data.accountsLoadStatus,
        operationCategorySaveStatus:    state.data.operationCategorySaveStatus,
        operationCategoryDeleteStatus:  state.data.operationCategoryDeleteStatus,
        operationCategoriesLoadStatus:  state.data.operationCategoriesLoadStatus,
    }
};

export default connect( mapStateToProps )( PageSettings );
