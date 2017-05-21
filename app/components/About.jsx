/*
 * About.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import Nav from 'app/components/Nav/Nav';
import ExternalLink from 'app/components/SimpleElements/ExternalLink';

class About extends React.Component {
    constructor(props) {
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(e) {
        const bg1 = document.getElementById('bg1');
        const bg2 = document.getElementById('bg2');
        let scrollPos = document.documentElement.scrollTop || document.body.scrollTop;

        // Clamp scrollPos value so we can properly map it

        function map(x, inMin, inMax, outMin, outMax) {
            return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
        }

        // Map scrollPos from 0 to 200 ish, to 0 to 1
        bg1.style.opacity = map(scrollPos, 0, 300, 0, 1);
        bg2.style.opacity = map(scrollPos, 0, 300, 1, 0);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        const bg1 = document.getElementById('bg1');
        const bg2 = document.getElementById('bg2');
        bg2.style.opacity = 0;
        bg1.style.opacity = 1;
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (
            <div className='about'>
                <Nav activePath={this.props.location.pathname} title='About' />
                <div id='bg1' className='bg-1'/>
                <div id='bg2' className='bg-2'/>
                <div className='bg-overlay'/>

                <div className='about-content'>
                    <h1>No Free Lunch: Mapping the Food System of New York</h1>
                    <section className='intro'>
                        <h2>Food + The City Working Group at NYU's <ExternalLink url='https://ipk.nyu.edu/'>Institute for Public Knowledge</ExternalLink> (IPK)</h2>
                        <p>This project was first launched through a <ExternalLink url='http://conference.nofreelunchitp.net/'>two-day event</ExternalLink> at the <ExternalLink url='https://tisch.nyu.edu/itp'>Interactive Telecommunications Program</ExternalLink> (ITP) in Tisch in April 2015, sponsored by a Visual Art Initiative Award from the NYU University Arts Council as well as the <ExternalLink url='http://steinhardt.nyu.edu/nutrition/food/ma/'>Food Studies + Nutrition Department</ExternalLink> in Steinhardt.</p>
                        <p>We were then invited to be part of IPK's working group Food + City where we met once a month over the previous two years conceptualizing, workshopping and executing ideas to form the framework of the site you are now on. This is our proof of concept. We have a lot more work to do but what you see here would not have been possible without the following people and there are so many more who are not listed here too many to count:</p>
                        <ul>
                            <li>Krishnendu Ray</li>
                            <li>Stefani Bardin</li>
                            <li>Naama Tamir</li>
                            <li>Marina Zurkow</li>
                            <li>Jamie Charry</li>
                            <li>Sam Sundius</li>
                            <li>Anneke Geyzen</li>
                            <li>Diane Hatz</li>
                            <li>Amanda McDonald Crowley</li>
                            <li>Marco Antonio Castro</li>
                            <li>Siera Dismore</li>
                        </ul>
                    </section>
                    <section>
                        <h2>Guest Speakers Fall 2015 - Spring 2017</h2>
                        <ul>
                            <li>Matthew McDermid from <ExternalLink url='https://www.purpose.com/'>Purpose</ExternalLink></li>
                            <li>Sam Slover from the <ExternalLink url='https://sageproject.com/'>Sage Project</ExternalLink></li>
                            <li>Garrett Broad from <ExternalLink url='http://garrettbroad.webflow.io/'>Fordham University</ExternalLink></li>
                            <li>Howard Silverman from <ExternalLink url='http://pnca.edu/faculty/meet/hsilverman'>Pacific Northwest College of the Arts</ExternalLink></li>
                            <li>Esmail Fadae from the <ExternalLink url='http://hhi.harvard.edu/research'>Harvard Humanitarian Initiative</ExternalLink></li>
                            <li><ExternalLink url='http://joshuajellyschapiro.com/'>Josh Jelly Shapiro</ExternalLink></li>
                            <li><ExternalLink url='http://publicartaction.net/'>Amanda McDonald Crowley</ExternalLink></li>
                            <li><ExternalLink url='http://www.evemosher.com/'>Eve Mosher</ExternalLink></li>
                        </ul>
                    </section>
                    <section>
                        <h2>Website Development & Design</h2>
                        <ul>
                            <li><ExternalLink url='https://jcharry.com'>Jamie Charry</ExternalLink> - Lead Developer + Content Designer</li>
                            <li><ExternalLink url='https://twitter.com/kadallah_'>Kadallah Burrowes</ExternalLink> - Graphic Design + Interface</li>
                            <li><ExternalLink url='http://dhruvdamle.com/'>Dhruv Damle</ExternalLink>, <ExternalLink url='http://www.soyeonchung.com/'>Soy Chung</ExternalLink> - UI/UX</li>
                            <li><ExternalLink url='http://www.michellehessel.com/'>Michelle Hessel Alves</ExternalLink> - Videography</li>
                            <li><ExternalLink url='http://www.juanjoegusquiza.com/'>Juan Jose Egusquiza</ExternalLink> - video, still photography</li>
                            <li><ExternalLink url='http://www.franrodriguezsawaya.com'>Francesca Rodriquez Sawaya</ExternalLink> - sound</li>
                        </ul>
                    </section>

                </div>
            </div>

        );
    }
}

export default About;
