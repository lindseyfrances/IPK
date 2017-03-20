import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

export class Landing extends React.Component {
    render() {
        return (
            <div className='landing'>
                <h1>NO FREE LUNCH</h1>
                <p>Our food system is a complex machine, ever chaning, ever evolving.<br/>We’re here to help you make sense of it all.</p>
                <ul>
                    <li><Link to='learn'>
                        <h2>Learn</h2>
                        <p>See the food system through a few hand picked case studies</p>
                    </Link></li>
                    <li><Link to='explore'>
                        <h2>Explore</h2>
                        <p>Freely search through our entire dataset.</p>
                    </Link></li>
                    <li><Link to='get-involved'>
                        <h2>Get Involved</h2>
                        <p>Want to get your hands dirty?  Find out what you can do.</p>
                    </Link></li>
                </ul>
            </div>
        );
    }
}

export default connect()(Landing);

