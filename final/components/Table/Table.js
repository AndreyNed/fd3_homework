'use strict';

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import {findArrayItemIndex, isExists, isNotEmpty, isNotEmptyAll} from "../../utils/utils";
import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_TABLE } from "../../config/config";

import './Table.scss';

class Table extends React.PureComponent {

    static SORT_TYPES = {
        NONE:           'NONE',
        ASCENDED:       'ASCENDED',
        DESCENDED:      'DESCENDED',
    };

    static propTypes = {
        htmlID:                         PropTypes.string,
        uniqueKey:                      PropTypes.string, // fieldId with unique key
        headers:                        PropTypes.arrayOf(
            PropTypes.shape({
                id:                     PropTypes.string,
                text:                   PropTypes.string,
                isSortable:             PropTypes.bool,
                isSorted:               PropTypes.oneOf([
                    Table.SORT_TYPES.NONE,
                    Table.SORT_TYPES.ASCENDED,
                    Table.SORT_TYPES.DESCENDED,
                ]),
                isSearchable:           PropTypes.bool,
                options:                PropTypes.shape({
                    colWidth:           PropTypes.oneOfType([
                        PropTypes.number,
                        PropTypes.string
                    ])
                }),
            })
        ),
        rows:                           PropTypes.arrayOf(
            PropTypes.shape({
                isSelected:             PropTypes.bool,
                rowIndex:               PropTypes.string,
                cells:                  PropTypes.arrayOf(
                    PropTypes.shape({
                        id:             PropTypes.string,
                        value:          PropTypes.any,
                        text:           PropTypes.string,
                    })
                ),
            }),
        ),
        options:                        PropTypes.shape({
            tableWidth:                 PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
        }),
        cbChanged:                      PropTypes.func,
        cbSelected:                     PropTypes.func,
    };

    static defaultProps = {
        headers:        [],
        rows:           [],
        options: {
            tableWidth: 0,
        },
        cbChanged: null,
    };

    static classID = 0;

    static getHtmlID = ( data ) => {
        return ( data !== null && data !== undefined )
            ? data
            : 'Table_' + Table.classID;
    };

    constructor( props ) {
        super( props );
        Table.classID++;
        this.state = {
            htmlID: Table.getHtmlID( props.htmlID ),
        }
    }

    debug_mode = CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_TABLE;

    classCSS = 'Table';

    componentWillMount() {
        this.prepareData( this.props );
    }

    componentWillReceiveProps( newProps ) {
        this.prepareData( newProps );
    }

    prepareData = ( props ) => {
        ( this.debug_mode ) &&
            console.log( this.classCSS + ': prepareData: new props: ', props );

        let state = { htmlID: this.state.htmlID, headers: [], rows: [] };
        const { headers, rows } = props;

        if ( isNotEmpty( headers ) ) {
            state.headers = [ ...headers ];

            if ( isNotEmpty( rows ) ) {
                state.rows = [ ...rows ];
            }
        }

        this.setState( state, () => {
            ( this.debug_mode )
                && console.log( this.classCSS + ': prepareData: new state: ', this.state );
        } );
    };

    /* == controller == */

    thClick = ( e ) => {
        ( this.debug_mode ) &&
            console.log( 'Table: thClick: ', e.currentTarget.dataset.id );
        let headerId = e.currentTarget.dataset.id;
        this.sortChange( headerId );
    };

    rowClick = ( e ) => {
        let rowIndex = e.currentTarget.dataset.row_index;
        this.rowSelect( rowIndex );
    };

    rowDoubleClick = ( e ) => {
        this.rowChoose();
    };

    /* == action functions == */

    sortChange = ( headerId ) => {
        let headers = [ ...this.state.headers ];
        const { NONE, ASCENDED, DESCENDED } = Table.SORT_TYPES;
        let index = findArrayItemIndex( headers, { id: headerId } );
        if ( headers[ index ].isSortable ) {
            let sorting = headers[ index ].isSorted;
            switch ( sorting ) {
                case NONE:
                    headers[ index ].isSorted = ASCENDED;
                    break;
                case ASCENDED:
                    headers[ index ].isSorted = DESCENDED;
                    break;
                default:
                    headers[ index ].isSorted = NONE;
            }
            this.setState( { headers } );
        }
    };

    rowSelect = ( rowIndex ) => {
        const { cbChanged } = this.props;
        const { rows } = this.state;
        let index = findArrayItemIndex( rows, { rowIndex: rowIndex } );
        const { cells } = rows[ index ];
        let value = cells[ 0 ].value;
        // console.log( 'Table: rowSelect: operation`s id: ', value );
        if ( cbChanged ) cbChanged( value );
    };

    rowChoose = () => {
        const { cbSelected } = this.props;
        if ( cbSelected ) cbSelected();
    };

    /* == renders == */

    renderHeader = () => {
        const { headers } = this.state;
        const { NONE, ASCENDED, DESCENDED } = Table.SORT_TYPES;

        return ( isNotEmpty( headers ) ) &&
            <div className = { this.classCSS + '_header' }>
                { headers.map( ( item, index ) => {
                    const rotation = ( item.isSorted === ASCENDED )
                        ? "rotate(0,16,16)"
                        : ( item.isSorted === DESCENDED )
                            ? "rotate(180,16,16)"
                            : null;
                    return (
                        <div className = { this.classCSS + '_th' }
                             key = { index }
                             data-id = { item.id }
                             style = {{
                                 width: ( item.options.colWidth != 0 ) ? item.options.colWidth : 'auto',
                             }}
                             onClick = { this.thClick }>
                            {
                                ( item.isSorted !== NONE ) &&
                                <span className = { this.classCSS + '_th_arrow_box' }>
                                    <svg className = { this.classCSS + '_th_arrow' }
                                         width =   "100%"
                                         height =  "100%"
                                         viewBox = "0 0 32 32"
                                         preserveAspectRatio = "xMidYMid meet"
                                         xmlns =   "http://www.w3.org/2000/svg">
                                        <path d="M 16 1 V 31 M 10 25 L 16 31 L 22 25"
                                              stroke="#898989"
                                              strokeWidth="1.5"
                                              fill="none"
                                              transform ={ rotation } />
                                    </svg>
                                </span>
                            }
                            <span className = { this.classCSS + '_th_text_box' }>
                                { item.text }
                            </span>
                        </div>
                    )
                } ) }
            </div>
    };

    renderBody = () => {
        const { rows, headers } = this.state;
        return ( isNotEmptyAll( [ rows, headers ] ) )
            ? <div className = { this.classCSS + '_body' }>
                  {
                      ( isNotEmpty( rows ) ) &&
                          rows.map( ( item, index ) => {
                              return this.renderRow( item, index );
                          } )
                  }
              </div>
            : <div className = { this.classCSS + '_no_data_box' }>
                  Нет данных для отображения
              </div>
    };

    renderRow = ( item, index ) => {
        return (
            <div className = { this.classCSS + '_tr' }
                 key = { item.rowIndex }
                 data-row_index = { item.rowIndex }
                 data-selected = { item.isSelected }
                 onClick = { this.rowClick }
                 onDoubleClick = { this.rowDoubleClick }>
                { item.cells.map( ( cell, cellIndex ) => {
                    return this.renderCell( cell, cellIndex )
                } ) }
            </div>
        )
    };

    renderCell = ( cell, cellIndex ) => {
        return (
            <div className = { this.classCSS + '_td' }
                 key = { cellIndex }
                 data-cell_id = { cell.id }
                 data-cell_value = { cell.value }>
                { cell.text }
            </div>
        )
    };

    renderPaginator = () => {
        const { headers, rows } = this.state;
        return ( isNotEmptyAll( [ headers, rows ] ) ) &&
            <div className = { this.classCSS + '_paginator' }>
                Paginator
            </div>
    };

    render() {
        const { tableWidth } = this.props.options;
        return (
            <div className = { this.classCSS }
                 style = {{
                     width: ( tableWidth != 0 ) ? tableWidth : 'auto',
                 }}>
                { this.renderHeader() }
                { this.renderBody() }
                { this.renderPaginator() }
            </div>
        )
    }

}

export default Table;
