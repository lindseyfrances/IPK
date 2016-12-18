import React from 'react';
// import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
// import $ from 'jquery';

import * as actions from 'app/actions/actions';

class NavItemCategory extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { dispatch, title } = this.props;
        dispatch(actions.toggleCategory(title));
    }

    render() {
        const { title, toggled, style } = this.props;

        const chooseClass = function() {
            if (toggled) {
                return 'nav-item nav-item-toggled';
            }
            return 'nav-item';
        };

        return (
            <div style={style} className={chooseClass()} onClick={this.handleClick}>
                <p>{title}</p>
            </div>
        );
    }
}

NavItemCategory.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    // categories: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    toggled: React.PropTypes.bool
};

export default connect()(NavItemCategory);
