'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../components/Table/Table';
import ButtonAdd from '../components/buttons/ButtonAdd/ButtonAdd';
import { isExists, isNotEmpty, findArrayItem, findArrayItemIndex } from "../utils/utils";
import {acDataOperationSelect} from "../actions/acData";

import './PageOperations.scss';

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
    };

    static defaultProps = {

    };

    debug_mode = true;
    classCSS = 'PageOperations';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( 'PageOperations: prepareData: new props: ', props );
    };

    preparePropsTable = () => {
        const { operationsData, accountsData, operationCategoriesData, operationSelectedIndex } = this.props;
        let headers = [
            {
                id:         'id',
                text:       'id',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
                options: {
                    colWidth: '7%',
                }
            },
            {
                id:         'accountId',
                text:       'Счет',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
                options: {
                    colWidth: '15%',
                }
            },
            {
                id:         'categoryId',
                text:       'Категория',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
                options: {
                    colWidth: '15%',
                }
            },
            {
                id:         'type',
                text:       'Тип',
                isSortable: false,
                isSorted:   Table.SORT_TYPES.NONE,
                options: {
                    colWidth: '10%',
                }
            },
            {
                id:         'sum',
                text:       'Сумма',
                isSortable: true,
                isSorted:   Table.SORT_TYPES.NONE,
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
            cbChanged: this.operationsTable_cbChanged,
        }
    };

    /* == callbacks == */

    operationsTable_cbChanged = ( operationId ) => {
        const { dispatch, operationsData } = this.props;
        let newOperationSelectedIndex = findArrayItemIndex( operationsData, { id: operationId } );
        // console.log( 'PageOperations: operationsTable_cbChanged: newOperationSelectedIndex: ', newOperationSelectedIndex );
        dispatch( acDataOperationSelect( newOperationSelectedIndex ) );
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
                        <ButtonAdd label="Новая"/>
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
        //matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( PageOperations );
