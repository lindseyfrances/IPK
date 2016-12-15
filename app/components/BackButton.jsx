/*
 * BackButton.jsx
 * Copyright (C) 2016 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';

class BackButton extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div onClick={this.props.onClick}>
                <p></p>
            </div>
        );
    }
}

BackButton.propTypes = {
    onClick: React.PropTypes.func.isRequired
};

export default BackButton;
