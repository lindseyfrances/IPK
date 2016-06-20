import React from 'react';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import * as redux from 'redux';
import { connect } from 'react-redux';

import Map from './Map';
//import PointsOverlay from './components/PointsOverlay.js';
import HoverPopup from './HoverPopup';

import Water from './Water';
import * as actions from './../actions/index';

class Main extends React.Component {

    componentDidMount() {
        //var map = new Map('map', location);
        var { dispatch } = this.props;

        $('button').click((e) => {
            dispatch(actions.changeMapPosition({
                center: [-74.0193459, 40.6809955], 
                zoom: 12,
                pitch: 60, 
                bearing: 60
            }));

            dispatch(actions.startAddOverlay({
                id: 'WATER_QUALITY_COMPLAINTS',
                type: 'point',
                data: window.location.href + 'data/WATER_QUALITY_COMPLAINTS.json',
                visible: true
            }));
            dispatch(actions.startAddOverlay({
                id: 'NYC_RESERVOIR_LOCATIONS',
                type: 'point',
                data: window.location.href + 'data/NYC_RESERVOIR_LOCATIONS.json',
                visible: true
            }));
        });
    }
    render() {
        console.log(this.props);
        var startingLocation = {
            center: [-74.0193459, 40.6809955],
            zoom: 5
        };
        return (
            <div>
                <Map containerId={'map'}/>
                <button id='button'>click me</button>
                <HoverPopup />
            </div>
        );
    }
}

export default connect()(Main);
/*
*/
