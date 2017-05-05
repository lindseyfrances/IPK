/*
 * BackButton.jsx
 * Copyright (C) 2016 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';

function BackButton(props) {
    return (
        <div className='back-button' onClick={props.onClick} />
        );
}

BackButton.propTypes = {
    onClick: React.PropTypes.func.isRequired
};

export default BackButton;
