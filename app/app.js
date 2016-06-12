import $ from 'jquery';

// import styles
//import 'style!css!sass!applicationStyles';
//require('/components/app.scss');
//require('./styles/app.scss');
import './styles/app.scss';


// ------------------------------
// COMPONENTS
// ------------------------------
import Map from './components/Map';

console.log('loaded');

var map = new Map('map');
console.log('map instance', map);
map.render();
//console.log('stuff');

//$('body').append('<p>woo</p>');
//$('body').append('<button>hi</button>');
