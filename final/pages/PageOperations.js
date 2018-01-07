'use strict';

import React from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table/Table';
import { isExists, isNotEmpty } from "../utils/utils";

class PageOperations extends React.PureComponent {

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
        let state = { headers: [], rows: [] };

        if ( isNotEmpty( operationsData ) ) {
            state.table = this.preparePropsTable();
        }

        this.setState( state, () => {
            ( this.debug_mode ) &&
                console.log( this.classCSS + ': prepareData: new state: ', this.state );
        } );
    };

    preparePropsTable = () => {
        const { operationsData } = this.props;
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
            let cells = headers.map( ( th, thIndex ) => {
                return {
                    cellId:   th.id,
                    cellText: item[ th.id ] + '',
                }
            } );
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
        operationsData:                 state.data.operationsData,
        //matGlassIsVisible:              state.ui.matGlassIsVisible,
    }
};

export default connect( mapStateToProps )( PageOperations );
