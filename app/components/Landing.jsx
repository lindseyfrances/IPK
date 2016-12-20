/* global document window */
import React from 'react';
// import * as redux from 'redux';
import { connect } from 'react-redux';
// import { hashHistory } from 'react-router';
import { Link } from 'react-router';
import $ from 'jquery';

// import * as actions from 'app/actions/actions';
// import LandingPage from 'app/components/LandingPage';

// import CardList from 'app/components/CardList';
export class Landing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1
        };

        this.handleNextPage = this.handleNextPage.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.removeScrollHandler = this.removeScrollHandler.bind(this);
        this.currentTop = 0;
    }

    componentDidMount() {
        //window.addEventListener('scroll', this.handleScroll);
    }

    componentDidUpdate(prevPros, prevState) {
        const { pageNumber } = this.state;

        if (pageNumber !== prevState.pageNumber) {
            const nextElt = document.getElementsByClassName(`landing-P${pageNumber}`)[0];
            this.currentTop = nextElt.offsetTop;
            $('body').animate({
                scrollTop: nextElt.offsetTop
            }, 1000);
        }
    }

    componentWillUnmount() {
        //window.removeEventListener('scroll', this.handleScroll);
    }

    handleNextPage() {
        this.setState({
            pageNumber: this.state.pageNumber += 1
        });
    }


    handleScroll() {
        const { pageNumber } = this.state;

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
                <div className='landing-p1'>
                    <div className='landing-title full-page'>
                        <div className='bg'>
                            <img className='landing-bg' src='http://travelnoire.com/wp-content/uploads/2014/12/o-NEW-YORK-CITY-WRITER-facebook.jpg' alt='homepage background' />
                        </div>
                        <div>
                            <h1>No Free Lunch</h1>
                            <p>Food and the City</p>
                        </div>
                        <div>
                            <p>A geographical exploration of artists, activists, and local companies dedicated to improving the food system throughout New York City</p>
                        </div>
                    </div>
                </div>
                <div className='landing-p2 full-page' ref={(e) => { this.p1 = e; }}>
                    <div>
                        {/*<button onClick={() => {this.goTo('story');}}>What is the food system?</button>*/}
                        {/*<button onClick={() => {this.goTo('map');}}>How can you get involved?</button>*/}
                        {/*<button onClick={() => {this.goTo('impact');}}>Measure your impact.</button>*/}
                        <Link to='/map'>Map</Link>
                    </div>
                    {/*<CardList />*/}
                </div>
            </div>
        );
    }
}

export default connect()(Landing);

