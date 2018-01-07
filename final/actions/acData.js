'use strict';

const DATA_ACCOUNTS_LOAD_START =            'DATA_ACCOUNTS_LOAD_START';
const DATA_ACCOUNTS_LOAD_SUCCESS =          'DATA_ACCOUNTS_LOAD_SUCCESS';
const DATA_ACCOUNTS_LOAD_ERROR =            'DATA_ACCOUNTS_LOAD_ERROR';
const DATA_ACCOUNTS_SHOULD_BE_RELOADED =    'DATA_ACCOUNTS_SHOULD_BE_RELOADED';

const acDataAccountsLoadStart = function () {
    return {
        type:               DATA_ACCOUNTS_LOAD_START,
    }
};

const acDataAccountsLoadSuccess = function ( loadedData ) {
    return {
        type:               DATA_ACCOUNTS_LOAD_SUCCESS,
        accountsData:       loadedData,
    }
};

const acDataAccountsLoadError = function () {
    return {
        type:               DATA_ACCOUNTS_LOAD_ERROR,
    }
};

const acDataAccountsShouldBeReloaded = function () {
    return {
        type:               DATA_ACCOUNTS_SHOULD_BE_RELOADED,
    }
};

export {
    DATA_ACCOUNTS_LOAD_START,           acDataAccountsLoadStart,
    DATA_ACCOUNTS_LOAD_SUCCESS,         acDataAccountsLoadSuccess,
    DATA_ACCOUNTS_LOAD_ERROR,           acDataAccountsLoadError,
    DATA_ACCOUNTS_SHOULD_BE_RELOADED,   acDataAccountsShouldBeReloaded,
}