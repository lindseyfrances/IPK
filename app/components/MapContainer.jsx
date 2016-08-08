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
import ProjectList from 'app/components/ProjectList';


import * as actions from 'app/actions/actions';

class MapContainer extends React.Component {

    componentDidMount() {
        var { appLocation, dispatch } = this.props;

        //dispatch(actions.startAddMapLayers());

    }
    render() {
        var { dispatch, isLoading, projects, currentCategory } = this.props;
        console.log('re-render');

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

        const shouldShowMap = function() {
            // look through projects, find the first item
            // that has the same category as the currently
            // selected category, then look up
            // if it has map coords.  If not
            // show the secondary content page
            let firstPrj;
            Object.keys(projects).some((prj) => {
                firstPrj = prj;
                return projects[prj].category === currentCategory;
            });

            if (!projects[firstPrj].latitude) {
                return false;
            } else {
                return true;
            }
        };

        var showMap = shouldShowMap();
        console.log(showMap);

        return (
            <div>
                <Map shouldShow={showMap} containerId={'map'} />
                <ProjectList  shouldShow={!showMap}/>
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
        isLoading: state.isLoading,
        projects: state.projects,
        currentCategory: state.currentCategory
    };
})(MapContainer);
/*
*/
