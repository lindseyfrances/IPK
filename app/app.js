// Client side modules
import d3 from 'd3';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import * as redux from 'redux';

// REDUX
import configureStore from './store/configureStore';

// I know this is bad practice, housing the store globally
// but for now it makes my life easier
window.store = configureStore();
var unsubscribe = store.subscribe(() => {
    // When the state changes...
})

// Main styles
import './styles/main.scss';

// ------------------------------
// COMPONENTS
// ------------------------------
import Map from './components/Map';
//import PointsOverlay from './components/PointsOverlay.js';
import HoverPopup from './components/HoverPopup';
var hoverPopup = new HoverPopup();


// LAYERS
import Water from './components/Water';

var startingLocation = {
    center: [-74.0193459, 40.6809955],
    zoom: 5
}
var map = new Map('map', location);

$('button').click((e) => {
    map.setCenter(-74.0193459, 40.6809955, 12, 60, 60);

    // require.ensure() allows us to load dependencies only when we need them,
    // meaning we can hold off on loading big data sets until they actually
    // need to be displayed
    //require.ensure(['./data/out.json'], (require) => {
        //var data = require('./data/out.json');
        //map.addOverlay('WATER_QUALITY_COMPLAINTS', data);
        ////var pointsOverlay = new PointsOverlay(map.map, map.canvasContainer, data);
    //});
    console.log(window.location.href);
    var paintFunc = () => {
        return {
            'circle-radius': 10,
            'circle-color': '#bafbaf'
        };
    };

    map.addOverlay('WATER_QUALITY_COMPLAINTS', window.location.href + 'data/WATER_QUALITY_COMPLAINTS.json');
    var reservoirs = require('./data/NYC_RESERVOIR_LOCATIONS.json');
    map.addOverlay('NYC_RESERVOIR_LOCATIONS', reservoirs);

    //var visible = true;
    //setTimeout(() => {
        //map.removeOverlay('NYC_RESERVOIR_LOCATIONS');
    //}, 10000);
    //setInterval(() => {
        //if (visible) {
            //map.overlays['NYC_RESERVOIR_LOCATIONS'].hideLayer();
        //} else {
            //map.overlays['NYC_RESERVOIR_LOCATIONS'].showLayer();
        //}
        //visible = !visible;
    //}, 2000);

});


