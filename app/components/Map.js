import $ from 'jquery';
import PointsOverlay from './PointsOverlay';
import * as actions from '../actions/index';

var mapboxgl = require('mapbox-gl');

export class Map {
    constructor(containerId, startingLocation) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaW10ZWx0bzUwMjE4dmhtNDc0b29yNm9hIn0.pBgBlOL6YOGfKJbvCmTVPg';
        
        // Render map
        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/light-v9',
            center: startingLocation.center || [-74.0193459, 40.6809955],
            zoom: startingLocation.zoom || 6
        });

        this.overlays = {};

        // Ref to the container elt to be used by d3
        this.canvasContainer = this.map.getCanvasContainer();
        this.initEvents();
    }

    // Initialize any mouse events on the map
    // upon initial load.  Unless an event
    // needs to be instantiated with specific
    // data, or requires certain elements to exist,
    // it's safe to do it here
    initEvents() {
        // When the mouse moves, check for
        // features, which we'll often just respond
        // to by showing a popup display,
        // but the possibilities are quite endless
        this.map.on('mousemove', (e) => {
            // Capture all layers to check for features
            var layers = [];
            for (var key in this.overlays) {
                layers.push(this.overlays[key].sourceName);
            }

            // Get features under mouse location (e.point)
            var features = this.map.queryRenderedFeatures(e.point, {
                layers: Object.keys(this.overlays).map((item) => {
                    return this.overlays[item].sourceName;
                })
            });

            // If we've found some features...
            // TODO: trigger redux action letting the app know
            // that a feature has been hovered over
            if (features.length) {
                // Grab the first one
                var feature = features[0];
                var layerName = feature.layer.id;

                console.log(feature);
                if (feature.properties.hasPopupContent) {
                    var content = {
                        content: feature.properties.popupContent,
                        pos: e.point
                    };
                    store.dispatch(actions.setPopupContent(feature.properties.popupContent));
                    store.dispatch(actions.showPopup());
                }
            } else {
                store.dispatch(actions.hidePopup());
            }
        });
    }

    // Reset the center of the map
    // Simply utilize mapbox gl flyTo, which smoothly
    // flies to new location
    setCenter(lon, lat, zoom, pitch, bearing) {
        this.map.flyTo({
            center: [ lon, lat ],
            zoom: zoom || 5,
            pitch: pitch || 0,
            bearing: bearing || 0
        });
    }

    // Creates a new instance of PointsOverlay,
    addOverlay(overlayName, data, paintFunc) {
        console.log('adding overlay');
        this.overlays[overlayName] = new PointsOverlay(this.map, data);
        console.log('current overlays', this.overlays);
    }

    // Completely remove the instance of PointsOverlay
    // Sometimes it might be better to hide, rather
    // than completely remove
    removeOverlay(overlayName) {
        console.log('removing overlay completely', overlayName);
        this.overlays[overlayName].removeLayer();
        this.overlays[overlayName].removeSource();
        delete this.overlays[overlayName];
    }

    onPan() {
        console.log('panning');
    }
}

export default Map;
