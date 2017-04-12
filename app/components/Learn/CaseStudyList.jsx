/*
 * Cards.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { Link } from 'react-router';

class Cards extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='case-study-list section-light'>
                <h1>Choose a Case Study</h1>
                <div>
                    <Link to='/learn/lighthouse'>
                        <div className='section-dark'>
                            <h2>Lighthouse</h2>
                            <p>Situated in Brooklyn, Lighthouse touches every aspect of the food system, from sustainable sourcing, to recycling oyster shells and everything in between.</p>
                        </div>
                    </Link>
                    <Link className='section-dark' to='learn/other-case-study'>
                        <div className='section-dark'>
                            <h2>Wheat in New York</h2>
                            <p>Situated in Brooklyn, Lighthouse touches every aspect of the food system, from sustainable sourcing, to recycling oyster shells and everything in between.</p>
                        </div>
            </Link>
                </div>
            </div>
        );
    }
}

export default Cards;
