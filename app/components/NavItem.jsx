import React from 'react';
import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';

import * as actions from 'app/actions/actions';

class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleMouseOver(e) {
        var { dispatch, id, shouldShowPopup } = this.props;
        dispatch(actions.setHoverProject(id));
        if (shouldShowPopup) {
            dispatch(actions.showPopupWithProject(id, {x: e.clientX, y: e.clientY}));
        }
    }
    handleMouseOut(e) {
        var { dispatch, id, shouldShowPopup } = this.props;
        dispatch(actions.removeHoverProject());
        if (shouldShowPopup) {
            dispatch(actions.hidePopup());
        }
    }
    render() {
        var { title, hovered } = this.props;

        const chooseClass = function() {
            if (hovered) {
                return 'nav-item nav-item-hovered';
            } else {
                return 'nav-item';
            }
        };

        return (
            <p className={chooseClass()} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>{title}</p>
        );
    }
}

export default connect()(NavItem);
