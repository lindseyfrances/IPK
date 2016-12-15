/*
 * Impact.jsx
 * Copyright (C) 2016 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import BackButton from 'app/components/BackButton';
import { connect } from 'react-redux';

import { closeImpact } from 'app/actions/actions';

class Impact extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
    }

    close() {
        const { dispatch } = this.props;
        dispatch(closeImpact());
    }

    render() {
        const { impactOpen } = this.props;
        const className = impactOpen ? 'impact open' : 'impact closed';
        return (
            <div className={`impact-container${impactOpen ? ' open' : ' closed'}`}>
                <div className={className}>
                    <BackButton onClick={this.close} />
                    Impact
                </div>
            </div>
        );
    }
}

Impact.propTypes = {
    impactOpen: React.PropTypes.bool.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect((state) => {
    return {
        impactOpen: state.impactOpen
    };
})(Impact);
