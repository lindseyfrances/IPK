import * as redux from 'redux';
console.log(redux);

import { popupContentReducer } from './../reducers/index';

const configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        popupContent: popupContentReducer
    });

    var store = redux.createStore(reducer, initialState, window.devToolsExtension ? window.devToolsExtension() : f => f);
    return store;
};

export default configure;
