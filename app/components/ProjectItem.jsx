import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'app/actions/actions';

class ProjectItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const { dispatch, project } = this.props;
        e.preventDefault();
        dispatch(actions.moveToProject(project.id));
        dispatch(actions.setSelectedProject(project.id));
    }
    render() {
        const { project, showDescription } = this.props;
        const show = showDescription || false;
        console.log('inside item', project);

        return (
            <li onClick={this.handleClick}>
                <h3>{project.id.split('').slice(3).join('')}: {project.name}</h3>
                {show && <p>{project.shortDesc}</p>}
            </li>
        );
    }
}

ProjectItem.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    project: React.PropTypes.object.isRequired,
    showDescription: React.PropTypes.bool
};

export default connect()(ProjectItem);
