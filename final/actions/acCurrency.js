'use strict';

const CURRENCY_LOAD_START =                             'CURRENCY_LOAD_START';
const CURRENCY_LOAD_SUCCESS =                           'CURRENCY_LOAD_SUCCESS';
const CURRENCY_LOAD_ERROR =                             'CURRENCY_LOAD_ERROR';
const CURRENCY_SHOULD_BE_RELOADED =                     'CURRENCY_SHOULD_BE_RELOADED';

const CURRENCY_SELECT =                                 'CURRENCY_SELECT';
const CURRENCY_SET_CURRENCY_DATA =                      'CURRENCY_SET_CURRENCY_DATA';

const CURRENCY_DYNAMIC_LOAD_START =                     'CURRENCY_DYNAMIC_LOAD_START';
const CURRENCY_DYNAMIC_LOAD_SUCCESS =                   'CURRENCY_DYNAMIC_LOAD_SUCCESS';
const CURRENCY_DYNAMIC_LOAD_ERROR =                     'CURRENCY_DYNAMIC_LOAD_ERROR';
const CURRENCY_DYNAMIC_SHOULD_BE_RELOADED =             'CURRENCY_DYNAMIC_SHOULD_BE_RELOADED';

const CURRENCY_DYNAMIC_SET_START_DATE =                 'CURRENCY_DYNAMIC_SET_START_DATE';
const CURRENCY_DYNAMIC_SET_END_DATE =                   'CURRENCY_DYNAMIC_SET_END_DATE';
const CURRENCY_DYNAMIC_SET_START_POINT =                'CURRENCY_DYNAMIC_SET_START_POINT';
const CURRENCY_DYNAMIC_SET_END_POINT =                  'CURRENCY_DYNAMIC_SET_END_POINT';
const CURRENCY_DYNAMIC_SET_POINTS =                     'CURRENCY_DYNAMIC_SET_POINTS';
const CURRENCY_DYNAMIC_SELECT =                         'CURRENCY_DYNAMIC_SELECT';
const CURRENCY_DYNAMIC_SET_CURRENCY_DATA =              'CURRENCY_DYNAMIC_SET_CURRENCY_DATA';

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

const acCurrencyDynamicLoadStart = function () {
    return {
        type:               CURRENCY_DYNAMIC_LOAD_START,
    }
};

const acCurrencyDynamicLoadSuccess = function ( loadedData ) {
    return {
        type:                   CURRENCY_DYNAMIC_LOAD_SUCCESS,
        currencyDynamicSource:  loadedData,
    }
};

const acCurrencyDynamicLoadError = function () {
    return {
        type:               CURRENCY_DYNAMIC_LOAD_ERROR,
    }
};

const acCurrencyDynamicShouldBeReloaded = function () {
    return {
        type:               CURRENCY_DYNAMIC_SHOULD_BE_RELOADED,
    }
};

const acCurrencyDynamicSetStartDate = function ( startDate ) {
    return {
        type:                         CURRENCY_DYNAMIC_SET_START_DATE,
        currencyDynamicStartDate:     startDate,
    }
};

const acCurrencyDynamicSetEndDate = function ( endDate ) {
    return {
        type:                         CURRENCY_DYNAMIC_SET_END_DATE,
        currencyDynamicEndDate:       endDate,
    }
};

const acCurrencyDynamicSetStartPoint = function ( startPoint ) {
    console.log( 'action start point: ', startPoint );
    return {
        type:                          CURRENCY_DYNAMIC_SET_START_POINT,
        currencyDynamicStartPoint:     startPoint,
    }
};

const acCurrencyDynamicSetEndPoint = function ( endPoint ) {
    return {
        type:                          CURRENCY_DYNAMIC_SET_END_POINT,
        currencyDynamicEndPoint:       endPoint,
    }
};

const acCurrencyDynamicSetPoints = function ( startPoint, endPoint ) {
    return {
        type:                          CURRENCY_DYNAMIC_SET_POINTS,
        currencyDynamicStartPoint:     startPoint,
        currencyDynamicEndPoint:       endPoint,
    }
};

const acCurrencyDynamicSelect = function ( id ) {
    return {
        type:                         CURRENCY_DYNAMIC_SELECT,
        currencyDynamicCurID:         id,
    }
};

const acCurrencySetDynamicCurrencyData = function ( currencyDynamicData ) {
    return {
        type:                   CURRENCY_DYNAMIC_SET_CURRENCY_DATA,
        currencyDynamicData:    currencyDynamicData,
    }
};

export {
    CURRENCY_LOAD_START,            acCurrencyLoadStart,
    CURRENCY_LOAD_SUCCESS,          acCurrencyLoadSuccess,
    CURRENCY_LOAD_ERROR,            acCurrencyLoadError,
    CURRENCY_SHOULD_BE_RELOADED,    acCurrencyShouldBeReloaded,

    CURRENCY_SELECT,                acCurrencySelect,
    CURRENCY_SET_CURRENCY_DATA,     acCurrencySetCurrencyData,

    CURRENCY_DYNAMIC_LOAD_START,            acCurrencyDynamicLoadStart,
    CURRENCY_DYNAMIC_LOAD_SUCCESS,          acCurrencyDynamicLoadSuccess,
    CURRENCY_DYNAMIC_LOAD_ERROR,            acCurrencyDynamicLoadError,
    CURRENCY_DYNAMIC_SHOULD_BE_RELOADED,    acCurrencyDynamicShouldBeReloaded,

    CURRENCY_DYNAMIC_SET_START_DATE,        acCurrencyDynamicSetStartDate,
    CURRENCY_DYNAMIC_SET_END_DATE,          acCurrencyDynamicSetEndDate,
    CURRENCY_DYNAMIC_SET_START_POINT,       acCurrencyDynamicSetStartPoint,
    CURRENCY_DYNAMIC_SET_END_POINT,         acCurrencyDynamicSetEndPoint,
    CURRENCY_DYNAMIC_SET_POINTS,            acCurrencyDynamicSetPoints,
    CURRENCY_DYNAMIC_SELECT,                acCurrencyDynamicSelect,
    CURRENCY_DYNAMIC_SET_CURRENCY_DATA,     acCurrencySetDynamicCurrencyData,
}