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
                <p>We've hand selected a few key case studies to help make things a bit easier to sift through. Start by Selecting a case study below.</p>
                <div>
                    <Link to='/learn/lighthouse'>
                        <div
                            style={{
                                background: "url('/images/lighthousebrooklyn.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: '50% 50%',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <h2>LIGHTHOUSE RESTAURANT</h2>
                            <p>One restaurant's approach to the tangled web of food.</p>
                        </div>
                    </Link>
                    <Link to='learn/wheat'>
                        <div
                            style={{
                                background: "url('/images/tractor.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: '50% 50%',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <h2>A WHEAT STATE OF MIND</h2>
                            <p>COMING SOON</p>
                        </div>
                    </Link>
                    <Link to='learn/happy-valley'>
                        <div
                            style={{
                                background: "url('/images/happy-cow.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: '50% 50%',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            <h2>HAPPY VALLEY MEATS</h2>
                            <p>COMING SOON</p>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default CaseStudyList;
