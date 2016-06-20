import $ from 'jquery';
import _ from 'underscore';
import * as actions from '../actions/index';
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import PointsOverlay from './PointsOverlay';
import PathOverlay from './PathOverlay';

var mapboxgl = require('mapbox-gl');

class Map extends React.Component {
    componentDidMount() {
        var { startingLocation, containerId, map } = this.props;
        this.elt = ReactDOM.findDOMNode();
        mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaW10ZWx0bzUwMjE4dmhtNDc0b29yNm9hIn0.pBgBlOL6YOGfKJbvCmTVPg';
        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/light-v9',
            center: map.center || [-74.0193459, 40.6809955],
            zoom: map.zoom || 6
        });
        window.map = this.map;

        this.overlays = [];
        //this.layers = [];

        this.initMouseMove();
    }

    componentDidUpdate(prevProps) {
        var { map, overlays, dispatch } = this.props;

        // Should the map fly somewhere?
        //if (!_.isEqual(prevProps.map, map)) {
            //console.log(map);
            console.log('map pos changed');
            this.map.flyTo({
                center: map.center,
                zoom: map.zoom || 5,
                pitch: map.pitch || 0,
                bearing: map.bearing || 0
            });
        //}

        // Should we display overlays?
        if (overlays.length) {
            overlays.forEach((overlay) => {
                if (this.map.getSource(overlay.id)) {
                    console.log('Source exists, do nothing');
                } else {
                    switch(overlay.type) {
                        case 'point':
                            this.overlays.push(new PointsOverlay(this.map, overlay));
                            dispatch(actions.addLayer({ id: overlay.id, visible: true}));
                            break;
                        case 'path':
                            this.overlays.push(new PathOverlay(this.map, overlay));
                            break;
                        default:
                            break;
                    }
                    //dispatch(actions.addLayer({
                        //id: overlay.id + '-hover',
                        //visible: false
                    //}));
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
                    //dispatch(actions.showPopup());
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
        overlays: state.overlays,
        layers: state.layers
    };
})(Map);


