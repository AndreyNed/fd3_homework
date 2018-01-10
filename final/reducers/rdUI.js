'use strict';

import {
    UI_SHOW_MAT_GLASS,
    UI_HIDE_MAT_GLASS,
    UI_SHOW_OPERATION_CARD,
    UI_HIDE_OPERATION_CARD,
} from "../actions/acUI";

const initState = {
    matGlassIsVisible:      true,
    operationCardIsVisible: false,
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
                    matGlassIsVisible:  false,
                }
            };

        case UI_SHOW_OPERATION_CARD:
            return {
                ...state, ...{
                    operationCardIsVisible:  true,
                }
            };

        case UI_HIDE_OPERATION_CARD:
            return {
                ...state, ...{
                    operationCardIsVisible:  false,
                }
            };

        default:
            return state;
    }
}

export default rdUI;