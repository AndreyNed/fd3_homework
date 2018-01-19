import { CONFIG_DEBUG_MODE, CONFIG_DEBUG_MODE_SMART_GRID_UTILS } from "../../config/config";

import {
    isExists,
    isExistsAll,
    isNotEmpty,
    isNotEmptyAll,
    findArrayItem,
    findArrayItemIndex,
    isNotNaN,
    isGTZero,
    formatDate,
    formatDateTime,
} from "../../utils/utils";

import {
    DATA_TYPES,
    SORTING,
    POINTER_POSITION,
} from "../../data_const/data_const";


const { NUMBER, STRING, DATE, DATE_TIME, DATE_MS_INT } = DATA_TYPES;

const { NONE, ASCENDED, DESCENDED } = SORTING;

const { POINTER_CENTER, POINTER_LEFT, POINTER_RIGHT } = POINTER_POSITION;

const debug_mode = ((( CONFIG_DEBUG_MODE && CONFIG_DEBUG_MODE_SMART_GRID_UTILS )));

// устанавливает порядок столбцов в строках таким же, как в заголовке
export const buildOrderedRows = ( headers, body ) => {
    let result = ( isNotEmpty( body ) )
        ? [ ...body ]
        : body;
    if ( isNotEmptyAll( [ headers, body ] ) ) {
        let colIds = headers.map( ( item ) => item.id );
        result = body.map( ( row ) => {
            let cells = colIds.map( ( colId ) => {
                let colIndex = findArrayItemIndex( row.cells, { id: colId } );
                return { ...row.cells[ colIndex ] };
            } );
            return { ...row, cells }
        } );
        // console.log( 'result: ', result );
    }
    return result;
};

// Необходимо, чтобы порядок столбцов в headers и в body совпадал
export const addTextField = ( headers, body ) => {
    let result = body.map( ( row ) => {
        let cells = row.cells.map( ( cell, index ) => {
            let text = ( 'text' in cell )
                ? cell.text
                : textFromValue( cell.value, headers[ index ].dataType );
            return { ...cell, text }
        } );
        return { ...row, cells }
    } );
    return ( isNotEmpty( result ) ) ? result : body;
};

// Преобразование значения в форматированный текст
export const textFromValue = ( value, dataType ) => {
    switch ( dataType ) {
        case NUMBER:
            // todo number formatting
            return value + '';

        case STRING:
            return value;

        case DATE:
            return formatDate( value );

        case DATE_TIME:
            return formatDateTime( value );

        case DATE_MS_INT:
            let d = new Date( value );
            return formatDate( d );

        default:
            return value;
    }
};

// Необходимо наличие поля text в ячейках body ( функция addTextField добавляет такое поле )
export const filterValue = ( headers, body, textFilterValue ) => {
    let result = [];
    let searchableColIds = [];
    headers.forEach( ( col ) => { ( col.isSearchable ) && searchableColIds.push( col.id ) } );

    if ( isNotEmpty( searchableColIds ) )
        result = body.filter( ( row ) => {
            let test = false;

            searchableColIds.forEach( ( colId ) => {
                let index = findArrayItemIndex( row.cells, { id: colId } );
                let text = row.cells[ index ].text;
                test = ( text.trim().toLowerCase().indexOf( textFilterValue.trim().toLowerCase() ) > -1 )
                    ? true
                    : test;
            });

            return test;
        } );

    ( debug_mode ) && console.log( 'searchableColIds: ', searchableColIds );
    return result;
};

// порядок столбцов в заголовке и в теле должен совпадать
export const sortingRows = ( headers, body, defaultBody ) => {
    let sortIndex = -1;
    let sorting = NONE;

    headers.forEach( ( header, index ) => {
        if ( header.isSortable && header.sorting !== NONE ) {
            sortIndex = index;
            sorting = header.sorting;
        }
    } );

    ( debug_mode ) &&
    console.log( 'sortingRows: sortIndex: ' + sortIndex + ', sorting:' + sorting );

    let result = ( isNotEmpty( body ) )
        ? [ ...body ]
        : body;

    if ( isNotEmpty( result ) && result.length > 1 && sortIndex > -1 ) {

        ( debug_mode ) &&
        console.log( '*** Sorting... ***' );

        for ( let i = 0; i < result.length - 1; i++ ) {
            for ( let j = i + 1; j < result.length; j++ ) {
                let valueCurr = result[ i ].cells[ sortIndex ].value;
                let valueNext = result[ j ].cells[ sortIndex ].value;

                ( debug_mode ) &&
                console.log( i + ': valueCurr: ' + valueCurr + ' / ' + j + ': valueNext: ', valueNext );

                if
                ( ( sorting === ASCENDED && valueCurr > valueNext ) ||
                  ( sorting === DESCENDED && valueCurr < valueNext ) )
                {
                        let temp = { ...result[ j ] };
                        result[ j ] = { ...result[ i ] };
                        result[ i ] = { ...temp };
                }
            }
        }
    }
    else if ( isNotEmpty( result ) && result.length > 1 && sortIndex < 0 && isNotEmpty( defaultBody ) ) {
        result = cancelSorting( body, defaultBody );
    }
    return result;
};

// Возвращает массив строк из body, но в том порядке, что в defaultBody
export const cancelSorting = ( body, defaultBody ) => {

    if ( isNotEmptyAll( [ body, defaultBody ] ) ) {
        let result = [];

        ( debug_mode ) &&
            console.log( '*** cancelSorting... ***' );

        defaultBody.forEach( ( defRow ) => {
            const { rowIndex } = defRow;
            let row = findArrayItem( body, { rowIndex: rowIndex } );
            if ( isExists( row ) ) result.push( row );
            ( debug_mode ) &&
                console.log( 'Row: ', row );
        } );

        return result;
    }
    else return body;
};

// возаращает rowIndex строки, содержащей в массиве cells значение поля из primaryId, равное defValue
// результат может отличаться от индекса строки в массиве body, т.к. rowIndex не привязан к порядку строк
export const getRowSelectedIndex = ( body, primaryId, defValue ) => {
    let result = -1;

    body.forEach( ( row ) => {
        let cellIndex = findArrayItemIndex( row.cells, { id: primaryId } );
        result = ( row.cells[ cellIndex ].value === defValue )
            ? row.rowIndex
            : result;
    } );

    ( debug_mode ) && console.log( 'getRowSelectedIndex: result: ', result );

    return result;
};

// options = { withFooter, rowsPerPage, body, rowSelectedIndex }
// возвращает { pages, pageSelectedIndex, rowUpperIndex, rowBottomIndex }
export const getPagesInfo = ( options ) => {
    const { withFooter, rowsPerPage, body, rowSelectedIndex } = options;
    let pages = null;
    let pageSelectedIndex = -1;
    let rowUpperIndex = 0;
    let rowBottomIndex = body.length - 1;

    if ( withFooter && isGTZero( rowsPerPage ) ) {
        pages = getPages( { rowsCount: body.length, rowsPerPage } );
        let rowBodyIndex = findArrayItemIndex( body, { rowIndex: rowSelectedIndex } );
        pageSelectedIndex = Math.floor( Math.abs( rowBodyIndex ) / rowsPerPage );
        let indexes = getIndexesInPage( body.length, rowsPerPage, pageSelectedIndex );
        rowUpperIndex = indexes.rowUpperIndex;
        rowBottomIndex = indexes.rowBottomIndex;
    }

    let result = { pages, pageSelectedIndex, rowUpperIndex, rowBottomIndex };

    ( debug_mode ) && console.log( 'getPagesInfo: result: ', result );

    return result;
};

export const getPages = ( options ) => {
    const { rowsCount, rowsPerPage } = options;

    let pagesCount = Math.ceil( rowsCount / rowsPerPage );
    let pages = [];

    for ( let i = 0; i < pagesCount; i++ ) {
        pages.push( { id: i, label: ( i + 1 ) + '' } );
    }

    return pages;
};

export const getIndexesInPage = ( rowsCount, rowsPerPage, pageSelectedIndex ) => {
    let rowUpperIndex = pageSelectedIndex * rowsPerPage;
    let rowBottomIndex = rowUpperIndex + rowsPerPage - 1;
    rowBottomIndex = rowBottomIndex < rowsCount ? rowBottomIndex : rowsCount - 1;
    let result = { rowUpperIndex, rowBottomIndex };

    ( debug_mode ) && console.log( 'getIndexesInPage: result: ', result );

    return result;
};

export const changeThOrder = ( headers, body, colStart, colEnd ) => {
    let result = [ ...headers ];
    let s = findArrayItemIndex( result, { id: colStart } );
    let e = findArrayItemIndex( result, { id: colEnd } );
    let temp = result[ s ];

    if ( s !== e )
        if ( s < e ) {
            for ( let i = s; i < e; i++ ) {
                result[ i ] = result[ i + 1 ];
            }
        }
        else {
            for ( let i = s; i > e; i-- ) {
                result[ i ] = result[ i - 1 ];
            }
        }

    result[ e ] = temp;

    return result;
};

// startId, endId - id стартового и текущего столбцов
export const getPointerPosition = ( startId, endId, headers ) => {
    let result = '';

    if ( isExistsAll( [ startId, endId ] ) ) {
        let s = findArrayItemIndex( headers, { id: startId } );
        let e = findArrayItemIndex( headers, { id: endId } );
        result = ( s === e )
            ? POINTER_CENTER
            : ( s < e )
                ? POINTER_RIGHT
                : POINTER_LEFT;
    }

    return result;
};