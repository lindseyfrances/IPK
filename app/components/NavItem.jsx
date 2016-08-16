import React from 'react';
import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as actions from 'app/actions/actions';

class NavItem extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        var { dispatch, id } = this.props;
        console.log('clicked', id);
        dispatch(actions.setSelectedProject(id));
    }

    handleMouseOver(e) {
        var { dispatch, id, shouldShowPopup } = this.props;
        dispatch(actions.setHoverProject(id));
        if (shouldShowPopup) {
            // Figure out where the top left of the content container is
            dispatch(actions.showPopupWithProject(id, {x: 150, y: 200}));
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
            <p className={chooseClass()} onClick={this.handleClick.bind(this)} onTouchEnd={this.handleClick.bind(this)} onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>{title}</p>
        );
    }
}

export default connect()(NavItem);
