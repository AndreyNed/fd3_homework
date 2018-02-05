const UI_SHOW_MAT_GLASS = 'UI_SHOW_MAT_GLASS';

const UI_HIDE_MAT_GLASS = 'UI_HIDE_MAT_GLASS';

const UI_SHOW_OPERATION_CARD = 'UI_SHOW_OPERATION_CARD';

const UI_SHOW_ACCOUNT_CARD = 'UI_SHOW_ACCOUNT_CARD';

const UI_SHOW_ACCOUNT_FILTER_PANEL = 'UI_SHOW_ACCOUNT_FILTER_PANEL';

const UI_SHOW_CURRENCY_LIST_CARD = 'UI_SHOW_CURRENCY_LIST_CARD';

const UI_SHOW_OPERATION_CATEGORY_CARD = 'UI_SHOW_OPERATION_CATEGORY_CARD';

const UI_SHOW_DATA_LOADING_MESSAGE = 'UI_SHOW_DATA_LOADING_MESSAGE';

const UI_SHOW_DATA_SAVING_MESSAGE = 'UI_SHOW_DATA_SAVING_MESSAGE';

const UI_SHOW_DATA_DELETING_MESSAGE = 'UI_SHOW_DATA_DELETING_MESSAGE';

const UI_SHOW_DELETE_CONFIRMATION = 'UI_SHOW_DELETE_CONFIRMATION';

const UI_SET_SETTINGS_MODE = 'UI_SET_SETTINGS_MODE';

const UI_SET_CURRENCY_MODE = 'UI_SET_CURRENCY_MODE';

const acUIShowMatGlass = function() {
    return {
        type:               UI_SHOW_MAT_GLASS,
    }
};

const acUIHideMatGlass = function() {
    return {
        type:               UI_HIDE_MAT_GLASS,
    }
};

const acUIShowOperationCard = function( isNew ) {
    return {
        type:                UI_SHOW_OPERATION_CARD,
        isNewOperationAdded: isNew,
    }
};

const acUIShowAccountCard = function( isNew ) {
    return {
        type:                UI_SHOW_ACCOUNT_CARD,
        isNewAccountAdded:   isNew,
    }
};

const acUIShowAccountFilterPanel = function() {
    return {
        type:                UI_SHOW_ACCOUNT_FILTER_PANEL,
    }
};

const acUIShowOperationCategoryCard = function( isNew ) {
    return {
        type:                           UI_SHOW_OPERATION_CATEGORY_CARD,
        isNewOperationCategoryAdded:    isNew,
    }
};

const acUIShowCurrencyListCard = function( isNew ) {
    return {
        type:                           UI_SHOW_CURRENCY_LIST_CARD,
        isNewCurrencyListAdded:         isNew,
    }
};

const acUIShowDataLoadingMessage = function() {
    return {
        type:               UI_SHOW_DATA_LOADING_MESSAGE,
    }
};

const acUIShowDataSavingMessage = function() {
    return {
        type:               UI_SHOW_DATA_SAVING_MESSAGE,
    }
};

const acUIShowDataDeletingMessage = function() {
    return {
        type:               UI_SHOW_DATA_DELETING_MESSAGE,
    }
};

const acUIShowDeleteConfirmation = function( deleteMode ) {
    return {
        type:               UI_SHOW_DELETE_CONFIRMATION,
        deleteMode:         deleteMode,
    }
};

const acUISetSettingsMode = function( settingsMode ) {
    return {
        type:               UI_SET_SETTINGS_MODE,
        settingsMode:       settingsMode,
    }
};

const acUISetCurrencyMode = function( currencyMode ) {
    return {
        type:               UI_SET_CURRENCY_MODE,
        currencyMode:       currencyMode,
    }
};

export {
    UI_SHOW_MAT_GLASS,                  acUIShowMatGlass,
    UI_HIDE_MAT_GLASS,                  acUIHideMatGlass,
    UI_SHOW_OPERATION_CARD,             acUIShowOperationCard,
    UI_SHOW_ACCOUNT_CARD,               acUIShowAccountCard,
    UI_SHOW_ACCOUNT_FILTER_PANEL,       acUIShowAccountFilterPanel,
    UI_SHOW_OPERATION_CATEGORY_CARD,    acUIShowOperationCategoryCard,
    UI_SHOW_CURRENCY_LIST_CARD,         acUIShowCurrencyListCard,
    UI_SHOW_DATA_LOADING_MESSAGE,       acUIShowDataLoadingMessage,
    UI_SHOW_DATA_SAVING_MESSAGE,        acUIShowDataSavingMessage,
    UI_SHOW_DATA_DELETING_MESSAGE,      acUIShowDataDeletingMessage,
    UI_SHOW_DELETE_CONFIRMATION,        acUIShowDeleteConfirmation,
    UI_SET_SETTINGS_MODE,               acUISetSettingsMode,
    UI_SET_CURRENCY_MODE,               acUISetCurrencyMode,
}