import React from 'react';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import * as redux from 'redux';
import { connect } from 'react-redux';

import Map from 'app/components/Map';
//import PointsOverlay from './components/PointsOverlay.js';
import HoverPopup from 'app/components/HoverPopup';
import Nav from 'app/components/Nav';
import SideNav from 'app/components/SideNav';


import * as actions from 'app/actions/actions';

class MapContainer extends React.Component {

    componentDidMount() {
        var { appLocation, dispatch } = this.props;
        //var startingLocation = {
            //center: [-76.51, 43],
            //zoom: 14
        //};


        dispatch(actions.startAddMapLayers());

        //dispatch(actions.changeMapPosition(startingLocation));
        //var layers = {
            //NYC_RESERVOIRS: {
                //name: 'NYC Reservoirs',
                //id: 'NYC_RESERVOIRS',
                //dataUrl: 'https://s3.amazonaws.com/no-free-lunch-data/data/NYC_RESERVOIRS.json',
                //data: null
            //},
            //WBDHU8: {
                //name: 'NYState Watershed Boundaries',
                //id: 'WBDHU8',
                //dataUrl: 'https://s3.amazonaws.com/no-free-lunch-data/data/WBDHU8.json',
                //data: null
            //},
            //WATER_QUALITY_COMPLAINTS: {
                //name: '311 Water Quality Complaints',
                //id: 'WATER_QUALITY_COMPLAINTS',
                //dataUrl: 'https://s3.amazonaws.com/no-free-lunch-data/WATER_QUALITY_COMPLAINTS.json',
                //data: null
            //}
        //};
        //dispatch(actions.addNavLayers(layers));
    }
    render() {
        var { dispatch, isLoading } = this.props;
        const renderOverlay = () => {
            return (
                <div className='page-overlay'>
                </div>
            );
        };

        const displayLoadingScreen = function() {
            if (isLoading) {
                return (
                    <div className='loading-screen'>
                        <h1 style={{color: 'white'}}>Loading data</h1>
                    </div>
                );
            }
            else return;
        };
        return (
            <div>
                <Map containerId={'map'} />
                <SideNav />
                {/*<Nav />*/}
                <HoverPopup />
                {displayLoadingScreen()}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        appLocation: state.appLocation,
        isLoading: state.isLoading
    };
})(MapContainer);
/*
*/
