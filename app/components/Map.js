import $ from 'jquery';
import PointsOverlay from './PointsOverlay';
var mapboxgl = require('mapbox-gl');

export class Map {
    constructor(containerId) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaW10ZWx0bzUwMjE4dmhtNDc0b29yNm9hIn0.pBgBlOL6YOGfKJbvCmTVPg';
        
        // Render map
        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/light-v9'
        });

        this.overlays = {};

        // Ref to the container elt to be used by d3
        this.canvasContainer = this.map.getCanvasContainer();
    }

    setCenter(lon, lat, zoom, pitch, bearing) {
        this.map.flyTo({
            center: [ lon, lat ],
            zoom: zoom || 5,
            pitch: pitch || 90,
            bearing: bearing || 90
        });
    }

    // Creates a new instance of PointsOverlay,
    addOverlay(overlayName, data) {
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
