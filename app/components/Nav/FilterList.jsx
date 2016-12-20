/*
 * FilterList.jsx
 * Copyright (C) 2016 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { connect } from 'react-redux';
import { TransitionMotion, spring, presets } from 'react-motion';

class FilterList extends React.Component {
    constructor(props) {
        super(props);

    }
    getDefaultStyles() {
        const { items } = this.props;
        return Object.keys(items).map(cat =>
            ({
                data: cat,
                key: cat,
                style: {
                    height: 0,
                    opacity: 0
                }
            })
        );
    }


    getStyles() {
        const { items } = this.props;
        return Object.keys(items).map(cat =>
            ({
                data: cat,
                key: cat,
                style: {
                    height: spring(40, presets.noWobble),
                    opacity: spring(1, presets.gentle)
                }
            })
        );
    }

    willEnter() {
        return {
            height: 0,
            opacity: 0
        };
    }

    willLeave() {
        return {
            height: spring(0),
            opacity: spring(0)
        };
    }

    render() {
        return (
            <TransitionMotion
                defaultStyles={this.getDefaultStyles()}
                styles={this.getStyles()}
                willLeave={this.willLeave}
                willEnter={this.willEnter}
            >
                {styles =>
                    <div className='filter-list'>
                        {styles.map(({ key, style, data }) =>
                            <p key={key} style={style} id={data.id}>{data}</p>
                        )}
                    </div>
                }
            </TransitionMotion>
        );
    }
}

export default connect()(FilterList);
