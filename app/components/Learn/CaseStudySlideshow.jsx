/*
 * CaseStudySlideshow.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'app/actions/actions';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { caseStudies, slideshowPopupContent } from './caseStudyData';
import CaseStudySlideshowPopup from 'app/components/Learn/CaseStudySlideshowPopup';
import LoadingOverlay from 'app/components/LoadingOverlay';

import arrowRight from '../../images/rightarrow.png';
import arrowLeft from '../../images/leftarrow.png';

const NEXT = 'next';
const LAST = 'last';
const NUM_PAGES = caseStudies.wheat.pages.length;

class CaseStudySlideshow extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = this.props;

        this.state = {
            currentPage: 1
        };
        dispatch(actions.dataIsLoading(true));

        this.pageWillAppear = this.pageWillAppear.bind(this);
        this.pageDidAppear = this.pageDidAppear.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        setTimeout(() => {
            dispatch(actions.dataIsLoading(false));
            setTimeout(() => {
                dispatch(actions.closeNav());
            }, 2000);
        }, 5000);
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

    getTextStyle(content) {
        const styles = {
            position: 'absolute',
            maxWidth: '300px'
        };

        const horizontalMargin = '90px';
        const verticalMargin = '70px';
        switch (content.loc) {
            case 'top-left':
                styles.left = horizontalMargin;
                styles.top = verticalMargin;
                break;
            case 'top-middle':
                styles.left = '30%';
                styles.top = verticalMargin;
                break;
            case 'top-right':
                styles.right = horizontalMargin;
                styles.top = verticalMargin;
                break;
            case 'middle-left':
                styles.top = '45%';
                styles.left = horizontalMargin;
                break;
            case 'middle-middle':
                styles.top = '45%';
                styles.left = '45%';
                break;
            case 'middle-right':
                styles.right = horizontalMargin;
                styles.textAlign = 'right';
                styles.top = '45%';
                break;
            case 'bottom-left':
                styles.bottom = verticalMargin;
                styles.left = horizontalMargin;
                break;
            case 'bottom-middle':
                styles.bottom = verticalMargin;
                styles.left = '45%';
                styles.textAlign = 'center';
                break;
            case 'bottom-right':
                styles.bottom = verticalMargin;
                styles.right = horizontalMargin;
                styles.textAlign = 'right';
                break;
            default:
                break;
        }

        return styles;
    }

    render() {
        const { slideshowPopup } = this.props;
        const caseStudy = caseStudies[this.props.id];
        const backgroundStyle = {
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat'
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
        };

        function reverseNotInPlace(arr) {
            const newArr = [];
            for (let i = arr.length - 1; i >= 0; i--) {
                newArr.push(arr[i]);
            }
            return newArr;
        }

        const popupContent = slideshowPopupContent.wheat[this.state.currentPage][slideshowPopup.id];
        console.log('popup content', popupContent);

        return (
            <div className='slideshow'>
                <div className='page-stack' >
                    <CSSTransitionGroup
                        transitionName='page-animation'
                        transitionEnterTimeout={700}
                        transitionLeaveTimeout={700}
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
                                    <div className='bg-overlay'></div>
                                    {page.content.map((content, i) => {
                                        return (
                                        <div
                                            key={i}
                                            style={this.getTextStyle(content)}
                                        >
                                            {content.text}
                                        </div>
                                        );
                                    })}
                                </div>
                            );
                        }
                        })}
                    </CSSTransitionGroup>
                </div>

                <img className='arrow last' src={arrowLeft} onClick={() => this.changePage(LAST)}/>
                <img className='arrow next' src={arrowRight}onClick={() => this.changePage(NEXT)} />
                {popupContent && <CaseStudySlideshowPopup content={popupContent} visible={slideshowPopup.visible} point={slideshowPopup.point}/>}
                {this.state.loading && <div className='loading-overlay' />}

                <LoadingOverlay waitFor={[this.props.loading]} />
            </div>
        );
    }
}

CaseStudySlideshow.propTypes = {
    id: React.PropTypes.string.isRequired,
    slideshowPopup: React.PropTypes.object
};

export default connect(state => ({
    slideshowPopup: state.slideshowPopup,
    loading: state.dataIsLoading
}))(CaseStudySlideshow);
