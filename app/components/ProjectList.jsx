import React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';

import * as actions from 'app/actions/actions';

import ProjectItem from 'app/components/ProjectItem';

class ProjectList extends React.Component {
    render() {
        var { categories, projects } = this.props;

        let visibleCategories = Object.keys(categories).filter(key => {
            if (categories[key]) return key;
        });

        let visibleProjectIds = Object.keys(projects).filter(prjId => {
            let prj = projects[prjId];
            if (visibleCategories.indexOf(prj.category) !== -1) {
                return true;
            }
        });

        return (
            <ol className='project-list'>
                {visibleProjectIds.map(id => {
                    return <ProjectItem key={id} project={projects[id]} />;
                })}
            </ol>
        );
    }
}

export default connect((state) => {
    return {
        categories: state.categories,
        projects: state.projects

    };
})(ProjectList);
