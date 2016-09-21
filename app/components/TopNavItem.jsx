import React from 'react';
import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
import $ from 'jquery';

import * as actions from 'app/actions/actions';

class TopNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        let { dispatch, title } = this.props;
        switch (title) {
            case 'labels':
                dispatch(actions.toggleMapLabels());
                break;
            case 'filter':
                console.log('should open filter');
                break;
            default:
                break;
        }
    }

    render() {
        var { title, image, showLabels } = this.props;

        let cls = showLabels && title === 'labels' ? 'top-nav-item top-nav-item-active' : 'top-nav-item';

        return (
            <div className={cls} onClick={this.handleClick}>
                <p>{title}</p>
                {image && <img className='top-nav-img' src={image} />}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        showLabels: state.showLabels
    };
})(TopNavItem);
