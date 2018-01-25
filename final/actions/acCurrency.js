'use strict';

const CURRENCY_LOAD_START =                             'CURRENCY_LOAD_START';
const CURRENCY_LOAD_SUCCESS =                           'CURRENCY_LOAD_SUCCESS';
const CURRENCY_LOAD_ERROR =                             'CURRENCY_LOAD_ERROR';
const CURRENCY_SHOULD_BE_RELOADED =                     'CURRENCY_SHOULD_BE_RELOADED';

const CURRENCY_SELECT =                                 'CURRENCY_SELECT';
const CURRENCY_SET_CURRENCY_DATA =                      'CURRENCY_SET_CURRENCY_DATA';

const acCurrencyLoadStart = function () {
    return {
        type:               CURRENCY_LOAD_START,
    }
};

const acCurrencyLoadSuccess = function ( loadedData ) {
    return {
        type:               CURRENCY_LOAD_SUCCESS,
        currencySource:     loadedData,
    }
};

const acCurrencyLoadError = function () {
    return {
        type:               CURRENCY_LOAD_ERROR,
    }
};

const acCurrencyShouldBeReloaded = function () {
    return {
        type:               CURRENCY_SHOULD_BE_RELOADED,
    }
};

const acCurrencySelect = function ( index ) {
    return {
        type:                  CURRENCY_SELECT,
        currencySelectedIndex: index,
    }
};

const acCurrencySetCurrencyData = function ( currencyData ) {
    return {
        type:                   CURRENCY_SET_CURRENCY_DATA,
        currencyData:           currencyData,
    }
};

export {
    CURRENCY_LOAD_START,            acCurrencyLoadStart,
    CURRENCY_LOAD_SUCCESS,          acCurrencyLoadSuccess,
    CURRENCY_LOAD_ERROR,            acCurrencyLoadError,
    CURRENCY_SHOULD_BE_RELOADED,    acCurrencyShouldBeReloaded,

    CURRENCY_SELECT,                acCurrencySelect,
    CURRENCY_SET_CURRENCY_DATA,     acCurrencySetCurrencyData,
}