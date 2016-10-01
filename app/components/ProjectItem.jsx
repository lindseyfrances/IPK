import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'app/actions/actions';

class ProjectItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
    }

    handleMouseEnter(e) {
        const { dispatch, project } = this.props;
        e.preventDefault();
        dispatch(actions.moveToProject(project.id));
    }
    render() {
        const { project } = this.props;

        return (
            <li>
                <p onMouseEnter={this.handleMouseEnter}>{project.name}</p>
            </li>
        );
    }
}

export default connect()(ProjectItem);
