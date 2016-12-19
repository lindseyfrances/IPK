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

function fakeDatabaseCall(cb) {
    cb(userData, benefitData);
}
class Impact extends React.Component {
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
        fakeDatabaseCall((userData, benefitData) => {
            console.log('component did mount', userData, benefitData);
            const contributions = [];
            userData.contributions.forEach(contrib => {
                // Get the actual contrib data from the db...
                contributions.push({
                    frequency: contrib.frequency,
                    unit: contrib.unit,
                    ...benefitData[contrib.contribId]
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

            return contrib
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

const benefitData = {
    "58584bb7f36d2873dac5eed1": {
        "_id":{"$oid":"58584bb7f36d2873dac5eed1"},
        "project":"58581b4aa3e9c089e852bea4",
        "projectName":"Sure We Can",
        "type":"donate",
        "benefits":{"baseUnit":"month","baseFreq":1,"benefits":[{"title":"cans","value":60,"unit":"cans","desc":"Recycled","quantitative":true}]}
    },
    "58584bd6f36d2873dac5eee5": {
        "_id":{"$oid":"58584bd6f36d2873dac5eee5"},
        "project":"58581b4aa3e9c089e852bea4",
        "projectName":"Sure We Can",
        "type":"compost",
        "benefits":{
            "baseUnit":"week",
            "baseFreq":1,
            "benefits":[{
                "title":"compost",
                "value":6,
                "unit":"lbs",
                "desc":"diverted food waste",
                "quantitative":true
            }]
        }
    },
    "58584cb3f36d2873dac5ef59": {
        "_id":{"$oid":"58584cb3f36d2873dac5ef59"},
        "project":"58581b4aa3e9c089e852be97",
        "projectName":"Lighthouse Restaurant",
        "type":"eat",
        "benefits":{
            "baseUnit":"wk",
            "baseFreq":"1",
            "benefits":[
                {
                    "title":"oystershells",
                    "value":1,
                    "unit":"lb",
                    "desc":"recyled oyster shells",
                    "quantitative":true
                },
                {
                    "title":"sustainableseafood",
                    "quantitative":false,
                    "desc":"Contribute to sustainably caught fish"
                },
                {
                    "title":"waste",
                    "quantitative":true,
                    "value":1,
                    "unit":"lb",
                    "desc":"diverted food waste"
                },
                {
                    "title":"meat",
                    "quantitative":false,
                    "desc":"Support grass-fed and pasture raised meat"
                }
            ]
        }
    },
    "58584cd1f36d2873dac5ef5d": {
        "_id":{"$oid":"58584cd1f36d2873dac5ef5d"},
        "project":"58581b4aa3e9c089e852beb8",
        "projectName":"Billion Oyster Project",
        "type":"volunteer",
        "benefits":{"baseUnit":"month","baseFreq":1,"benefits":[{"title":"oysters","value":100,"unit":"oysters","desc":"Restored","quantitative":true}]}
    },
    "58584d00f36d2873dac5ef7f": {
        "_id":{"$oid":"58584d00f36d2873dac5ef7f"},
        "project":"58581b4aa3e9c089e852bea4",
        "projectName":"Sure We Can",
        "type":"volunteer",
        "benefits":{
            "baseUnit":"month",
            "baseFreq":1,
            "benefits":[
                {
                    "title":"surewecan",
                    "quantitative":false,
                    "desc":"Maintain community space, compost project, garden, and more"
                }
            ]
        }
    }
};

const userData = {
    "_id": {
        "$oid": "58584e56f36d2873dac5efe9"
    },
    "username": "jcharry",
    "password": "password",
    "contributions": [
        {
            "contribId": "58584bb7f36d2873dac5eed1",
            "frequency": 1,
            "unit": "month"
        },
        {
            "contribId": "58584bd6f36d2873dac5eee5",
            "frequency": 1,
            "unit": "week"
        },
        {
            "contribId": "58584cb3f36d2873dac5ef59",
            "frequency": 1,
            "unit": "week"
        },
        {
            "contribId": "58584cd1f36d2873dac5ef5d",
            "frequency": 1,
            "unit": "month"
        }
    ]
};
