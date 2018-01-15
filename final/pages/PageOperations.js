'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Table from '../components/Table/Table';
import ButtonAdd from '../components/buttons/ButtonAdd/ButtonAdd';
import ButtonDelete from '../components/buttons/ButtonDelete/ButtonDelete';
import OperationCard from '../components/OperationCard/OperationCard';

import { isExists, isNotEmpty, findArrayItem, findArrayItemIndex } from "../utils/utils";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_PAGE_OPERATIONS } from "../config/config";
import { CONFIG_UI_MODE_TIMEOUT, } from "../config/config";

import {acDataOperationSelect, acDataOperationsShouldBeReloaded} from "../actions/acData";
import { acUIShowOperationCard, acUIShowDataSavingMessage, acUIShowDataDeletingMessage, acUIShowDeleteConfirmation } from "../actions/acUI";

import './PageOperations.scss';
import {DISPLAY_TYPES} from "../data_const/data_const";

class PageOperations extends React.PureComponent {

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
        operationsData: PropTypes.arrayOf(
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

        operationCardIsVisible:         PropTypes.bool,
        operationSaveStatus:            PropTypes.number,
        operationDeleteStatus:          PropTypes.number,
        operationsLoadStatus:           PropTypes.number,

        // matGlassIsVisible:              PropTypes.bool,
    };

    static defaultProps = {

    };

    debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_PAGE_OPERATIONS;
    classCSS = 'PageOperations';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        const { dispatch, operationSaveStatus, operationDeleteStatus, operationsLoadStatus, matGlassIsVisible } = props;
        ( this.debug_mode ) &&
            console.log( 'PageOperations: prepareData: new props: ', props );
        if ( operationSaveStatus == 1 ) {
            dispatch( acUIShowDataSavingMessage() );
        }
        else if ( operationSaveStatus > 1 ) {
            setTimeout( () => {
                dispatch( acDataOperationsShouldBeReloaded() );
            }, CONFIG_UI_MODE_TIMEOUT );
        }

        if ( operationDeleteStatus == 1 ) {
            dispatch( acUIShowDataDeletingMessage() );
        }
        else if ( operationDeleteStatus > 1 ) {
            setTimeout( () => {
                dispatch( acDataOperationsShouldBeReloaded() );
            }, CONFIG_UI_MODE_TIMEOUT );
        }
    };

    preparePropsTable = () => {
        const { operationsData, accountsData, operationCategoriesData, operationSelectedIndex } = this.props;
        // let headers = null;
        let headers = [
            {
                id:         'id',
                text:       'id',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
                isSearchable: true,
                options: {
                    colWidth: '7%',
                }
            },
            {
                id:         'accountId',
                text:       'Счет',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.DESCENDED,
                isSearchable: true,
                options: {
                    colWidth: '15%',
                }
            },
            {
                id:         'categoryId',
                text:       'Категория',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
                isSearchable: true,
                options: {
                    colWidth: '15%',
                }
            },
            {
                id:         'type',
                text:       'Тип',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
                isSearchable: true,
                options: {
                    colWidth: '10%',
                }
            },
            {
                id:         'sum',
                text:       'Сумма',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
                isSearchable: true,
                options: {
                    colWidth: '15%',
                }
            },
            {
                id:         'date',
                text:       'Дата',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
                options: {
                    colWidth: '15%',
                }
            },
            {
                id:         'comment',
                text:       'Комментарий',
                isSortable: false,
                isSorted:   Table.SORT_TYPES.NONE,
                isSearchable: true,
                options: {
                    colWidth: 0,
                }
            },
        ];
        let rows = operationsData.map( ( item, index ) => {
            let cells = [
                {
                    id:    'id',
                    value: item.id,
                    text:  item.id + '',
                },
                {
                    id:    'accountId',
                    value: item.accountId,
                    text:  findArrayItem( accountsData, { id: item.accountId } ).name,
                },
                {
                    id:    'categoryId',
                    value: item.categoryId,
                    text:  findArrayItem( operationCategoriesData, { id: item.categoryId } ).name,
                },
                {
                    id:    'type',
                    value: item.type,
                    text:  ( item.type.toLowerCase() === 'credit') ? 'расход' : 'приход',
                },
                {
                    id:    'sum',
                    value: item.sum,
                    text:  item.sum + '',
                },
                {
                    id:    'date',
                    value: item.date,
                    text:  new Date( item.date ).toDateString(),
                },
                {
                    id:    'comment',
                    value: item.comment,
                    text:  item.comment,
                },
            ];
            // console.log( 'PageOperations: preparePropsTable: operationSelectedIndex: ', operationSelectedIndex, ': item`s index: ', index );
            return {
                isSelected: ( index === operationSelectedIndex ),
                rowIndex:   index + '',
                cells:      cells,
            }
        } );

        return {
            headers: headers,
            rows: rows,
            options: {
                tableWidth: '100%',
            },
            cbChanged:  this.operationsTable_cbChanged,
            cbSelected: this.operationTable_cbSelected,
        }
    };

    preparePropsButtonPanel = () => {
        const { operationSelectedIndex } = this.props;
        let display = {
            btnAdd: DISPLAY_TYPES.block,
            btnDelete: ( operationSelectedIndex > -1 )
                ? DISPLAY_TYPES.block
                : DISPLAY_TYPES.none,
        };

        return {
            btnAdd: {
                label: 'Добавить',
                display: display.btnAdd,
                cbChanged: this.buttonPanel_btnAdd_cbChanged,
            },
            btnDelete: {
                label: 'Удалить',
                display: display.btnDelete,
                cbChanged: this.buttonPanel_btnDelete_cbChanged,
            },
        }
    };

    /* == callbacks == */

    operationsTable_cbChanged = ( operationId ) => {
        const { dispatch, operationsData } = this.props;
        let newOperationSelectedIndex = findArrayItemIndex( operationsData, { id: operationId } );
        // console.log( 'PageOperations: operationsTable_cbChanged: newOperationSelectedIndex: ', newOperationSelectedIndex );
        dispatch( acDataOperationSelect( newOperationSelectedIndex ) );
    };

    operationTable_cbSelected = () => {
        const { dispatch } = this.props;
        dispatch( acUIShowOperationCard( false ) );
    };

    buttonPanel_btnAdd_cbChanged = () => {
        // console.log( 'PageOperations: buttonPanel_btnAdd_cbChanged: click...' );
        const { dispatch } = this.props;
        dispatch( acUIShowOperationCard( true ) );
    };

    buttonPanel_btnDelete_cbChanged = () => {
        // console.log( 'PageOperations: buttonPanel_btnDelete_cbChanged: click...' );
        const { dispatch, operationSelectedIndex } = this.props;
        ( operationSelectedIndex > -1 ) &&
            dispatch( acUIShowDeleteConfirmation() )
    };

    /* == renders == */

    renderFilters = () => {
        return (
            <div className = { this.classCSS + '_filters_section' }>
                <div className="rows">
                    <div className="cols col_16">
                        FILTERS
                    </div>
                </div>
            </div>
        )
    };

    renderMainSection = () => {
        const table = this.preparePropsTable();
        return(
            <div className = { this.classCSS + '_main_section' }>
                <div className="rows">
                    <div className="cols col_16">
                        <Table { ...table } />
                    </div>
                </div>
            </div>
        )
    };

    renderButtonSection = () => {
        return (
            <div className = { this.classCSS + '_button_section' }>
                <div className="rows button_panel">
                    <div className="cols col_2">
                        <ButtonAdd { ...this.preparePropsButtonPanel().btnAdd }/>
                    </div>
                    <div className="cols col_2">
                        <ButtonDelete { ...this.preparePropsButtonPanel().btnDelete }/>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        return (
            <div className = { this.classCSS }>
                <div className="wrapper">
                    { this.renderFilters() }
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
        operationCategoriesData:        state.data.operationCategoriesData,
        operationsData:                 state.data.operationsData,

        operationSelectedIndex:         state.data.operationSelectedIndex,
        operationSaveStatus:            state.data.operationSaveStatus,
        operationDeleteStatus:          state.data.operationDeleteStatus,
        operationsLoadStatus:           state.data.operationsLoadStatus,

        // matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( PageOperations );
