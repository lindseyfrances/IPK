/*
 * Logo.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { Link } from 'react-router';
import logo from 'app/images/logo.png';

const Logo = props =>
    <Link className='logo' to={props.to}>
        <img src={`/${logo}`} alt='Logo - click to go home' />
    </Link>;


Logo.defaultProps = {
    to: '/'
};

Logo.propTypes = {
    to: React.PropTypes.string
};

export default Logo;
