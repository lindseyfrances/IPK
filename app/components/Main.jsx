import React from 'react';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import * as redux from 'redux';
import { connect } from 'react-redux';

import Map from './Map';
//import PointsOverlay from './components/PointsOverlay.js';
import HoverPopup from './HoverPopup';

import Water from './Water';
class Main extends React.Component {

    componentDidMount() {
        var startingLocation = {
            center: [-74.0193459, 40.6809955],
            zoom: 5
        };
        var map = new Map('map', location);

        $('button').click((e) => {
            map.setCenter(-74.0193459, 40.6809955, 12, 60, 60);

            map.addOverlay('WATER_QUALITY_COMPLAINTS', window.location.href + 'data/WATER_QUALITY_COMPLAINTS.json');
            //var reservoirs = require('./data/build/NYC_RESERVOIR_LOCATIONS.json');
            map.addOverlay('NYC_RESERVOIR_LOCATIONS', window.location.href + 'data/NYC_RESERVOIR_LOCATIONS.json');
        });
    }
    render() {
        return (
            <div>
                <div id='map'></div>
                <button id='button'>click me</button>
                <HoverPopup />
            </div>
        );
    }
}

export default connect()(Main);
/*
*/
