import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'app/actions/actions';

import triangleup from 'app/images/triangleup.png';
import triangledown from 'app/images/triangledown.png';

class CategoriesList extends React.Component {
    constructor(props) {
        super(props);

        this.handleCategoryClick = this.handleCategoryClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleCategoryClick(event, cat) {
        const { dispatch } = this.props;
        dispatch(actions.toggleCategory(cat));
    }

    handleItemClick(event, id) {
        const { dispatch } = this.props;
        event.stopPropagation();
        dispatch(actions.setSelectedProject(id));
    }

    render() {
        const { categories, projects, selectedProject } = this.props;
        return (
            <div className='categories-list'>
                <div className='intro-text'>
                    <h1>Explore...</h1>
                    <p>...our list of organizations, artists, greenspaces, and more, that are taking the food system into their own hands.</p>
                </div>

                <ul>
                {Object.keys(categories).map(cat => {
                    const prjs = categories[cat].projects;
                    const isVisible = categories[cat].visible;
                    let bgColor = categories[cat].color;
                    if (cat === '') {
                        return;
                    }
                    return (
                        <li key={cat} className={isVisible ? 'category active' : 'category'} onClick={(e) => { this.handleCategoryClick(e, cat) }}>
                            <div className='category-title'>
                                <h3>{cat} ({prjs.length})</h3>
                                <img src={isVisible ? triangleup : triangledown} />
                            </div>
                            <ul>
                                {isVisible && prjs.map(id => {
                                    return <li key={id} className={`${id === selectedProject ? 'active' : ''}`} onClick={e => { this.handleItemClick(e, id) }} key={id}>{projects[id].id.split('').slice(3).join('')}. {projects[id].name}</li>
                                })}
                            </ul>
                        </li>
                    );
                })}
                </ul>
            </div>
        );
    }
}

export default connect(state => ({
    categories: state.categories,
    projects: state.projects,
    selectedProject: state.selectedProject
}))(CategoriesList);
