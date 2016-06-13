// Client side modules
import d3 from 'd3';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';

// Server side modules

// Main styles
import './styles/main.scss';

// ------------------------------
// COMPONENTS
// ------------------------------
import Map from './components/Map';
import PointsOverlay from './components/PointsOverlay.js';

var map = new Map('map');
setTimeout(() => {
    console.log('flying!');
}, 6000);

$('button').click((e) => {
    map.setCenter(-74.0193459, 40.6809955, 12);

    // require.ensure() allows us to load dependencies only when we need them,
    // meaning we can hold off on loading big data sets until they actually
    // need to be displayed
    require.ensure(['./data/out.json'], (require) => {
        var data = require('./data/out.json');
        var pointsOverlay = new PointsOverlay(map.map, map.canvasContainer, data);
    });
});
console.log('bye');
console.log('bye');

