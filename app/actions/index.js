import axios from 'axios';
import _ from 'underscore';

export const changeMapPosition = (position) => {
    return {
        type: 'CHANGE_MAP_POSITION',
        position
    };
};

export const startAddOverlay = (overlay) => {
    return (dispatch, getState) => {
        if (getState().overlays.length) {
            var alreadyExists = false;
            getState().overlays.forEach((item) => {
                if (item.id === overlay.id) {
                    alreadyExists = true;
                }
            });
            if (alreadyExists) return;  // <--- this item already exists, exit
        }

        // If we have a url...
        if(overlay.data.indexOf('http') >= -1) {
            return fetchData(overlay.data).then((res) => {
                dispatch(addOverlay({
                    ...overlay,
                    data: res.data
                }));
            });
        }

        // If we were given raw data in the first place
        dispatch(addOverlay(overlay));
        return;
    };
};

var fetchData = (url) => {
    return axios.get(url);
};

export const addOverlay = (overlay) => {
    return {
        type: 'ADD_OVERLAY',
        overlay
    };
};

export const addLayer = (layer) => {
    return {
        type: 'ADD_LAYER',
        layer
    };
};

export const showPopup = () => {
    return {
        type: 'SHOW_POPUP'
    };
};

export const hidePopup = () => {
    return {
        type: 'HIDE_POPUP'
    };
};

export const setPopupContent = (content) => {
    return {
        type: 'SET_POPUP_CONTENT',
        content
    };
};
