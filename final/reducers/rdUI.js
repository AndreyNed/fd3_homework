'use strict';

import { MODAL_CONTENT } from "../data_const/data_const";

import {
    UI_SHOW_MAT_GLASS,
    UI_HIDE_MAT_GLASS,
    UI_SHOW_OPERATION_CARD,
    UI_SHOW_DATA_LOADING_MESSAGE,
} from "../actions/acUI";

const initState = {
    matGlassIsVisible:      true,
    isNewOperationAdded:    false,
    modalContent:           MODAL_CONTENT.DATA_LOADING,
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
                    modalContent:       MODAL_CONTENT.NONE,
                    matGlassIsVisible:  false,
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

        default:
            return state;
    }
}

export default rdUI;