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

    }
    render() {
        var { dispatch, isLoading, projects, currentCategory, selectedProject, categoriesDescriptors } = this.props;
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

            if (currentCategory === '') {
                return false;
            }
            // TODO: This is pretty inefficient, but 
            // the project list is small enough that it won't really
            // make a difference
            
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

            if (projects[firstPrj].mappable === 'N') {
                return false;
            } else {
                return true;
            }
        };

        var showMap = shouldShowMap();
        console.log(showMap);

        const renderProjectPanel = function() {
            if (selectedProject !== '') {
                return <ProjectPanel dispatch={dispatch} selectedProject={projects[selectedProject]} currentCategory={currentCategory} shouldShow={true}/>;
            } else {
                return;
            }
        };
        return (
            <div>
                <div className='page-container'> 
                    <SideNav />
                    <div className='content-container'>
                        <Map shouldShow={showMap} containerId={'map'} />
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
        projects: state.projects,
        currentCategory: state.currentCategory,
        selectedProject: state.selectedProject,
        categoriesDescriptors: state.categoriesDescriptors
    };
})(MapContainer);
/*
*/
