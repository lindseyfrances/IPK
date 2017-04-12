/*
 * LighthouseIntroduction.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { Link } from 'react-router';
import { caseStudies } from '../data/casestudies';
import NodeList from '../NodeList';
import MapCore from '../../Map/MapCore';
import downArrow from '../../../images/down-arrow.png';

export default () =>
    <div className='case-study-intro-content'>
        <div style={{height: `${window.innerHeight - 60}px`}}>
            <div className='top-panel'>
                <MapCore mapData={caseStudies.lighthouse.mapData} />
            </div>
            <div className='bottom-panel section-dark'>
                <h1>Introduction: Lighthouse Restaurant</h1>
                <p>Of all the restaurants in New York City, why have we chosen this little Williamsburg spot to single out?  Lighthouse exemplifies what it means to participate in your food system.  Each leg of the tangled web that is the food system is carefully considered, from sourcing local ingredients, to recycling oyster shells, Lighthouse models what a sustainable restaurant can be.</p>
                <img onClick={() => {
                        let elt = document.getElementById('intro-section-2');
                        function animate() {
                            console.log('animating');
                            let id = window.requestAnimationFrame(animate);
                            if (window.scrollY >= elt.offsetHeight) {
                                window.cancelAnimationFrame(id);
                            } else {
                                window.scrollBy(0, 25);
                            }
                        }
                        animate();
                    }}
                    src={downArrow} alt='scroll to next page'/>
            </div>
        </div>
        <div id='intro-section-2' className='section-light min-full-height'>
            <h1>Meet Lighthouse</h1>
            <div className='video-wrapper'>
                <iframe src="https://player.vimeo.com/video/143381669" width="100%" frameBorder="0" allowFullScreen />
            </div>
            <h1>Explore the food system</h1>
            <p>Lighthouse touches a wide range of the food system.  Choose a branch to start learning how the food system works, and how Lighthouse is working to make a difference.</p>
            <NodeList nodes={caseStudies.lighthouse.stories} />
        </div>
    </div>;
