import React from 'react';
import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as actions from 'app/actions/actions';

class TopNavItem extends React.Component {
    constructor(props) {
        super(props);

    }

    handleClick(e) {
    }

    render() {
        var { title, toggled, image } = this.props;

        return (
            <div className='top-nav-item' onClick={this.handleClick}>
                <p>{title}</p>
                {image && <img className='top-nav-img' src={image} />}
            </div>
        );
    }
}

export default TopNavItem;
