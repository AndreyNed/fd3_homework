'use strict';

// форматирует число
// mainMode - режим отображения целой части:
// 0 - просто числом
// 1 - разбиение на тысячи пробелами
// fractMode - режим отображения дробной части:
// 0 - не отображать
// -1 - отображать только значащие цифры
// N>0 - отображать заданное количество цифр
export const formatNumber = ( value, mainMode = 0, fractMode = -1 ) => {

    if (value === null)
        return "";

    if (mainMode == 0 && fractMode == -1)
        return value.toString().split(".").join(",");

    let signStr = "";
    if (value < 0) {
        signStr = "-";
        value = -value;
    }

    let mainPart = Math.floor(value);
    let fractPart = Math.floor((value - mainPart) * 1e10) / 1e10;

    let mainStr = mainPart.toString();
    if (mainMode == 1) {
        let mainStr2 = "";
        let mainStrLen = mainStr.length;
        while (mainStrLen > 3) {
            mainStrLen -= 3;
            mainStr2 = " " + mainStr.substr(mainStrLen, 3) + mainStr2;
            mainStr = mainStr.substr(0, mainStrLen);
        }
        mainStr += mainStr2;
    }

    let fractStr = "";
    if (fractMode == -1 && fractPart != 0) {
        fractStr = "," + fractPart.toString().substr(2);
    }
    else if (fractMode > 0) {
        fractStr = "," + fractPart.toFixed(fractMode).substr(2);
    }

    return signStr + mainStr + fractStr;
}

// дополняет строку Val слева нулями до длины Len
export const str0l = (val, len) => {
    let strVal = val.toString();
    while (strVal.length < len)
        strVal = '0' + strVal;
    return strVal;
};

// форматирует переданную дату-время в формате дд.мм.гггг
export const formatDate = (dt) => {
    if ( isExists( dt ) && ( dt instanceof Date ) ) {
        let year = dt.getFullYear();
        let month = dt.getMonth() + 1;
        let day = dt.getDate();
        return str0l(day, 2) + '.' + str0l(month, 2) + '.' + year;
    }
    return '';
};

// форматирует переданную дату-время в формате дд.мм.гггг чч:мм:сс
export const formatDateTime = (dt) => {
    if ( isExists( dt ) && ( dt instanceof Date ) ) {
        let hours = dt.getHours();
        let minutes = dt.getMinutes();
        let seconds = dt.getSeconds();
        return formatDate(dt) + ' ' + str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);
    }
    return '';
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