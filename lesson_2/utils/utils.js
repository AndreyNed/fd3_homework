'use strict';

const isExists = ( value ) => value !== null && value !== undefined;

const isNotEmpty = ( value ) => isExists( value ) && value.length > 0;

const isNotNaN = ( value ) => isExists( value ) && !isNaN( value );

export { isExists, isNotEmpty, isNotNaN };
