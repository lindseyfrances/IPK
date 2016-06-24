import React from 'react';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import * as redux from 'redux';
import { connect } from 'react-redux';

import Map from 'app/components/Map';
//import PointsOverlay from './components/PointsOverlay.js';
import HoverPopup from 'app/components/HoverPopup';
import Nav from 'app/components/Nav';

import * as actions from 'app/actions/actions';

class Main extends React.Component {

    componentDidMount() {
        //var map = new Map('map', location);
        var { whereAmI, dispatch } = this.props;
        var startingLocation = {
            center: [-76.51, 43],
            zoom: 6.5
        };

        dispatch(actions.changeMapPosition(startingLocation));

        //setTimeout(function() {
            //dispatch(actions.startAddOverlay({
                //id: 'WBDHU8',
                //type: 'path',
                //data: window.location.href + 'data/WBDHU8.json',
                //visible:true,
                //hover: false

            //}));
        //}, 6000);

            //dispatch(actions.setWhereIAm({
                //...whereAmI,
                //page: whereAmI.page++
            //}));
            //dispatch(actions.changeMapPosition({
                //center: [-74.0193459, 40.6809955], 
                //zoom: 12,
                //pitch: 60, 
                //bearing: 60
            //}));
            //dispatch(actions.startAddOverlay({
                //id: 'WATER_QUALITY_COMPLAINTS',
                //type: 'point',
                //data: window.location.href + 'data/WATER_QUALITY_COMPLAINTS.json',
                //visible: true,
                //hover: true
            //}));
            //dispatch(actions.startAddOverlay({
                //id: 'NYC_RESERVOIR_LOCATIONS',
                //type: 'point',
                //data: window.location.href + 'data/NYC_RESERVOIR_LOCATIONS.json',
                //visible: true,
                //hover: true
            //}));
    }
    render() {
        var { dispatch } = this.props;
        return (
            <div>
                <Map containerId={'map'} />
                {/*<SideNav />*/}
                <Nav />
                <HoverPopup />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        whereAmI: state.whereAmI
    };
})(Main);
/*
*/
