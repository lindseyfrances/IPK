/* eslint
    "jsx-a11y/img-has-alt": "off"
*/
import React from 'react';
// import { TransitionMotion, StaggeredMotion, spring } from 'react-motion';
import { connect } from 'react-redux';
// import $ from 'jquery';

import * as actions from 'app/actions/actions';

class TopNavItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const { dispatch, title } = this.props;
        switch (title) {
            case 'labels':
                //dispatch(actions.toggleMapLabels());
                dispatch(actions.toggleMapDisplay('labels'));
                break;
            case 'filter':
                console.log('should open filter');
                break;
            case 'connections':
                console.log('clicked connections');
                dispatch(actions.toggleMapDisplay('connections'));
                //dispatch(actions.toggleMapLines());
                break;
            default:
                break;
        }
    }

    render() {
        const { title, image, mapDisplay } = this.props;

        // const shouldHighlight = mapDisplay[title];
        // TODO: Fix class assignment to be more flexible
        const cls = mapDisplay[title] ? 'top-nav-item top-nav-item-active' : 'top-nav-item';

        return (
            <div className={cls} onClick={this.handleClick}>
                <p>{title}</p>
                {image && <img className='top-nav-img' src={image} />}
            </div>
        );
    }
}

TopNavItem.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired,
    image: React.PropTypes.string,
    mapDisplay: React.PropTypes.object.isRequired
};

export default connect((state) => {
    return {
        mapDisplay: state.mapDisplay
    };
})(TopNavItem);
