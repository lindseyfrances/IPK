import React from 'react';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import * as redux from 'redux';
import { connect } from 'react-redux';

import Map from 'app/components/Map';
import HoverPopup from 'app/components/HoverPopup';
import Nav from 'app/components/Nav';
import SideNav from 'app/components/SideNav';
import ProjectPanel from 'app/components/ProjectPanel';


import * as actions from 'app/actions/actions';

class MapContainer extends React.Component {

    componentDidMount() {
        var { dispatch } = this.props;
        dispatch(actions.startLoading());
    }

    render() {
        var { categories, dispatch, isLoading } = this.props;
        console.log('re-render');

        let topNavItems = ['filter', 'labels'];

        const displayLoadingScreen = function() {
            if (isLoading) {
                return (
                    <div className='loading-screen'>
                        <div className='loader'></div>
                    </div>
                );
            }
            else return;
        };

        return (
            <div>
                <div className='page-container'>
                    <div className='content-container'>
                        <Map containerId={'map'} />
                        <Nav pos='bottom' leftHeader='Categories' items={categories}/>
                        <Nav leftHeader='Map Options' items={topNavItems} pos='top'/>
                    </div>
                </div>

                <HoverPopup />
                {displayLoadingScreen()}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoading: state.isLoading,
        //projects: state.projects,
        //currentCategory: state.currentCategory,
        //selectedProject: state.selectedProject,
        categories: state.categories,
        //categoriesDescriptors: state.categoriesDescriptors
    };
})(MapContainer);
/*
*/
/*
                        <div className='no-map' style={{visibility: showMap ? 'hidden' : 'visible'}}>
                            <img src={require('app/images/bg1.png')} />
                            {(() => {
                                    if (currentCategory === '') {
                                        return <h1>No Free Lunch</h1>;
                                    } else {
                                        return <p>{categoriesDescriptors[currentCategory]}</p>;
                                    }
                                })()}
                        </div>
                        {renderProjectPanel()}
                        */
