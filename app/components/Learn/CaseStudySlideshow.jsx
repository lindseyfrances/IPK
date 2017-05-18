/*
 * CaseStudySlideshow.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { caseStudies } from './caseStudyData';
import { connect } from 'react-redux';
import * as actions from 'app/actions/actions';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const NEXT = 'next';
const LAST = 'last';
const NUM_PAGES = 3;

class CaseStudySlideshow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };

        this.pageWillAppear = this.pageWillAppear.bind(this);
        this.pageDidAppear = this.pageDidAppear.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        setTimeout(() => {
            dispatch(actions.closeNav());
        }, 2000);
    }

    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(actions.openNav());
    }

    changePage(dir) {
        let nextPage = this.state.currentPage;
        switch (dir) {
            case NEXT:
                nextPage = nextPage + 1 > NUM_PAGES ? 1 : nextPage + 1;
                break;
            case LAST:
                nextPage = nextPage - 1 < 1 ? NUM_PAGES : nextPage - 1;
                break;
            default:
                break;
        }

        this.setState({
            currentPage: nextPage
        });
    }

    pageWillAppear(e) {
        console.log(e);
        console.log('page appearing');
    }

    pageDidAppear(e) {
        console.log(e);
    }

    componentWillAppear(e) {
        console.log('component appearing', e);
    }

    render() {
        const caseStudy = caseStudies[this.props.id];
        const backgroundStyle = {
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
        };
        const pageStyle = {
            margin: 0,
            padding: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: 'opacity 0.5s ease-in-out'
        }

        function reverseNotInPlace(arr) {
            let newArr = [];
            for (let i = arr.length - 1; i >= 0; i--) {
                newArr.push(arr[i]);
            }
            return newArr;
        }

        return (
            <div className='slideshow'>
                <div className='page-stack' >
                    <CSSTransitionGroup
                        transitionName='page-animation'
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={300}
                    >
                        {reverseNotInPlace(caseStudy.pages).map(page => {
                        if (page.pageNumber >= this.state.currentPage) {
                            return (
                                <div
                                    key={`page${page.pageNumber}`}
                                    style={{
                                        ...pageStyle,
                                        background: `url(${page.backgroundImage})`,
                                        ...backgroundStyle
                                    }}
                                    className='slideshow-page'
                                >
                                    {page.content.map((content, i) => {
                                        return (
                                            <p key={i}>{content.text}</p>
                                        );
                                    })}
                                </div>
                            );
                        }
                        })}
                    </CSSTransitionGroup>
                </div>

                <button className='arrow last' onClick={() => this.changePage(LAST)}>prev</button>
                <button className='arrow next' onClick={() => this.changePage(NEXT)}>next</button>
            </div>
        );
    }
}

CaseStudySlideshow.propTypes = {
    id: React.PropTypes.string.isRequired
};

export default connect()(CaseStudySlideshow);
