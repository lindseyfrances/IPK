import * as redux from 'redux';
import thunk from 'redux-thunk';

import { appLocationReducer, loadingReducer, dataReducer, layersReducer, visibleLayersReducer, sideNavReducer, layerListsReducer, layerReducer, overlayReducer, mapReducer, popupReducer } from 'app/reducers/reducers';

const configure = (initialState = {}) => {
    var reducer = redux.combineReducers({
        popup: popupReducer,
        overlays: overlayReducer,
        map: mapReducer,
        layers: layerReducer,
        sideNavOpen: sideNavReducer,
        appLocation: appLocationReducer,
        isLoading: loadingReducer,
        visibleLayers: visibleLayersReducer,
        allData: dataReducer,
        allLayers: layersReducer,
        layerLists: layerListsReducer
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
