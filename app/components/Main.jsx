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
        var { whereAmI, dispatch } = this.props;
        var startingLocation = {
            center: [-76.51, 43],
            zoom: 6.5
        };
        dispatch(actions.changeMapPosition(startingLocation));
    }
    render() {
        var { dispatch } = this.props;
        const renderOverlay = () => {
            return (
                <div className='page-overlay'>
                </div>
            );
        }
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
