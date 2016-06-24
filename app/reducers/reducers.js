import $ from 'jquery';
import _ from 'underscore';
export const mapReducer = (state = {center: [-74.0193459, 40.6809955], zoom: 5}, action) => {
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
            layer[action.layer.id] = {
                id: action.layer.id,
                visible: action.layer.visible
            };
            return {
                ...state,
                ...layer
            };
        case 'REMOVE_LAYER':
            var newState = {};
            for (var key in state) {
                if (key !== action.id) {
                    newState[key] = state[key];
                }
            }
            return newState;
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
        case 'REMOVE_OVERLAY':
            return state.filter((overlay) => {
                return overlay.id !== action.id;
            });
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

export const sideNavReducer = (state = false, action) => {
    switch(action.type) {
        case 'TOGGLE_SIDE_NAV':
            return !state;
        default:
            return state;
    }
};

export const whereAmIReducer = (state = {layer: 'none', page: 0}, action) => {
    switch(action.type) {
        case 'SET_WHERE_I_AM':
            return action.loc;
        default:
            return state;
    }
};


