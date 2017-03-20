import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'app/actions/actions';

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
                <ul>
                {Object.keys(categories).map(cat => {
                    const prjs = categories[cat].projects;
                    const isVisible = categories[cat].visible;
                    let bgColor = categories[cat].color;
                    return (
                        <li key={cat} className={isVisible ? 'category active' : 'category'} onClick={(e) => { this.handleCategoryClick(e, cat) }}>
                            <h2 style={{backgroundColor: bgColor}}>{cat}</h2>
                            <ul>
                                {isVisible && prjs.map(id => {
                                    return <li key={id} className={`${id === selectedProject ? 'active' : ''}`} onClick={e => { this.handleItemClick(e, id) }} key={id}>{projects[id].id}. {projects[id].name}</li>
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
