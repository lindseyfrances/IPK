import * as redux from 'redux';
console.log(redux);

import { popupReducer } from './../reducers/index';

const configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        popup: popupReducer
    });

    var store = redux.createStore(reducer, initialState, window.devToolsExtension ? window.devToolsExtension() : f => f);
    return store;
};

export default configure;
