/*
 * CaseStudyList.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { Link } from 'react-router';

class CaseStudyList extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='case-study-list section-light'>
                <h1>Choose a Case Study</h1>
                <p>The food system is complicated. We've hand selected a few key case studies to help make things a bit easier to sift through.  Start by Selecting a case study below.</p>
                <div>
                    <Link to='/learn/lighthouse'>
                        <div className='border-blue-4'>
                            <h2>Lighthouse</h2>
                            <p>Situated in Brooklyn, Lighthouse touches every aspect of the food system, from sustainable sourcing, to recycling oyster shells and everything in between.</p>
                        </div>
                    </Link>
                    <Link to='learn/other-case-study'>
                        <div className='border-blue-4'>
                            <h2>Wheat in New York</h2>
                            <p>Situated in Brooklyn, Lighthouse touches every aspect of the food system, from sustainable sourcing, to recycling oyster shells and everything in between.</p>
                        </div>
            </Link>
                </div>
            </div>
        );
    }
}

export default CaseStudyList;
