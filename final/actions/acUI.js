const SHOW_MAT_GLASS = 'SHOW_MAT_GLASS';

const HIDE_MAT_GLASS = 'HIDE_MAT_GLASS';

const acShowMatGlass = function() {
    return {
        type:               SHOW_MAT_GLASS,
    }
};

const acHideMatGlass = function() {
    return {
        type:               HIDE_MAT_GLASS,
    }
};

export {
    SHOW_MAT_GLASS, acShowMatGlass,
    HIDE_MAT_GLASS, acHideMatGlass,
}