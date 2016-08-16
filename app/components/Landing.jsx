import React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import $ from 'jquery';

import * as actions from 'app/actions/actions';
import LandingPage from 'app/components/LandingPage';

import CardList from 'app/components/CardList';
export class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1 
        };

        this.handleNextPage = this.handleNextPage.bind(this);
        this.goToMap = this.goToMap.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.removeScrollHandler = this.removeScrollHandler.bind(this);
        this.currentTop = 0;
    }

    goToMap(startingLayer) {
        var { dispatch } = this.props;

        hashHistory.push('/map');
        dispatch(actions.setWhereIAm({
            layer: startingLayer,
            page: 0
        }));
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        //window.removeEventListener('scroll', this.handleScroll);
    }

    handleNextPage() {
        this.setState({
            pageNumber: this.state.pageNumber += 1
        });
    }

    componentDidUpdate(prevPros, prevState) {
        var { pageNumber } = this.state;
        
        if (pageNumber !== prevState.pageNumber) {
            var nextElt = document.getElementsByClassName('landing-P'+pageNumber)[0];
            this.currentTop = nextElt.offsetTop;
            $('body').animate({
                scrollTop: nextElt.offsetTop
            }, 1000);
        }
    }

    handleScroll(e) {
        var { pageNumber } = this.state;

        if (window.scrollY - this.currentTop > 100 && pageNumber < document.getElementsByClassName('page').length) {
            this.setState({
                pageNumber: pageNumber + 1
            });

            this.removeScrollHandler(1000);
        } else if (window.scrollY - this.currentTop < -100 && pageNumber > 1) {
            this.setState({
                pageNumber: pageNumber - 1
            });

            this.removeScrollHandler(1000);
        }
    }

    removeScrollHandler(time) {
        window.removeEventListener('scroll', this.handleScroll);
        setTimeout(() => {
            window.addEventListener('scroll', this.handleScroll);
        }, time + 10);
    }

    // Render Cards
    render() {
        return (
            <div className='landing'>
                <div className='landing-P1 page'>
                    <div className='landing-title full-page'>
                        <div>
                            <h1>No Free Lunch</h1>
                            <p>Food and the City</p>
                        </div>
                        <div>
                            <p>A geographical exploration of artists, activists, and local companies dedicated to improving the food system throughout New York City</p>
                        </div>
                    </div>
                </div>
                <div className='landing-P2 page' ref={(e) => {return this.p2 = e;}}>
                    <h1>Select a category to start exploring</h1>
                    <CardList />
                </div>
            </div>
        );
    }
}

export default connect()(Landing);

