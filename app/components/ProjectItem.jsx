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
        dispatch(actions.moveToProject(project._id));
        dispatch(actions.setSelectedProject(project._id));
    }
    render() {
        const { project, showDescription } = this.props;
        const show = showDescription || false;
        console.log('inside item', show);

        return (
            <li onClick={this.handleClick}>
                <p>{project.name}</p>
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
