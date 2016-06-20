import $ from 'jquery';
import _ from 'underscore';
export const mapReducer = (state = {center: [-74.0193459, 40.6809955], zoom: 10}, action) => {
    switch (action.type) {
        case 'CHANGE_MAP_POSITION':
            return {
                ...state,
                ...action.position
            };
        default:
            return state;
    }
};

export const layerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_LAYER':
            //console.log('inside reducer', layer);
            var layer = {};
            layer[action.layer.id] = action.layer.visible;
            return {
                ...state,
                ...layer
            };
        default:
            return state;
    }
};

export const overlayReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_OVERLAY':
            // If the overlay item already exists in the state
            // dont' add it again
            var alreadyExists = false;
            state.forEach((overlay) => {
                if (_.isEqual(overlay, action.overlay)) {
                    alreadyExists = true;
                }
            });
            if (alreadyExists) return state;
            return [
                ...state,
                action.overlay
            ];
        default:
            return state;
    }
};

export const popupReducer = (state = {content: '', visible: false}, action) => {
    switch(action.type) {
        case 'SHOW_POPUP':
            return {
                ...state,
                visible: true
            };
        case 'SET_POPUP_CONTENT':
            return {
                content: action.content,
                visible: true
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


