export const showPopup = () => {
    return {
        type: 'SHOW_POPUP'
    };
};
export const hidePopup = () => {
    return {
        type: 'SHOULD_HIDE_POPUP'
    };
};

export const setPopupContent = (content) => {
    return {
        type: 'CHANGE_POPUP_CONTENT',
        content
    };
};
