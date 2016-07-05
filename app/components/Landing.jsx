import React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as actions from 'app/actions/actions';
import LandingPage from 'app/components/LandingPage';

export class Landing extends React.Component {
    constructor(props, context) {
        super(props, context);

        console.log('context', context);
        this.state = {
            pageNumber: 0
        };

        this.handleNextPage = this.handleNextPage.bind(this);
        this.goToMap = this.goToMap.bind(this);
    }

    goToMap(startingLayer) {
        var { dispatch } = this.props;

        hashHistory.push('/map');
        dispatch(actions.setWhereIAm({
            layer: startingLayer,
            page: 0
        }));
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('prev props and state', prevProps, prevState);
    }

    handleNextPage() {
        this.setState({
            pageNumber: this.state.pageNumber += 1
        });
    }

    render() {
        console.log('current page is', this.currentPage);
        return (
            <div>
                <video id='bgvid' autoPlay loop>
                    <source src="https://s3.amazonaws.com/no-free-lunch-data/flyoverny.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <LandingPage page={this.state.pageNumber} goToMap={this.goToMap} switchToNextPage={this.handleNextPage} />
            </div>
        );
    }
}

export default connect()(Landing);

