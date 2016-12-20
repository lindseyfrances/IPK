/* eslint
    "quote-props": "off",
    "quotes": "off"
*/
/*
 * Impact.jsx
 * Copyright (C) 2016 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import BackButton from 'app/components/BackButton';

import { userData, benefitData } from 'app/data/build/contributions';

function fakeDatabaseCall(cb) {
    cb(userData, benefitData);
}
class Impact extends React.Component {
    // TODO: Create real databases -> and api calls on the server side
    // to get user info
    constructor(props) {
        super(props);

        this.handleFrequencyChange = this.handleFrequencyChange.bind(this);
        this.state = {
            contributions: []
        };
    }

    componentDidMount() {
        // Make database call
        // FIXME: This is all hacky -> it'll take some thinking to get
        // everything squared away nicely...
        // Here's where we kinda of maybe make a database call to get
        // all the contributions that this user is connected to
        // BUT we have to cache any results so that we dont' make tons
        // of db calls, considering this item renders, like, a million
        // times, or we could do the call in componentDidMount so it
        // only goes out once... Either way, a problem for another day
        fakeDatabaseCall((user, benefits) => {
            console.log('component did mount', user, benefits);
            const contributions = [];
            user.contributions.forEach(contrib => {
                // Get the actual contrib data from the db...
                contributions.push({
                    frequency: contrib.frequency,
                    unit: contrib.unit,
                    ...benefits[contrib.contribId]
                });
            });

            this.setState({
                contributions
            });
        });
    }

    handleFrequencyChange(e) {
        console.log(e.target);
        const id = e.target.getAttribute('data-id');
        console.log(id);

        const newContributions = this.state.contributions.map(contrib => {
            if (contrib._id.$oid === id) {
                return {
                    ...contrib,
                    frequency: e.target.value
                };
            }

            return contrib;
        });

        this.setState({
            contributions: newContributions
        });
    }

    render() {
        // Fake 'Benefits' Data
        // Assume that we get this back from a database of possible
        // contributions

        const { open, toggle } = this.props;
        // TODO: right now grabbing $oid off _id -> that wont' work for a real
        // mLab collection
        return (
            <div className={`impact-container ${open ? 'open' : 'closed'}`}>
                <div className={`impact ${open ? 'open' : 'closed'}`}>
                    <BackButton onClick={toggle} />
                    <div className='impact-content'>
                        <h2>My Impact</h2>
                        <ul className='impact-list'>
                            {this.state.contributions.map(contrib =>
                                <li key={contrib._id.$oid} className='impact-item'>
                                    <button className='button'>Edit</button>
                                    <div>
                                        <h3>{contrib.projectName}</h3>
                                        <p>I {contrib.type} <input type='number' data-id={contrib._id.$oid} value={contrib.frequency} onChange={this.handleFrequencyChange} /> time(s) per {contrib.unit}</p>
                                    </div>
                                    <div>
                                        <h3>Results</h3>
                                        {contrib.benefits.benefits.map(benefit => {
                                            if (benefit.quantitative) {
                                                return (
                                                    <div key={benefit.title}>
                                                        <p>{benefit.value * contrib.frequency} {benefit.unit} {benefit.desc}</p>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <div key={benefit.title}>
                                                    <p>{benefit.desc}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                    <button className='light-button'>Save Changes</button>
                </div>
            </div>
        );
    }
}

Impact.propTypes = {
    open: React.PropTypes.bool.isRequired,
    toggle: React.PropTypes.func.isRequired
};

export default Impact;
