import React from 'react';
// import * as redux from 'redux';
import { connect } from 'react-redux';

// import * as actions from 'app/actions/actions';

import ProjectItem from 'app/components/ProjectItem';

class ProjectList extends React.Component {
    render() {
        const { categories, projects } = this.props;

        const visibleCategories = Object.keys(categories).filter((key) => {
            // categories[key] holds a boolean value denoting whether it's
            // visible or not
            if (categories[key]) {
                return true;
            }
            return false;
        });

        const visibleProjectIds = Object.keys(projects).filter((prjId) => {
            const prj = projects[prjId];
            if (visibleCategories.indexOf(prj.category) !== -1) {
                return true;
            }
            return false;
        });

        return (
            <ol className='project-list'>
                {visibleProjectIds.map((id) => {
                    return <ProjectItem key={id} project={projects[id]} />;
                })}
            </ol>
        );
    }
}

ProjectList.propTypes = {
    projects: React.PropTypes.object.isRequired,
    categories: React.PropTypes.object.isRequired
};

export default connect((state) => {
    return {
        categories: state.categories,
        projects: state.projects

    };
})(ProjectList);
