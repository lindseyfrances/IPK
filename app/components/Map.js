import $ from 'jquery';
var mapboxgl = require('mapbox-gl');

export class Map {
    constructor(containerId) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaW10ZWx0bzUwMjE4dmhtNDc0b29yNm9hIn0.pBgBlOL6YOGfKJbvCmTVPg';
        
        // Render map
        this.map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/light-v9'
        });

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

    onPan() {
        console.log('panning');
    }

    //render() {
        //console.log('render');
        //this.map = new mapboxgl.Map({
            //container: 'map',
            //style: 'mapbox://styles/mapbox/light-v9'
        //});
    //}
}

export default Map;
