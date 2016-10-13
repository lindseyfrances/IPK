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
    }
    render() {
        const { project } = this.props;

        return (
            <li>
                <p onClick={this.handleClick}>{project.name}</p>
            </li>
        );
    }
}

export default connect()(ProjectItem);
