'use strict';

import { SHOW_MAT_GLASS, HIDE_MAT_GLASS } from "../actions/acUI";

const initState = {
    matGlassIsVisible:      true,
};

function rdUI ( state = initState, action ) {
    switch ( action.type ) {

        case SHOW_MAT_GLASS:
            return {
                ...state, ...{
                    matGlassIsVisible:  true,
                }
            };

        case HIDE_MAT_GLASS:
            return {
                ...state, ...{
                    matGlassIsVisible:  false,
                }
            };

        default:
            return state;
    }
}

export default rdUI;