'use strict';

const isExists = ( value ) => value !== null && value !== undefined;

const isNotEmpty = ( value ) => isExists( value ) && value.length > 0;

const isNotNaN = ( value ) => isExists( value ) && !isNaN( value );

const isGTZero = ( value ) => isExists( value ) && value > 0;

const arraySort = ( arr ) => {
    let result = null;
    if ( isExists( arr ) && arr.length > 1 ) {
        result = [ ...arr ];
        for ( let i = 0; i < result.length - 1; i++ ) {
            for ( let j = i + 1; j < result.length; j++ ) {
                if ( result[ i ] < result[ j ] ) {
                    let temp = result[ i ];
                    result[ i ] = result[ j ];
                    result[ j ] = temp;
                }
            }
        }
    }
    return ( result !== null ) ? result : arr;
};

const arraySortByField = ( arr, field ) => {
    let result = null;
    if ( isExists( arr ) && arr.length > 1 && isNotEmpty( field ) ) {
        result = [ ...arr ];
        for ( let i = 0; i < result.length - 1; i++ ) {
            for ( let j = i + 1; j < result.length; j++ ) {
                if ( result[ i ][ field ] > result[ j ][ field ] ) {
                    let temp =    { ...result[ i ] };
                    result[ i ] = { ...result[ j ] };
                    result[ j ] = { ...temp };
                }
            }
        }
    }
    return ( result !== null ) ? result : arr;
};

const getIndexById = ( idValue, idField, list ) => {
    let result = -1;
    if ( isExists( idValue ) && isNotEmpty( idField ) && isNotEmpty( list ) ) {
        list.forEach( ( item, index ) => {
            result = ( item[ idField ] === idValue )
                ? index
                : result;
        } );
    }
    return result;
};

export {
    isExists, isNotEmpty, isNotNaN, isGTZero,
    arraySort, arraySortByField, getIndexById,
};
