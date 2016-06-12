import $ from 'jquery';
var mapboxgl = require('mapbox-gl');

console.log('map incoming');


export default class Map {
    constructor(containerId) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaW10ZWx0bzUwMjE4dmhtNDc0b29yNm9hIn0.pBgBlOL6YOGfKJbvCmTVPg';
        var map = new mapboxgl.Map({
            container: containerId,
            style: 'mapbox://styles/mapbox/light-v9'
        });
    }

    display() {
        console.log('something');
    }

    render() {
        console.log('rendering');
    }
}
