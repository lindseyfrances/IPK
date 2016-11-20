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

    handleClick(e) {
        const { dispatch, title } = this.props;
        e.preventDefault();
        console.log('clicked', title);
        dispatch(actions.toggleCategory(title));
    }

    render() {
        const { title, categories } = this.props;

        const chooseClass = function() {
            if (categories[title] === true) {
                return 'nav-item nav-item-toggled';
            }
            return 'nav-item';
        };

        return (
            <div className={chooseClass()} onClick={this.handleClick}>
                <p>{title}</p>
            </div>
        );
    }
}

NavItemCategory.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    categories: React.PropTypes.object.isRequired
};

export default connect((state) => {
    return {
        categories: state.categories
    };
})(NavItemCategory);
