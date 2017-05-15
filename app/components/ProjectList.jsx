import React from 'react';
// import * as redux from 'redux';
// import { connect } from 'react-redux';

// import * as actions from 'app/actions/actions';

import ProjectItem from 'app/components/ProjectItem';

class ProjectList extends React.Component {
    render() {
        const { projectList, showDescriptions } = this.props;
        const show = showDescriptions || false;
        console.log('inside list', show);

        return (
            <ul className='project-list'>
                {projectList.length > 0 && projectList[0].category}
                {projectList.map(prj => <ProjectItem showDescription={show} key={prj.id} project={prj} />)}
            </ul>
        );
    }
}

ProjectList.propTypes = {
    projectList: React.PropTypes.array.isRequired,
    showDescriptions: React.PropTypes.bool
};

export default ProjectList;
