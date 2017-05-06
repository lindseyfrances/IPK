import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { connect } from 'react-redux';

import Map from 'app/components/Map/Map';
// import MapBanner from 'app/components/Map/MapBanner';
// import HoverPopup from 'app/components/HoverPopup';
// import Nav from 'app/components/Nav/Nav';
// import Menu from 'app/components/Menu';
// import AddItemForm from 'app/components/AddItemForm';
// import Impact from 'app/components/Impact';
// import BackButton from 'app/components/BackButton';
import LoadingOverlay from 'app/components/LoadingOverlay';

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
        // this.handleCloseBanner = this.handleCloseBanner.bind(this);
        // this.handleExpandBanner = this.handleExpandBanner.bind(this);
        this.handleOpenForm = this.handleOpenForm.bind(this);
        this.handleCloseForm = this.handleCloseForm.bind(this);
        this.toggleImpact = this.toggleImpact.bind(this);
        this.handleBack = this.handleBack.bind(this);
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

    // handleCloseBanner() {
    //     const { dispatch } = this.props;
    //     this.setState({
    //         bannerExpanded: false
    //     });
    //     dispatch(actions.setSelectedProject(''));
    // }

    // handleExpandBanner() {
    //     this.setState({
    //         bannerExpanded: !this.state.bannerExpanded
    //     });
    // }

    toggleImpact() {
        this.setState({
            impactOpen: !this.state.impactOpen
        });
    }

    handleBack() {
        const { dispatch } = this.props;
        dispatch(actions.setSelectedProject(''));
    }

    render() {
        const { dataIsLoading, isLoading, menu, popup, selectedProject, categories, projects } = this.props;
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

        return (
            <div className='map-container'>
                <Map
                    categories={categories}
                    selectedProject={selectedProject}
                    containerId='explore-map'
                    projects={projects}
                />
                <LoadingOverlay waitFor={[isLoading, dataIsLoading]}/>
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
    projects: React.PropTypes.object.isRequired,
    dataIsLoading: React.PropTypes.bool.isRequired
};

export default connect(state => ({
    isLoading: state.isLoading,
    projects: state.projects,
    //currentCategory: state.currentCategory,
    selectedProject: state.selectedProject,
    categories: state.categories,
    menu: state.menu,
    popup: state.popup,
    dataIsLoading: state.dataIsLoading
    // impactOpen: state.impactOpen
    //categoriesDescriptors: state.categoriesDescriptors
}))(MapContainer);
