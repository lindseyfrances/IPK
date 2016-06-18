import $ from 'jquery';
export const popupReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SHOW_POPUP':
            return {
                ...state,
                visible: true
            };
        case 'SET_POPUP_CONTENT':
            return {
                ...state,
                content: action.content
            };
        case 'HIDE_POPUP':
            return {
                ...state,
                visible: false
            };
        default:
            return state;
    }
};


