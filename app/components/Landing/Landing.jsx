import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import bgimg from 'app/images/high-res-food.jpg';

import logo from 'app/images/logo_white.png';
import soilImg from 'app/images/soil-shovel.jpg';

export class Landing extends React.Component {
    render() {
        return (
            <div className='landing'>
                <section className='landing-page landing-1 full-height'>
                    <div className='bg'/>
                    <div className='full-page-centered'>
                        <img className='logo' src={logo} />
                        <div className='bg-overlay'/>
                        <p>OUR FOOD SYSTEM IS A COMPLEX MACHINE.<br/>WE'RE HERE TO HELP YOU MAKE SENSE OF IT ALL.</p>
                    </div>

                </section>
                <section style={{position: 'relative'}} className='landing-page landing-2 full-height'>
                    <div className='section-2-bg' />
                    <div className='bg-overlay'/>
                    {/* <img style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} src={soilImg} /> */}
                    <h1>START HERE</h1>
                    <ul>
                        <li><Link to='/learn'>
                                <h2>LEARN</h2>
                                <p>See the food system through a few hand picked case studies</p>
                        </Link></li>
                        <li><Link to='/explore'>
                                <h2>EXPLORE</h2>
                                <p>Freely search through our entire dataset.</p>
                        </Link></li>
                        <li><Link to='/get-involved'>
                                <h2>GET INVOLVED</h2>
                                <p>Want to get your hands dirty?  Find out what you can do.</p>
                        </Link></li>
                    </ul>
                </section>

            </div>
        );
    }
}

export default connect()(Landing);

