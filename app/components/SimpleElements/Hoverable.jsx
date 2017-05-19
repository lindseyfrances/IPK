/*
 * TextWithHover.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'app/actions/actions';

/*
 * XXX: This is SUPER wonky...but I need to finish it in
 * 2 days, so fuck it.
*/
class Hoverable extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseOver(e) {
        const { dispatch, id } = this.props;
        const point = {x: e.clientX, y: e.clientY};
        dispatch(actions.setSlideShowPopupContent(id, point));
    }

    handleMouseLeave() {
        const { dispatch } = this.props;
        dispatch(actions.hideSlideShowPopup());
    }
    render() {
        return (
            <span onMouseLeave={this.handleMouseLeave} onMouseOver={this.handleMouseOver} className='hoverable-text'>{this.props.children}</span>
        );
    }
}

export default connect()(Hoverable);
