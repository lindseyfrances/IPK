import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import bgimg from 'app/images/high-res-food.jpg';

import logo from 'app/images/logo_white.png';
import soilImg from 'app/images/soil-shovel.jpg';

function Landing() {
    return (
        <div className='landing'>
            <section className='landing-page full-height'>
                <div className='centered'>
                    <div className='bg-overlay'/>
                    <div>
                        <h1>NO FREE LUNCH</h1>
                        <p>OUR FOOD SYSTEM IS A COMPLEX MACHINE.<br/>WE'RE HERE TO HELP YOU MAKE SENSE OF IT ALL.</p>
                    </div>
                    <ul>
                        <li className='button' id='learn-button'>
                            <Link to='/learn'>
                                <h2>LEARN</h2>
                                <p>See the food system through a few hand picked case studies</p>
                            </Link>
                        </li>
                        <li className='button' id='explore-button' className='middle-item'><Link to='/explore'>
                                <h2>EXPLORE</h2>
                                <p>Freely search through our entire dataset.</p>
                        </Link></li>
                        <li className='button' id='engage-button'><Link to='/get-involved'>
                                <h2>ENGAGE</h2>
                                <p>Want to get your hands dirty?  Find out what you can do.</p>
                        </Link></li>
                    </ul>
                </div>
            </section>
        </div>
        );
}

export default Landing;

