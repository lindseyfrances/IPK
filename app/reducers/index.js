import $ from 'jquery';
export const popupContentReducer = (state = '', action) => {
    switch(action.type) {
        case 'CHANGE_POPUP_CONTENT':
            $('#hover-popup').html(action.content);
            return action.content;
        default:
            return state;
    }
};


