const UI_SHOW_MAT_GLASS = 'UI_SHOW_MAT_GLASS';

const UI_HIDE_MAT_GLASS = 'UI_HIDE_MAT_GLASS';

const UI_SHOW_OPERATION_CARD = 'UI_SHOW_OPERATION_CARD';

const UI_HIDE_OPERATION_CARD = 'UI_HIDE_OPERATION_CARD';

const UI_SHOW_DATA_LOADING_MESSAGE = 'UI_SHOW_DATA_LOADING_MESSAGE';

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

const acUIShowDataLoadingMessage = function() {
    return {
        type:               UI_SHOW_DATA_LOADING_MESSAGE,
    }
};

export {
    UI_SHOW_MAT_GLASS, acUIShowMatGlass,
    UI_HIDE_MAT_GLASS, acUIHideMatGlass,
    UI_SHOW_OPERATION_CARD, acUIShowOperationCard,
    UI_SHOW_DATA_LOADING_MESSAGE, acUIShowDataLoadingMessage,
}