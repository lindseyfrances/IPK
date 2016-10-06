import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import $ from 'jquery';
import mapboxgl from 'mapbox-gl';
import * as redux from 'redux';
import { connect } from 'react-redux';

import Map from 'app/components/Map';
import HoverPopup from 'app/components/HoverPopup';
import Nav from 'app/components/Nav';
import SideNav from 'app/components/SideNav';
import ProjectPanel from 'app/components/ProjectPanel';
import ProjectList from 'app/components/ProjectList';
import Menu from 'app/components/Menu';



import * as actions from 'app/actions/actions';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleCloseMenu = this.handleCloseMenu.bind(this);
    }

    componentDidMount() {
        var { dispatch } = this.props;
        dispatch(actions.startLoading());
    }

    handleCloseMenu() {
        const { dispatch } = this.props;
        dispatch(actions.toggleMenu());
    }
    render() {
        var { categories, dispatch, isLoading, menu } = this.props;
        console.log('re-render');

        let topNavItems = ['filter', 'labels', 'connections'];

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

        let pageClass = menu ? 'page-container blurred' : 'page-container';
        console.log(menu);
        return (
            <div>
                <div className={pageClass}>
                    <div className='content-container'>
                        <Map containerId={'map'} />
                        <Nav pos='bottom' leftHeader='Categories' items={categories}/>
                        <Nav leftHeader='Map Options' items={topNavItems} pos='top'/>
                        <ProjectList />
                    </div>
                </div>

                <HoverPopup />
                {displayLoadingScreen()}
                <ReactTransitionGroup>
                    {menu && <Menu handleClose={this.handleCloseMenu}/>}
                </ReactTransitionGroup>
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
        menu: state.menu
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
