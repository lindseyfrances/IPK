import $ from 'jquery';
var mapboxgl = require('mapbox-gl');

mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaW10ZWx0bzUwMjE4dmhtNDc0b29yNm9hIn0.pBgBlOL6YOGfKJbvCmTVPg';
map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9'
});

export default class Map {
    constructor(containerId) {
        this.containerId = containerId;
    }

    display() {
        console.log('something');
    }

    render() {
        console.log('rendering');
    }
}
