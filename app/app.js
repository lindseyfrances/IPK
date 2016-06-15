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
//import PointsOverlay from './components/PointsOverlay.js';

// LAYERS
import Water from './components/Water';

var map = new Map('map');

$('button').click((e) => {
    map.setCenter(-74.0193459, 40.6809955, 12);

    // require.ensure() allows us to load dependencies only when we need them,
    // meaning we can hold off on loading big data sets until they actually
    // need to be displayed
    //require.ensure(['./data/out.json'], (require) => {
        //var data = require('./data/out.json');
        //map.addOverlay('WATER_QUALITY_COMPLAINTS', data);
        ////var pointsOverlay = new PointsOverlay(map.map, map.canvasContainer, data);
    //});
    map.addOverlay('WATER_QUALITY_COMPLAINTS', 'http://localhost:8080/data/WATER_QUALITY_COMPLAINTS.json');
    var reservoirs = require('./data/NYC_RESERVOIR_LOCATIONS.json');
    map.addOverlay('NYC_RESERVOIR_LOCATIONS', reservoirs);

    //var visible = true;
    setTimeout(() => {
        map.removeOverlay('NYC_RESERVOIR_LOCATIONS');
    }, 10000);
    //setInterval(() => {
        //if (visible) {
            //map.overlays['NYC_RESERVOIR_LOCATIONS'].hideLayer();
        //} else {
            //map.overlays['NYC_RESERVOIR_LOCATIONS'].showLayer();
        //}
        //visible = !visible;
    //}, 2000);

});


