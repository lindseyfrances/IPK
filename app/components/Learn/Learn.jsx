/*
 * Learn is a container element that simply renders
 * it's children passed through the router.
 *
 * It's wrapped in a 'page' class for correct styling
 *
 * What we should see:
 * 1. List of case studies
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
