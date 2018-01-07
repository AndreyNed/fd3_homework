'use strict';

export const isExists = ( value ) => ( value !== null && value !== undefined );

export const isNotEmpty = ( value ) => ( isExists( value ) && value.length > 0 );
