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

//import $ from 'jquery';
//import _ from 'underscore';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

import * as actions from 'app/actions/actions';

// Types of overlays
import PointsOverlay from 'app/overlays/PointsOverlay';
import PathOverlay from 'app/overlays/PathOverlay';

// Page controller
import PageModel from 'app/models/PageModel';

class Map extends React.Component {
    componentDidMount() {
        var { whereAmI, containerId, map, dispatch } = this.props;
        this.elt = ReactDOM.findDOMNode();
        this.pageModel = new PageModel();
        mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaW10ZWx0bzUwMjE4dmhtNDc0b29yNm9hIn0.pBgBlOL6YOGfKJbvCmTVPg';
        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/light-v9',
            center: map.center,
            zoom: map.zoom
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
        dispatch(actions.setWhereIAm({
            layer: 'none',
            page: 0
        }));
    }

    // When a user clicks on a layer title in the nav bar
    // this get fired to set up the necessary data
    // If they've visited that layer before,
    // then the data will already be stored so we just display what 
    // needs displaying
    initLayer() {
        var { whereAmI, map, layers, overlays, dispatch } = this.props;
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
        switch (whereAmI.layer) {
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
                            console.log(overlay);
                            if (overlay.layer.visibleOnPage === whereAmI.page && overlay.layer.associatedLayer === whereAmI.layer) {
                                overlay.showLayer();
                            }
                        });
                    });
                } else {
                    // show overlays for page 0
                    that.overlays.forEach((overlay) => {
                        console.log(overlay);
                        if (overlay.layer.visibleOnPage === whereAmI.page && overlay.layer.associatedLayer === whereAmI.layer) {
                            overlay.showLayer();
                        }
                    });

                }
                break;
            case 'soil':
                break;
        }
        console.log('overlays are ', this.overlays);
    }

    updateLayer() {
        var { whereAmI } = this.props;
        var boundingPositions = [];
        console.log('update data');
        this.overlays.forEach((overlay) => {
            if (overlay.layer.visibleOnPage === whereAmI.page && overlay.layer.associatedLayer === whereAmI.layer) {
                console.log('should show this layer', overlay);
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

    componentDidUpdate(prevProps) {
        var { whereAmI, map, overlays, dispatch } = this.props;
        console.log(prevProps);

        //if (_.isEqual(whereAmI, prevProps.whereAmI)) return;

        // if the current map position doesn't match
        // what's in the store, then move back to the stored location
        if (map.center !== this.map.getCenter()) {
            this.setMapPosition();
        }

        // Upon initialization, when the user hasn't selected a layer
        // just set the map to it's home position
        if (whereAmI.layer === 'none') {
            console.log('layer = none, nothing to do');
            this.setMapPosition();
            return;
        }

        // If the user initialized a layer, i.e. the layer isn't 'none',
        // then check what page we're on
        if (whereAmI.page === 0) {  // <-- we're on the first page, initialize
            this.initLayer();
        } else {    // <-- we're not on the first page!
            this.updateLayer();
        }


        return;
        // if we're at page 0, reset things
        //if (whereAmI.page === 0) {
        //this.initLayer();
        //return;
        //}
        //else {
        //if (overlays.length) {
        //overlays.forEach((overlay) => {
        //if (this.map.getSource(overlay.id)) {
        //console.log('Source exists, do nothing');
        //} else {
        //switch(overlay.type) {
        //case 'point':
        //this.overlays[overlay.id] = new PointsOverlay(this.map, overlay,{ dispatch: dispatch });
        //break;
        //case 'path':
        //this.overlays[overlay.id] = new PathOverlay(this.map, overlay, {dispatch: dispatch, hover: false });
        //break;
        //default:
        //break;
        //}
        //}
        //});
        //}
        //}
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
    initMouseMove() {
        // When the mouse moves, check for
        // features, which we'll often just respond
        // to by showing a popup display,
        // but the possibilities are quite endless
        var { dispatch } = this.props;
        this.map.on('mousemove', (e) => {
            var { layers } = this.props;

            // Get features under mouse location (e.point)
            if (layers) {
                var features = this.map.queryRenderedFeatures(e.point, {
                    layers: Object.keys(layers)
                });
            }

            // If we've found some features...
            // TODO: trigger redux action letting the app know
            // that a feature has been hovered over
            if (features.length) {
                // Grab the first one
                var feature = features[0];
                //var layerName = feature.layer.id;

                console.log(feature);
                if (feature.properties.hasPopupContent) {
                    var content = {
                        content: feature.properties.popupContent,
                        pos: e.point
                    };
                    dispatch(actions.setPopupContent(feature.properties.popupContent));
                } else {
                    dispatch(actions.hidePopup());
                }
            } else {
                dispatch(actions.hidePopup());
            }
        });
    }

    // Reset the center of the map
    // Simply utilize mapbox gl flyTo, which smoothly
    // flies to new location

    // Creates a new instance of PointsOverlay,
    //addOverlay(overlayName, data, paintFunc) {
    //console.log('adding overlay');
    //this.overlays[overlayName] = new PointsOverlay(this.map, data);
    //console.log('current overlays', this.overlays);
    //}

    // Completely remove the instance of PointsOverlay
    // Sometimes it might be better to hide, rather
    // than completely remove
    //removeOverlay(overlayName) {
    //console.log('removing overlay completely', overlayName);
    //this.overlays[overlayName].removeLayer();
    //this.overlays[overlayName].removeSource();
    //delete this.overlays[overlayName];
    //}

    //onPan() {
    //console.log('panning');
    //}
}

export default connect((state) => {
    return {
        map: state.map,
        //overlays: state.overlays,
        //layers: state.layers,
        whereAmI: state.whereAmI
    };
})(Map);


