import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
// import $ from 'jquery';
// import mapboxgl from 'mapbox-gl';
// import * as redux from 'redux';
import { connect } from 'react-redux';

import Map from 'app/components/Map/Map';
import MapBanner from 'app/components/Map/MapBanner';
import HoverPopup from 'app/components/HoverPopup';
import Nav from 'app/components/Nav/Nav';
// import SideNav from 'app/components/SideNav';
// import ProjectPanel from 'app/components/ProjectPanel';
// import ProjectList from 'app/components/ProjectList';
import Menu from 'app/components/Menu';
import AddItemForm from 'app/components/AddItemForm';
import Impact from 'app/components/Impact';


import * as actions from 'app/actions/actions';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false,
            bannerExpanded: false,
            impactOpen: false
        };

        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleCloseBanner = this.handleCloseBanner.bind(this);
        this.handleExpandBanner = this.handleExpandBanner.bind(this);
        this.handleOpenForm = this.handleOpenForm.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
        this.toggleImpact = this.toggleImpact.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(actions.startLoading());
    }

    handleCloseMenu() {
        const { dispatch } = this.props;
        dispatch(actions.toggleMenu());
        this.setState({
            showForm: false
        });
    }

    handleOpenForm(e) {
        e.preventDefault();
        this.setState({
            showForm: true
        });
    }

    handleCloseForm(e) {
        e.preventDefault();
        this.setState({
            showForm: false
        });
    }

    handleCloseBanner() {
        const { dispatch } = this.props;
        this.setState({
            bannerExpanded: false
        });
        dispatch(actions.setSelectedProject(''));
    }

    handleExpandBanner() {
        this.setState({
            bannerExpanded: !this.state.bannerExpanded
        });
    }

    toggleImpact() {
        this.setState({
            impactOpen: !this.state.impactOpen
        });
    }

    render() {
        const { isLoading, menu, popup, selectedProject, categories, projects } = this.props;
        const { impactOpen } = this.state;
        console.log(impactOpen);

        const displayLoadingScreen = function() {
            if (isLoading) {
                return (
                    <div className='loading-screen'>
                        <div className='loader' />
                    </div>
                );
            }
            return false;
        };

        let pageClass = 'page-container';
        if (menu || impactOpen) {
            pageClass += ' blurred';
        }
        // TODO: Fix project list
        return (
            <div>
                <div className={pageClass}>
                    <div className='content-container'>
                        <Map
                            categories={categories}
                            selectedProject={selectedProject}
                            containerId={'map'}
                            projects={projects}
                        />
                        <Nav toggleImpact={this.toggleImpact} />
                        {/* <ProjectList categories={categories} projects={projects}  /> */}
                    </div>
                </div>

                {popup.visible && <HoverPopup />}
                {displayLoadingScreen()}
                <ReactTransitionGroup>
                    {menu && <Menu handleClose={this.handleCloseMenu} handleOpenForm={this.handleOpenForm} />}
                </ReactTransitionGroup>
                {this.state.showForm && <AddItemForm handleCloseForm={this.handleCloseForm} />}
                <MapBanner
                    handleClose={this.handleCloseBanner}
                    handleExpand={this.handleExpandBanner}
                    expanded={this.state.bannerExpanded}
                    selectedProjectId={selectedProject}
                    projects={projects}
                    categories={categories}
                />
                <Impact open={impactOpen} toggle={this.toggleImpact} />
            </div>
        );
    }
}

MapContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    categories: React.PropTypes.object.isRequired,
    menu: React.PropTypes.bool.isRequired,
    isLoading: React.PropTypes.bool,
    popup: React.PropTypes.object.isRequired,
    // impactOpen: React.PropTypes.bool.isRequired,
    selectedProject: React.PropTypes.string,
    projects: React.PropTypes.object.isRequired
};

export default connect(state => ({
    isLoading: state.isLoading,
    projects: state.projects,
    //currentCategory: state.currentCategory,
    selectedProject: state.selectedProject,
    categories: state.categories,
    menu: state.menu,
    popup: state.popup
    // impactOpen: state.impactOpen
    //categoriesDescriptors: state.categoriesDescriptors
}))(MapContainer);
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
