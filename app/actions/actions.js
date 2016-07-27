import axios from 'axios';
import _ from 'underscore';
import { TextDecoder } from 'text-encoding';
var AWS = require('aws-sdk');
AWS.config.update({accessKeyId: "AKIAIZD7EULPUK2JTS7Q", secretAccessKey: "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"});
var s3 = new AWS.S3();

export const startLoading = () => {
    return {
        type: 'START_LOADING'
    };
};

export const stopLoading = () => {
    return {
        type: 'STOP_LOADING'
    };
};

export const changeMapPosition = (position) => {
    return {
        type: 'CHANGE_MAP_POSITION',
        position
    };
};

//export const startAddOverlay = (overlay) => {
    //return (dispatch, getState) => {
        //if (getState().overlays.length) {
            //var alreadyExists = false;
            //getState().overlays.forEach((item) => {
                //if (item.id === overlay.id) {
                    //alreadyExists = true;
                //}
            //});
            //if (alreadyExists) return;  // <--- this item already exists, exit
        //}

        //// If we have a url...
        //if(overlay.data.indexOf('http') >= -1) {
            //return fetchData(overlay.data).then((res) => {
                //dispatch(addOverlay({
                    //...overlay,
                    //data: res.data
                //}));
            //});
        //} else {
            //// If we were given raw data in the first place
            //dispatch(addOverlay(overlay));
            //return;
        //}
    //};
//};

//var fetchData = (url) => {
    //return axios.get(url);
//};


// Get's all metadata for all files in 'data/' path in amazon S3 bucket
// Uses the metadata to construct the list of items available to view on the
// map, but instead of just downloading everything all upfront, each file will
// be downloaded when clicked on for the first time
export const startAddMapLayers = () => {
    return (dispatch, getState) => {
        dispatch(startLoading());
        s3.listObjects({Bucket: 'no-free-lunch-data', Delimiter: '/', Prefix: 'data/'}, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                data.Contents.forEach((obj) => {
                    if (obj.Key !== 'data/') {
                        s3.headObject({Bucket: 'no-free-lunch-data', Key: obj.Key}, (err, head) => {
                            dispatch(stopLoading());
                            if (err) {
                                console.log(err);
                            } else {
                                dispatch(addToLayer(head.Metadata.layer, obj.Key, head.Metadata.name));
                                //dispatch(addMapLayer(obj.Key, head.Metadata.name, head.Metadata.layer));
                            }
                        });
                    }
                });
            }
        });
    };
};

// Fetches individual data file from Amazon S3 bucket
export const startAddMapLayer = (key) => {
    return (dispatch, getState) => {
        dispatch(startLoading());
        s3.getObject({Bucket: 'no-free-lunch-data', Key: key}, (err, data) => {
            dispatch(stopLoading());
            if (err) {
                console.log(err);
            } else {
                // Data comes as binary - ugh
                var datastring = new TextDecoder('utf-8').decode(data.Body);
                var obj = JSON.parse(datastring);
                dispatch(addData(key, obj));
                dispatch(addVisibleLayer(key));
            }
        });
    };
};

//export const startToggleMapLayer = (key) => {
    //return (dispatch, getState) => {
        //// if the layer has data...
        //var layers = getState().layers;
        //if (getState().layers[key].data !== null) {
            //dispatch(toggleMapLayer(key));
        //} else {
            //dispatch(startAddMapLayer(key));
        //}
    //};
//};

export const toggleMapLayer = (key, visible) => {
    return {
        type: 'TOGGLE_MAP_LAYER',
        key
    };
};

export const addMapLayer = (key, name) => {
    return {
        type: 'ADD_MAP_LAYER',
        key,
        name
    };
};

export const addData = (key, data) => {
    return {
        type: 'ADD_DATA',
        key,
        data
    };
};

export const startAddVisibleLayer = (key) => {
    return (dispatch, getState) => {
        if (getState().allData[key]) {
            console.log('data exists, just add it to visibleLayers');
            dispatch(addVisibleLayer(key));
        } else {
            console.log('data does not exist, should fetch it');
            dispatch(startAddMapLayer(key));
        }
    };
};
export const addVisibleLayer = (key) => {
    console.log('adding visible layer');
    return {
        type: 'ADD_VISIBLE_LAYER',
        key
    };
};

export const removeVisibleLayer = (key) => {
    return {
        type: 'REMOVE_VISIBLE_LAYER',
        key
    };
};

export const addToLayer = (layerName, key, objectName) => {
    return {
        type: 'ADD_ASSOCIATED_LAYER',
        layerName,
        key,
        objectName
    };
};

export const toggleLayerList = (layerListName) => {
    return {
        type: 'TOGGLE_LAYER_LIST',
        name: layerListName
    };
};

export const addDataToMapLayer = (key, data) => {
    return {
        type: 'ADD_DATA_TO_MAP_LAYER',
        key,
        data
    };
};

//export const addNavLayers = (layers) => {
    //return {
        //type: 'ADD_NAV_LAYERS',
        //layers
    //};
//};

export const startToggleLayer = (id) => {
    return (dispatch, getState) => {
        var layer = getState().layers[id];

        if (!layer.data) {
            return fetchData(layer.dataUrl).then((res) => {
                dispatch(addDataToLayer(layer.id, res.data));
                dispatch(toggleLayer(layer.id, !getState().layers[id].visible));
            });
        } else {
            dispatch(toggleLayer(layer.id, !getState().layers[id].visible));
        }
    };
};

export const addDataToLayer = (id, data) => {
    return {
        type: 'ADD_DATA_TO_LAYER',
        data,
        id
    };
};

export const toggleLayer = (id, visible) => {
    return {
        type: 'TOGGLE_LAYER',
        id,
        visible
    };
};

export const addOverlay = (overlay) => {
    return {
        type: 'ADD_OVERLAY',
        overlay
    };
};

export const removeOverlay = (id) => {
    return {
        type: 'REMOVE_OVERLAY',
        id
    };
};

export const addLayer = (layer) => {
    return {
        type: 'ADD_LAYER',
        layer
    };
};

export const removeLayer = (id) => {
    return {
        type: 'REMOVE_LAYER',
        id
    };
};

export const showPopup = () => {
    return {
        type: 'SHOW_POPUP'
    };
};

export const hidePopup = () => {
    return {
        type: 'HIDE_POPUP'
    };
};

export const setPopupContent = (content) => {
    return {
        type: 'SET_POPUP_CONTENT',
        content
    };
};

export const toggleSideNav = () => {
    return {
        type: 'TOGGLE_SIDE_NAV'
    };
};

export const setAppLocation = (loc) => {
    return {
        type: 'SET_APP_LOCATION',
        loc
    };
};

// TODO: Write reducer for this action
export const setStartingLayer = (id) => {
    return {
        type: 'SET_STARTING_LAYER',
        id
    };
};
