/*
 * Learn.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import MapContainer from 'app/components/Map/MapContainer';
import Nav from 'app/components/Nav/Nav';

class Learn extends React.Component {
    render() {
        const { router, location } = this.props;
        return (
            <div className='page'>
                <Nav title='Learn' />
                {this.props.children}
            </div>
        );
    }
}

export default Learn;
