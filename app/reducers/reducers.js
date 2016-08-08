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

export const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'START_LOADING':
            return true;
        case 'STOP_LOADING':
            return false;
        default:
            return state;
    }
};

export const visibleLayersReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_VISIBLE_LAYER':
            return state.concat(action.key);
        case 'REMOVE_VISIBLE_LAYER':
            return state.filter((val, index, arr) => {
                return val !== action.key;
            });
        default:
            return state;
    }
};

export const dataReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            console.log(action);
            console.log(Object.assign({}, state, {[action.key]: action.data}));
            return Object.assign({}, state, {[action.key]: action.data});
        default:
            return state;
    }
};

export const layerListsReducer = (state = {}, action) => {
    switch(action.type) {
        case 'TOGGLE_LAYER_LIST':
            return {
                ...state,
                [action.name]: !state[action.name]
            };
        default:
            return state;
    }
};

export const layersReducer = (state = {soil: [], water: [], distribution: [], energy: [], economics: [], labor: [], agriculture: []}, action) => {
    switch (action.type) {
        case 'ADD_ASSOCIATED_LAYER':
            return {
                ...state,
                [action.layerName]: state[action.layerName].concat({key: action.key, name: action.objectName})
            };
        default:
            return state;
    }
};

export const layerReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_MAP_LAYER': 
            return {
                ...state,
                [action.key]: {
                    key: action.key,
                    data: null,
                    visible: false,
                    name: action.name
                }
            };
        case 'TOGGLE_MAP_LAYER':
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    visible: !state[action.key].visible
                }
            };
        case 'ADD_DATA_TO_MAP_LAYER':
            return {
                ...state,
                [action.key]: {
                    ...state[action.key],
                    data: action.data,
                    visible: true
                }
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

export const appLocationReducer = (state = {layer: 'none', page: 0}, action) => {
    switch(action.type) {
        case 'SET_APP_LOCATION':
            return action.loc;
        default:
            return state;
    }
};


export const projectsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INITIALIZE_PROJECT_LIST':
            var newState = {};
            action.projects.forEach((prj) => {
                newState[prj.id] = prj;
            });
            return newState;
        case 'ADD_PROJECT':
            return {...state, [action.project.id]: action.project};
        //case 'REMOVE_PROJECT':
            //return state.filter((prj, i) => {
                //return prj.id !== action.id;
            //});
        default:
            return state;
    }
};

export const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZE_CATEGORIES':
            let cat = [];
            action.projects.forEach((prj) => {
                if (cat.indexOf(prj.category) !== -1) {
                    return;
                } else {
                    cat.push(prj.category);
                }
            });
            return cat;
        default:
            return state;
    }
};

export const currentCategoryReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_CURRENT_CATEGORY':
            return action.cat;
        default:
            return state;
    }
};

export const hoveredProjectReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_HOVERED_PROJECT':
            return action.id;
        case 'REMOVE_HOVERED_PROJECT':
            return '';
        default:
            return state;
    }
};
