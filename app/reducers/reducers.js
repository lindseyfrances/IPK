import $ from 'jquery';
import _ from 'underscore';
import projects from 'app/data/build/projectlist.csv';
export const mapReducer = (state = {center: [-74.0193459, 40.6809955], zoom: 10}, action) => {
    switch (action.type) {
        case 'SET_MAP_CENTER':
            return {
                ...state,
                center: action.center
            };
        case 'SET_MAP_BOUNDS':
            return {
                ...state,
                bounds: action.bounds
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

export const popupReducer = (state = {visible: false}, action) => {
    switch(action.type) {
        case 'HIDE_POPUP':
            return {
                visible: false,
                currentProject: '',
                point: {}
            };
        case 'SHOW_POPUP_WITH_PROJECT':
            return {
                visible: true,
                currentProject: action.id,
                point: action.point
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


export const projectsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INITIALIZE_PROJECT_LIST':
            var newState = {};
            action.projects.forEach((prj) => {
                if (prj.keywords) {
                    prj.keywords = prj.keywords.split(',').map(s => s.trim());
                } else {
                    prj.keywords = [];
                }
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

export const categoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INITIALIZE_CATEGORIES':
            let cat = {};
            action.projects.forEach((prj) => {
                if (cat[prj.category]) {
                    return;
                } else {
                    cat[prj.category] = false;
                }
            });
            return cat;
        case 'ADD_CATEGORY':
            return {
                ...state,
                [action.category]: false
            };
            //return [...state, action.category];
        case 'TOGGLE_CATEGORY':
            let toggled = !state[action.category];
            return {
                ...state,
                [action.category]: !state[action.category]
            };
        default:
            return state;
    }
};

export const categoriesDescriptorsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_CATEGORY_DESCRIPTOR':
            return {
                ...state,
                [action.category]: action.descriptor
            };
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


// Reducer to handle mousing over a ProjectList item
// It should trigger the map to move to the project with the corresponding id
export const projectListActiveReducer = (state = '', action) => {
    switch(action.type) {
        case 'MOVE_TO_PROJECT':
            return action.id;
        case 'REMOVE_HOVERED_PROJECT':
            return '';
        default:
            return state;
    }
};

export const selectedProjectReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_SELECTED_PROJECT':
            return action.id;
        case 'CLEAR_SELECTED_PROJECT':
            return '';
        default:
            return state;
    }
};

export const showLabelsReducer = (state = true, action) => {
    switch (action.type) {
        case 'TOGGLE_MAP_LABELS':
            return !state;
        default:
            return state;
    }
};
