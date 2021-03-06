import React from 'react';
import MapContainer from 'app/components/Map/MapContainer';
import Nav from 'app/components/Nav/Nav';
import { connect } from 'react-redux';

import CategoriesList from 'app/components/CategoriesList/CategoriesList';
import ProjectDetails from 'app/components/ProjectDetails/ProjectDetails';

class Explore extends React.Component {
    constructor(props) {
        super(props);

        // TODO: We want some state here to keep track of the navigation stack of
        // selected projects. So when a user goes back, they go back to the
        // previous item on the stack, rather than back to the main list
        this.state = {
            navStack: []
        };
    }

    render() {
        const { location, projects, selectedProject } = this.props;

        return (
            <div className='page explore-page' >
                <div className='bg-img' />
                <Nav activePath={location.pathname} title='Explore' />
                <div className='explore-content col-2'>
                    <div className='sidebar'>
                        {selectedProject !== '' ?
                            <ProjectDetails dispatch={this.props.dispatch} projects={projects} selectedProject={selectedProject} /> :
                            <CategoriesList />
                        }
                    </div>
                    <MapContainer />
                </div>
            </div>
        );
    }
}

Explore.propTypes = {
    projects: React.PropTypes.object.isRequired,
    selectedProject: React.PropTypes.string.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect(state => ({
    selectedProject: state.selectedProject,
    projects: state.projects
}))(Explore);
