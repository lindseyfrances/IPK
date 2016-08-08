import React from 'react';
import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';

import * as actions from 'app/actions/actions';

class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleMouseOver(e) {
        var { dispatch, id } = this.props;
        dispatch(actions.setHoverProject(id));
        this._elt.style.opacity = 0.5;
    }
    handleMouseOut(e) {
        var { dispatch, id } = this.props;
        dispatch(actions.removeHoverProject(id));
        this._elt.style.opacity = 1;
    }
    render() {
        var { title } = this.props;

        return (
            <div onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)} ref={(c) => { this._elt = c;}}>{title}</div>
        );
    }
}

export default connect()(NavItem);
