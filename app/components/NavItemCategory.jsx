import React from 'react';
import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as actions from 'app/actions/actions';

class NavItemCategory extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        var { dispatch, title, toggled } = this.props;
        console.log('clicked', title);
        dispatch(actions.toggleCategory(title));
    }

    render() {
        var { title, toggled} = this.props;

        const chooseClass = function() {
            if (toggled) {
                return 'nav-item nav-item-toggled';
            } else {
                return 'nav-item';
            }
        };

        return (
            <div className={chooseClass()} onClick={this.handleClick}>
                <p>{title}</p>
            </div>
        );
    }
}

export default connect()(NavItemCategory);
