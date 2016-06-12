//import $ from 'jquery';

//// import styles
//import './styles/app.scss';

// ------------------------------
// COMPONENTS
// ------------------------------
//import Map from './components/Map';
//console.log(Map);

import mapboxgl from 'mapbox-gl';
console.log(mapboxgl);
mapboxgl.accessToken = 'pk.eyJ1IjoiamNoYXJyeSIsImEiOiJjaW10ZWx0bzUwMjE4dmhtNDc0b29yNm9hIn0.pBgBlOL6YOGfKJbvCmTVPg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
    center: [-74.50, 40], // starting position
    zoom: 9 // starting zoom
});

//console.log('loaded');

////var map = new Map('mapContainer');
////console.log('map instance', map);
////map.render();
////console.log('stuff');

//$('body').append('<p>woo</p>');
//$('body').append('<button>hi</button>');
