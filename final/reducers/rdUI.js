'use strict';

import { MODAL_CONTENT, SETTINGS_MODES, CURRENCY_MODES, DELETE_MODES } from "../data_const/data_const";

import {
    UI_SHOW_MAT_GLASS,
    UI_HIDE_MAT_GLASS,
    UI_SHOW_OPERATION_CARD,
    UI_SHOW_ACCOUNT_CARD,
    UI_SHOW_CURRENCY_LIST_CARD,
    UI_SHOW_OPERATION_CATEGORY_CARD,
    UI_SHOW_DATA_LOADING_MESSAGE,
    UI_SHOW_DATA_SAVING_MESSAGE,
    UI_SHOW_DATA_DELETING_MESSAGE,
    UI_SHOW_DELETE_CONFIRMATION,
    UI_SET_SETTINGS_MODE,
    UI_SET_CURRENCY_MODE,
} from "../actions/acUI";

const initState = {
    matGlassIsVisible:      true,
    isNewOperationAdded:    false,
    isNewAccountAdded:      false,
    isNewCurrencyListAdded: false,
    modalContent:           MODAL_CONTENT.DATA_LOADING,
    settingsMode:           SETTINGS_MODES.ACCOUNTS,
    currencyMode:           CURRENCY_MODES.DAILY_RATES,
    deleteMode:             DELETE_MODES.NONE,
};

function rdUI ( state = initState, action ) {
    switch ( action.type ) {

        case UI_SHOW_MAT_GLASS:
            return {
                ...state, ...{
                    matGlassIsVisible:  true,
                }
            };

        case UI_HIDE_MAT_GLASS:
            return {
                ...state, ...{
                    modalContent:        MODAL_CONTENT.NONE,
                    deleteMode:          DELETE_MODES.NONE,
                    matGlassIsVisible:   false,
                    isNewOperationAdded: false,
                }
            };

        case UI_SHOW_DATA_LOADING_MESSAGE:
            return {
                ...state, ...{
                    modalContent:       MODAL_CONTENT.DATA_LOADING,
                    matGlassIsVisible:  true,
                }
            };

        case UI_SHOW_OPERATION_CARD:
            return {
                ...state, ...{
                    modalContent:        MODAL_CONTENT.OPERATION_CARD,
                    matGlassIsVisible:   true,
                    isNewOperationAdded: action.isNewOperationAdded,
                }
            };

        case UI_SHOW_ACCOUNT_CARD:
            return {
                ...state, ...{
                    modalContent:        MODAL_CONTENT.ACCOUNT_CARD,
                    matGlassIsVisible:   true,
                    isNewAccountAdded:   action.isNewAccountAdded,
                }
            };

        case UI_SHOW_OPERATION_CATEGORY_CARD:
            return {
                ...state, ...{
                    modalContent:                   MODAL_CONTENT.OPERATION_CATEGORY_CARD,
                    matGlassIsVisible:              true,
                    isNewOperationCategoryAdded:    action.isNewOperationCategoryAdded,
                }
            };

        case UI_SHOW_CURRENCY_LIST_CARD:
            // console.log( 'rdUI: UI_SHOW_CURRENCY_LIST_CARD: action: ', action );
            return {
                ...state, ...{
                    modalContent:                   MODAL_CONTENT.CURRENCY_LIST_CARD,
                    matGlassIsVisible:              true,
                    isNewCurrencyListAdded:         action.isNewCurrencyListAdded,
                }
            };

        case UI_SHOW_DATA_SAVING_MESSAGE:
            return {
                ...state, ...{
                    modalContent:       MODAL_CONTENT.DATA_SAVING,
                    matGlassIsVisible:  true,
                }
            };

        case UI_SHOW_DATA_DELETING_MESSAGE:
            return {
                ...state, ...{
                    modalContent:       MODAL_CONTENT.DATA_DELETING,
                    matGlassIsVisible:  true,
                }
            };

        case UI_SHOW_DELETE_CONFIRMATION:
            return {
                ...state, ...{
                    deleteMode:         action.deleteMode,
                    modalContent:       MODAL_CONTENT.DELETE_CONFIRMATION,
                    matGlassIsVisible:  true,
                }
            };

        case UI_SET_SETTINGS_MODE:
            return {
                ...state, ...{
                    settingsMode:       action.settingsMode,
                }
            };

        case UI_SET_CURRENCY_MODE:
            return {
                ...state, ...{
                    currencyMode:       action.currencyMode,
                }
            };

        default:
            return state;
    }
}

export default rdUI;