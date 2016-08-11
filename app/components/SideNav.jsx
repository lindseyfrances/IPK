import React from 'react';
import { connect } from 'react-redux';

import { toggleSideNav } from './../actions/actions';
import NavItem from 'app/components/NavItem';

import * as actions from 'app/actions/actions';
import { filterProjectsByCategory } from 'app/api/helpers';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.leftPos = {
            left: 0
        };
        this.width = 280;
    }

    componentDidUpdate() {
        this.width = this.refs.sideNav.offsetWidth;
    }

    render() {
        var { dispatch, sideNavOpen, categories, projects, currentCategory, hoveredProject } = this.props;

        // Either display the top level list of categories,
        // or the list of projects corresponding to whatever
        // category was selected
        const renderProjectItemsByCategory = function() {

            // If currentCategory === '', show the list of selectable
            // categories
            if (currentCategory === '') {
                return categories.map((cat) => {
                    return <p className='menu-item' key={cat} onClick={() => {dispatch(actions.setCurrentCategory(cat));}}>{cat}</p>;
                });
            }

            // If a category has been selected - Filter projects by category
            let filteredProjects = filterProjectsByCategory(projects, currentCategory);
            return filteredProjects.map((prj) => {
                return <NavItem shouldShowPopup={prj.mappable === 'Y'} hovered={hoveredProject === prj.id} key={prj.id} title={prj.name} id={prj.id} />;
            });
        };

        // Only render back button if currentCategory is not an empty string
        // Conditionally render Nav header based on current Category
        // if necessary, render projects by filtering them
        return (
            <div className='side-nav' ref='sideNav'>
                {currentCategory !== '' && <button className='menu-back-btn' onClick={() => {dispatch(actions.setCurrentCategory(''));}}>x</button>}
                <h1 className='menu-header'>{currentCategory || 'Select a Category'}</h1>
                {renderProjectItemsByCategory()}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        sideNavOpen: state.sideNavOpen,
        categories: state.categories,
        projects: state.projects,
        currentCategory: state.currentCategory,
        hoveredProject: state.hoveredProject
    };
})(SideNav);
