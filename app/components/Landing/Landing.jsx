import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import bgimg from 'app/images/high-res-food.jpg';

import logo from 'app/images/logo_white.png';

export class Landing extends React.Component {
    render() {
        return (
            <div className='landing'>
                <section className='landing-page landing-1 full-height'>
                    <div className='bg'/>
                    <div className='full-page-centered'>
                        <img src={logo} />
                        <div className='bg-overlay'/>
                        <p>Our food system is a complex machine, ever changing, ever evolving.<br/>We’re here to help you make sense of it all.</p>
                    </div>

                </section>
                <section className='landing-page landing-2 full-height'>
                    <h1>GO SOMEWhere</h1>
                    <ul>
                        <li><Link to='/learn'>
                                <h2>Learn</h2>
                                <p>See the food system through a few hand picked case studies</p>
                        </Link></li>
                        <li><Link to='/explore'>
                                <h2>Explore</h2>
                                <p>Freely search through our entire dataset.</p>
                        </Link></li>
                        <li><Link to='/get-involved'>
                                <h2>Get Involved</h2>
                                <p>Want to get your hands dirty?  Find out what you can do.</p>
                        </Link></li>
                    </ul>
                </section>

            </div>
        );
    }
}

export default connect()(Landing);

