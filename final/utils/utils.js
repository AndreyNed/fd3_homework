'use strict';

// дополняет строку Val слева нулями до длины Len
export const str0l = (val, len) => {
    let strVal = val.toString();
    while (strVal.length < len)
        strVal = '0' + strVal;
    return strVal;
};

// форматирует переданную дату-время в формате дд.мм.гггг
export const formatDate = (dt) => {
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let day = dt.getDate();
    return str0l(day, 2) + '.' + str0l(month, 2) + '.' + year;
};

// форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
export const formatDateTime = (dt) => {
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();
    return formatDate(dt) + ' ' + str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
};

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

// проверка, что число существует и не isNaN
export const isNotNaN = ( value ) => ( isExists( value ) && !isNaN( value ) );

// проверка для чисел на >0
export const isGTZero = ( num ) => {
    return ( num !== null && num !== undefined && !isNaN( num ) && num > 0 );
};

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