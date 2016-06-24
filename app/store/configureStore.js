import * as redux from 'redux';
import thunk from 'redux-thunk';

import { whereAmIReducer, sideNavReducer, layerReducer, overlayReducer, mapReducer, popupReducer } from 'app/reducers/reducers';

const configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        popup: popupReducer,
        overlays: overlayReducer,
        map: mapReducer,
        layers: layerReducer,
        sideNavOpen: sideNavReducer,
        whereAmI: whereAmIReducer
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
