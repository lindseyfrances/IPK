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
        return (
            <div className='page'>
                <Nav title='Learn' />
                <div className='page-content'>
                    <MapContainer />
                </div>
                <div className='learn-banner'>
                    <h1>Learn some shit</h1>
                </div>
            </div>
        );
    }
}

export default Learn;
