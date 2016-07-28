/****************************************************
 *  Map component
 *      This component manages it's own state
 *      because it should be in charge of what
 *      layers and sources are on it.
 *      If we stored sources and layers
 *      on the store - then watched for those
 *      changes to update what's visible
 *      on the map, it get's messy trying to account
 *      for map movement as well as what 
 *      should be displayed at any given moment
 *
 *      Instead, we store the 'location' of the user
 *      on the store, i.e. what 'page' they're on
 *      then adjust the internal map state accoringly
 *
 *      There may be a more pure react + redux
 *      way to do this, but due to Mapbox wanting
 *      to manage it's own component, it makes sense
 *      to break the map state out of react
 *****************************************************/

import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import _ from 'underscore';

import * as actions from 'app/actions/actions';

// Types of overlays
import PointsOverlay from 'app/overlays/PointsOverlay';
import PathOverlay from 'app/overlays/PathOverlay';

// Page controller
import PageModel from 'app/models/PageModel';

class Map extends React.Component {
    componentDidMount() {
        var { appLocation, containerId, map, dispatch } = this.props;
        this.elt = ReactDOM.findDOMNode();
        this.pageModel = new PageModel();
        mapboxgl.accessToken = process.env.MAPBOXGL_ACCESS_TOKEN;

        var bounds = [
            [-74.277191,40.482993],
            [-73.688049,40.925446]
        ];

        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/outdoors-v9',
            center: map.center,
            zoom: map.zoom,
            pitch: 30,
            //maxBounds: bounds
        });

        this.map.on('load', () => {
            this.initMap();
        });
        // TODO: FOr dev purposes ONLY!
        window.map = this.map;

        this.overlays = [];
        this.layers = {};
        this.visibleLayers = [];

        //this.initMouseMove();
    }

    initMap() {
        var { dispatch } = this.props;
        console.log('map loaded');
        //dispatch(actions.setWhereIAm({
            //layer: 'none',
            //page: 0
        //}));
    }

    // When a user clicks on a layer title in the nav bar
    // this get fired to set up the necessary data
    // If they've visited that layer before,
    // then the data will already be stored so we just display what 
    // needs displaying
    initLayer() {
        var { appLocation, map, overlays, dispatch } = this.props;
        var that = this;

        // Start off with a clean slate for this layer
        // hide (don't remove!) all current overlays and layers
        if (this.overlays.length >= 1) {
            this.overlays.forEach((overlay) => {
                overlay.hideLayer();
            });
        }

        // Initialize new layer 
        // construct page structure if necessary
        // Figure out which layer we're on
        switch (appLocation.layer) {
            case 'water':
                if (!this.pageModel.water) {
                    this.pageModel.waterConstructor().then(page => {
                        Object.keys(page.sources).forEach((sourceName) => {
                            var source = page.sources[sourceName];
                            var layer = page.layers[sourceName];

                            if (source.type === 'Point') {
                                that.overlays.push(new PointsOverlay(that.map, source, layer));
                            } else if (source.type === 'Polygon') {
                                that.overlays.push(new PathOverlay(that.map, source, layer));
                            }
                        });
                        that.overlays.forEach((overlay) => {
                            //console.log(overlay);
                            if (overlay.layer.visibleOnPage === appLocation.page && overlay.layer.associatedLayer === appLocation.layer) {
                                overlay.showLayer();
                            }
                        });
                    });
                } else {
                    // show overlays for page 0
                    that.overlays.forEach((overlay) => {
                        //console.log(overlay);
                        if (overlay.layer.visibleOnPage === appLocation.page && overlay.layer.associatedLayer === appLocation.layer) {
                            overlay.showLayer();
                        }
                    });

                }
                break;
            case 'soil':
                break;
        }
    }

    updateLayer() {
        var { appLocation } = this.props;
        var boundingPositions = [];
        //console.log('update data');
        this.overlays.forEach((overlay) => {
            if (overlay.layer.visibleOnPage === appLocation.page && overlay.layer.associatedLayer === appLocation.layer) {
                //console.log('should show this layer', overlay);
                if (overlay.fitBounds) {
                    overlay.fitBounds();
                }
                overlay.showLayer();
            } else {
                overlay.hideLayer();
            }
        });
        // We need to grab the corresponding data from an external 'master'
        // source to tell the app what to do on each specfic layer / page
    }

    setMapPosition() {
        var { map } = this.props;
        this.map.flyTo({
            center: map.center,
            zoom: map.zoom,
            pitch: map.pitch || 0,
            bearing: map.bearing || 0
        });
    }

    componentWillReceiveProps(newProps) {
        //var { layers } = this.props;
        //var newLayers = newProps.layers;
        //Object.keys(layers).forEach((key) => {
            //if(layers[key].visible !== newLayers[key].visible) {
                //console.log('diff', key);
            //}
        //});
    }

    // Less than ideal implementation since this component will update
    // when new data is added or when visibleLayers changes,
    // which are two distinct calls.  I need access to the data,
    // but didn't want to store data on visibleLayers, as to prevent
    // duplication of data
    componentDidUpdate(prevProps) {
        var { visibleLayers, allData } = this.props;
        var previousLayers = prevProps.visibleLayers;

        // find symmetrical difference visibleLayers array
        // see method below
        var diff = symDiff(previousLayers, visibleLayers);

        var that = this;
        if (diff.length > 0) {
            // We only want to change the visibility of the items in diff
            diff.forEach((l) => {
                if (that.layers[l]) {
                    // We've already created an overlay for this layer, so
                    // simply show or hide it

                    // Is the diff layer visible or not?
                    // if visibleLayers no longer contains
                    // the layer we're interested in, hide it
                    // otherwise show it
                    if (visibleLayers.indexOf(l) === -1) {
                        that.layers[l].overlay.hideLayer();
                    } else {
                        that.layers[l].overlay.showLayer();
                    }
                } else {
                    // The overlay hasn't yet been created, so create it
                    // This is kind of dumb, but due to how topojson creates
                    // datastructures, we have to pull out the name of the file 
                    // without the path or the extension, and use that as
                    // a prop on the datastructure
                    console.log(l);
                    if (allData[l].type === 'Topology') {
                        var geometriesName = l.split('/')[1].split('.')[0];
                        that.layers[l] = {
                            key: l,
                            overlay: (allData[l].objects[geometriesName].geometries[0].type === 'Polygon') ? new PathOverlay(that.map, {key: l, data: allData[l]}) : new PointsOverlay(that.map, {key: l, data: allData[l]})
                        };
                    } else {
                        var geometryType = allData[l].features[0].geometry.type;
                        that.layers[l] = {
                            key: l,
                            overlay: geometryType === 'Point' ? new PointsOverlay(that.map, {key: l, data: allData[l]}) : new PathOverlay(that.map, {key: l, data: allData[l] } )
                        };
                    }
                }
            });
        }
    }

    render() {
        return (
            <div id='map'></div>
        );
    }

    // Initialize any mouse events on the map
    // upon initial load.  Unless an event
    // needs to be instantiated with specific
    // data, or requires certain elements to exist,
    // it's safe to do it here
    //initMouseMove() {
        //// When the mouse moves, check for
        //// features, which we'll often just respond
        //// to by showing a popup display,
        //// but the possibilities are quite endless
        //var { dispatch } = this.props;
        //this.map.on('mousemove', (e) => {
            //var { layers } = this.props;

            //// Get features under mouse location (e.point)
            //if (layers) {
                //var features = this.map.queryRenderedFeatures(e.point, {
                    //layers: Object.keys(layers)
                //});
            //}

            //// If we've found some features...
            //// TODO: trigger redux action letting the app know
            //// that a feature has been hovered over
            //if (features.length) {
                //// Grab the first one
                //var feature = features[0];
                ////var layerName = feature.layer.id;

                ////console.log(feature);
                //if (feature.properties.hasPopupContent) {
                    //var content = {
                        //content: feature.properties.popupContent,
                        //pos: e.point
                    //};
                    //dispatch(actions.setPopupContent(feature.properties.popupContent));
                //} else {
                    //dispatch(actions.hidePopup());
                //}
            //} else {
                //dispatch(actions.hidePopup());
            //}
        //});
    //}

}

function mapStateToProps(state) {
    return {
        map:state.map,
        appLocation: state.appLocation,
        visibleLayers: state.visibleLayers,
        allData: state.allData
    };
}

export default connect(mapStateToProps)(Map);

// See - http://stackoverflow.com/questions/30834946/trying-to-solve-symmetric-difference-using-javascript
function symDiff() {
    var sets = [], result = [], LocalSet;
    if (typeof Set === "function") {
        try {
            // test to see if constructor supports iterable arg
            var temp = new Set([1,2,3]);
            if (temp.size === 3) {
                LocalSet = Set;
            }
        } catch(e) {}
    }
    if (!LocalSet) {
        // use teeny polyfill for Set
        LocalSet = function(arr) {
            this.has = function(item) {
                return arr.indexOf(item) !== -1;
            };
        };
    }
    // make copy of arguments into an array
    var args = Array.prototype.slice.call(arguments, 0);
    // put each array into a set for easy lookup
    args.forEach(function(arr) {
        sets.push(new LocalSet(arr));
    });
    // now see which elements in each array are unique 
    // e.g. not contained in the other sets
    args.forEach(function(array, arrayIndex) {
        // iterate each item in the array
        array.forEach(function(item) {
            var found = false;
            // iterate each set (use a plain for loop so it's easier to break)
            for (var setIndex = 0; setIndex < sets.length; setIndex++) {
                // skip the set from our own array
                if (setIndex !== arrayIndex) {
                    if (sets[setIndex].has(item)) {
                        // if the set has this item
                        found = true;
                        break;
                    }
                }
            }
            if (!found) {
                result.push(item);
            }
        });
    });
    return result;
}
