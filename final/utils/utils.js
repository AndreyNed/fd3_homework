'use strict';

// ищет в массиве хэшей элемент, удовлетворяющую условиям из хэша filter (поле:значение)
// возврашает индекс первой подходящей строки или -1
export const findArrayItemIndex = (listData, filter) => {
    let length=listData.length;
    for ( let i=0; i<length; i++ ){
        let item=listData[i];
        let good=true;
        for ( let fld in filter ){
            if ( item[fld]!==filter[fld] ){
                good=false;
                break;
            }
        }
        if ( good )
            return i;
    }
    return -1;
};

// ищет в массиве хэшей элемент, удовлетворяющую условиям из хэша filter (поле:значение)
// возврашает найденный элемент или null
export const findArrayItem = (listData, filter) => {
    let index=findArrayItemIndex(listData, filter);
    if ( index==-1 )
        return null;
    return listData[index];
};

export const isExists = ( value ) => ( value !== null && value !== undefined );

// проверяет массив элементов на существование массива и элементов ( arr = [ elm1, elm2, ... ] )
export const isExistsAll = ( arr ) => {
    let result = true;

    if ( isNotEmpty( arr ) ) {
        for ( let i = 0; i < arr.length; i++ ) {
            result = ( isExists( arr[ i ] ) )
                ? result
                : false;
            if ( !result ) break;
        }
        return result;
    }
    return false;
};

// проверка массива строк или массивов на наличие элементов и на то, что элементы не пустые
// arr = [ arr1, str2, str3, arr4, ... ]
export const isNotEmptyAll = ( arr ) => {
    let result = true;
    if ( isExistsAll( arr ) ) {
        for ( let i = 0; i < arr.length; i++ ) {
            result = ( isNotEmpty( arr[ i ] ) )
                ? result
                : false;
            if ( !result ) break;
        }
        return result;
    }
    return false;
};

export const isNotEmpty = ( value ) => ( isExists( value ) && value.length > 0 );

// сравнивает хеши по массиву полей в fieldsArray [ поле1, поле2, поле3, ... }
// поля считаются равными, даже если их нет в обоих хешах одновременно
export const compareHashes = (first, second, fieldsArray ) => {
    let result = true;
    if ( isExistsAll( [ first, second ] ) && isNotEmpty( fieldsArray ) ) {
        for ( let i = 0; i < fieldsArray.length; i++ ) {
            result = ( first[ fieldsArray[ i ] ] === second[ fieldsArray[ i ] ] )
                ? result
                : false;
        }
        return result
    }
    return false;
};