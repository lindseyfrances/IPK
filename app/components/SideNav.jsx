import React from 'react';
import { connect } from 'react-redux';

import { toggleSideNav } from './../actions/actions';
import LayerList from 'app/components/LayerList';
import NavItem from 'app/components/NavItem';

import * as actions from 'app/actions/actions';

var rightArrow = require('./../images/rightarrow.png');
var leftArrow = require('./../images/leftarrow.png');
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
        var { dispatch, sideNavOpen, categories, projects, currentCategory } = this.props;

        
        // set left position of side bar, 'style' expects
        // an object of css styles
        //this.leftPos = sideNavOpen ?  { right: 0 } : { right: -this.width + 50 + 'px' };
        this.leftPos = {right: 0};
        function whichArrow() {
            return sideNavOpen ? rightArrow : leftArrow;
        }

        var renderLayerLists = () => {
            return categories.map((cat) => {
                return <LayerList key={cat} title={cat} category={cat} />;
            });
        };

        const renderProjectItemsByCategory = function() {
            if (currentCategory === '') {
                return categories.map((cat) => {
                    return <div key={cat} onClick={() => {dispatch(actions.setCurrentCategory(cat));}}>{cat}</div>;
                });
            }
            let filteredProjects = [];
            Object.keys(projects).forEach((prj) => {
                if (projects[prj].category === currentCategory) {
                    filteredProjects.push(<NavItem key={prj} title={projects[prj].name} id={projects[prj].id} />);
                }
            });

            return filteredProjects;
        };

        return (
            <div className='side-nav' style={this.leftPos} ref='sideNav'>
                {currentCategory !== '' && <button onClick={() => {dispatch(actions.setCurrentCategory(''));}}>Back</button>}
                <h1>{currentCategory}</h1>
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
        currentCategory: state.currentCategory
    };
})(SideNav);
