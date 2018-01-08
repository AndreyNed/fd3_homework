'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from '../components/Table/Table';
import { isExists, isNotEmpty, findArrayItem, findArrayItemIndex } from "../utils/utils";

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
    classCSS = 'App_page_operations';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( this.classCSS + ': prepareData: new props: ', props );

        const { operationsData } = props;
        let state = {};

        if ( isNotEmpty( operationsData ) ) {
            state.table = this.preparePropsTable();
        }

        this.setState( state, () => {
            ( this.debug_mode ) &&
                console.log( this.classCSS + ': prepareData: new state: ', this.state );
        } );
    };

    preparePropsTable = () => {
        const { operationsData, accountsData, operationCategoriesData } = this.props;
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
                text:       'Тип (приход/расход)',
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
            return {
                isSelected: false,
                rowIndex:   index + '',
                cells:      cells,
            }
        } );

        return {
            headers: headers,
            rows: rows,
            options: {
                tableWidth: '80%',
            },
        }
    };

    render() {
        const { table } = this.state;
        // const op
        return (
            <div className = { this.classCSS }>
                <Table { ...table } />
            </div>
        )
    }
}

const mapStateToProps = function ( state ) {
    return {
        accountsData:                   state.data.accountsData,
        operationCategoriesData:        state.data.operationCategoriesData,
        operationsData:                 state.data.operationsData,

        //matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( PageOperations );
