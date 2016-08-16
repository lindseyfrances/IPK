import * as redux from 'redux';
import thunk from 'redux-thunk';

import { selectedProjectReducer, hoveredProjectReducer, currentCategoryReducer, categoriesReducer, categoriesDescriptorsReducer, projectsReducer, loadingReducer, mapReducer, popupReducer } from 'app/reducers/reducers';

const configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        popup: popupReducer,
        map: mapReducer,
        isLoading: loadingReducer,
        projects: projectsReducer,
        categories: categoriesReducer,
        categoriesDescriptors: categoriesDescriptorsReducer,
        currentCategory: currentCategoryReducer,
        hoveredProject: hoveredProjectReducer,
        selectedProject: selectedProjectReducer
    });

    var store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    // TODO: Don't forget to remove this later! Purely for dev reasons
    window.store = store;
    return store;
};

export default configure;
