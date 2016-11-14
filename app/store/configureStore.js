/* global window */
import * as redux from 'redux';
import thunk from 'redux-thunk';

import { mapDisplayReducer, menuReducer, selectedProjectReducer, projectListActiveReducer, currentCategoryReducer, categoriesReducer, categoriesDescriptorsReducer, projectsReducer, loadingReducer, dataLoadingReducer, mapReducer, popupReducer } from 'app/reducers/reducers';

const configure = (initialState = {}) => {
    const reducer = redux.combineReducers({
        popup: popupReducer,
        map: mapReducer,
        isLoading: loadingReducer,
        dataIsLoading: dataLoadingReducer,
        projects: projectsReducer,
        categories: categoriesReducer,
        categoriesDescriptors: categoriesDescriptorsReducer,
        currentCategory: currentCategoryReducer,
        projectListActive: projectListActiveReducer,
        selectedProject: selectedProjectReducer,
        mapDisplay: mapDisplayReducer,
        menu: menuReducer
    });

    const store = redux.createStore(reducer, initialState, redux.compose(
        redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : (f) => { return f; }
    ));
    // TODO: Don't forget to remove this later! Purely for dev reasons
    window.store = store;
    return store;
};

export default configure;
