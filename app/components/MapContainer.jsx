import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
// import $ from 'jquery';
// import mapboxgl from 'mapbox-gl';
// import * as redux from 'redux';
import { connect } from 'react-redux';

import Map from 'app/components/Map';
import HoverPopup from 'app/components/HoverPopup';
import Nav from 'app/components/Nav';
// import SideNav from 'app/components/SideNav';
// import ProjectPanel from 'app/components/ProjectPanel';
import ProjectList from 'app/components/ProjectList';
import Menu from 'app/components/Menu';
import AddItemForm from 'app/components/AddItemForm';


import * as actions from 'app/actions/actions';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false
        };

        this.handleCloseMenu = this.handleCloseMenu.bind(this);
        this.handleOpenForm = this.handleOpenForm.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
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

    render() {
        const { categories, isLoading, menu, popup } = this.props;
        //console.log('re-render');

        const topNavItems = ['filter', 'labels', 'connections'];

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

        const pageClass = menu ? 'page-container blurred' : 'page-container';
        return (
            <div>
                <div className={pageClass}>
                    <div className='content-container'>
                        <Map containerId={'map'} />
                        <Nav pos='bottom' leftHeader='Categories' items={categories} />
                        <Nav leftHeader='Map Options' items={topNavItems} pos='top' />
                        <ProjectList />
                    </div>
                </div>

                {popup.visible && <HoverPopup />}
                {displayLoadingScreen()}
                <ReactTransitionGroup>
                    {menu && <Menu handleClose={this.handleCloseMenu} handleOpenForm={this.handleOpenForm} />}
                </ReactTransitionGroup>
                {this.state.showForm && <AddItemForm handleCloseForm={this.handleCloseForm} />}
            </div>
        );
    }
}

MapContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    categories: React.PropTypes.object.isRequired,
    menu: React.PropTypes.bool.isRequired,
    isLoading: React.PropTypes.bool,
    popup: React.PropTypes.object.isRequired
};

export default connect((state) => {
    return {
        isLoading: state.isLoading,
        //projects: state.projects,
        //currentCategory: state.currentCategory,
        //selectedProject: state.selectedProject,
        categories: state.categories,
        menu: state.menu,
        popup: state.popup
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
