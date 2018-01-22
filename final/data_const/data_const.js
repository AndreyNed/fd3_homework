'use strict';

const OPERATION_TYPES = {
    CREDIT:     'CREDIT',
    DEBIT:      'DEBIT',
};

const MODAL_CONTENT = {
    DATA_LOADING:               'DATA_LOADING',
    DATA_SAVING:                'DATA_SAVING',
    DATA_DELETING:              'DATA_DELETING',
    OPERATION_CARD:             'OPERATION_CARD',
    ACCOUNT_CARD:               'ACCOUNT_CARD',
    OPERATION_CATEGORY_CARD:    'OPERATION_CATEGORY_CARD',
    DELETE_CONFIRMATION:        'DELETE_CONFIRMATION',
    NONE:                       'NONE',
};

const DISPLAY_TYPES = {
    block:          'DISPLAY_BLOCK',
    inlineBlock:    'DISPLAY_INLINE_BLOCK',
    hidden:         'DISPLAY_HIDDEN',
    none:           'DISPLAY_NONE',
};

const SORTING = {
    NONE:           'NONE',
    ASCENDED:       'ASCENDED',
    DESCENDED:      'DESCENDED',
};

const DATA_TYPES = {
    NUMBER:         'NUMBER',
    STRING:         'STRING',
    DATE:           'DATE',
    DATE_TIME:      'DATE_TIME',
    DATE_MS_INT:    'DATE_MS_INT',
};

const POINTER_POSITION = {
    POINTER_LEFT:   'left',
    POINTER_RIGHT:  'right',
    POINTER_CENTER: 'center',
};

const ALIGN_TYPES = {
    LEFT:           'left',
    CENTER:         'center',
    RIGHT:          'right',
};

const SETTINGS_MODES = {
    ACCOUNTS:               'ACCOUNTS',
    OPERATION_CATEGORIES:   'OPERATION_CATEGORIES',
};

export {
    OPERATION_TYPES,
    MODAL_CONTENT,
    DISPLAY_TYPES,
    SORTING,
    DATA_TYPES,
    POINTER_POSITION,
    ALIGN_TYPES,
    SETTINGS_MODES,
}
