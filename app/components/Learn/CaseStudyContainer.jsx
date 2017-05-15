import React from 'react';
import MapCore from 'app/components/Map/MapCore';
import CaseStudyStory from 'app/components/Learn/CaseStudyStory';
import leftArrow from 'app/images/leftarrow.png';
import rightArrow from 'app/images/rightarrow.png';
import { caseStudies, CASE_STUDY_TYPES } from './caseStudyData';

class CaseStudyContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCaseStudy: caseStudies[this.props.params.caseStudy].id,
            storyCategory: caseStudies[this.props.params.caseStudy].initialStory,
            pageNumber: 1
        };

        this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
        this.changeStory = this.changeStory.bind(this);
    }

    handlePageNumberChange(pageNumber) {
        this.setState({
            pageNumber
        });
    }

    // TODO: Implement these functions so the arrows work!
    changeCaseStudy(dir) {
        if (dir === 'next') {
            console.log('next');
            // this.setState({
            //     currentCaseStudy: caseStudies[this.state.currentCaseStudy].next
            // });
        } else {
            console.log('prev');
            // this.setState({
            //     currentCaseStudy: caseStudies[this.state.currentCaseStudy].previous
            // });
        }
    }

    getNextElement(arr, idx) {
        return arr[idx + 1] || arr[0];
    }
    getPreviousElement(arr, idx) {
        return arr[idx - 1] || arr[arr.length - 1];
    }

    changeStory(dir) {
        const caseStudy = caseStudies[this.state.currentCaseStudy];
        const { pages, stories } = caseStudy;
        let nextStory;
        let currentStoryIdx;
        stories.forEach((story, i) => {
            if (story.id === this.state.storyCategory.id) {
                currentStoryIdx = i;
            }
        });
        // const currentStoryIdx = stories.indexOf(this.state.storyCategory);

        if (currentStoryIdx !== undefined) {
            if (dir === 'next') {
                nextStory = this.getNextElement(stories, currentStoryIdx);
            } else if (dir === 'prev'){
                nextStory = this.getPreviousElement(stories, currentStoryIdx);
            } else if (dir) {
                nextStory = dir;
            }

            this.setState({
                storyCategory: nextStory,
                pageNumber: 1
            });
        }

    }

    render() {
        const caseStudy = caseStudies[this.props.params.caseStudy];
        switch (caseStudy.type) {
            case CASE_STUDY_TYPES.REGULAR:
                return (
                    <div className='case-study-container'>
                        <section
                            style={{
                                background: `url('/images/lighthousebrooklyn.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition:  '50% 50%',
                                backgroundRepeat: 'no-repeat',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            className='case-study-section'>
                            <div className='bg-overlay'/>
                            <div style={{position: 'relative', zIndex: 2}} className='panel left-col'>
                                <h1>{caseStudy.headers.sectionOne}</h1>
                                <p>{caseStudy.introText}</p>
                            </div>
                            <img onClick={() => this.changeCaseStudy('prev')} className='arrow left' src={leftArrow} alt='go to previous case study'/>
                            <img onClick={() => this.changeCaseStudy('next')} className='arrow right' src={rightArrow} alt='go to next case study'/>
                        </section>

                        <section className='case-study-section-dark height-80 white'>
                                <h1>{caseStudy.headers.sectionTwo}</h1>
                                <div className='centered'>
                                    <div className='video-wrapper'>
                                        <iframe src={caseStudy.videoSrc} width='100%' frameBorder='0' allowFullScreen />
                                    </div>
                                </div>
                        </section>

                        <section
                            style={{
                                background: `url('/images/lighthousebrooklyn.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: '50% 50%',
                                backgroundRepeat: 'no-repeat',
                                padding: '0 4rem'
                            }}
                            className='case-study-section full-height'>
                            <div className='bg-overlay'/>
                            <div className='case-study-story-layout'>
                                <div className='case-study-story-intro'>
                                    <h1>EXPLORE THE FOOD SYSTEM</h1>
                                    <p>{caseStudy.storySubHeader}</p>
                                    <ul className='case-study-story-list'>
                                        {caseStudy.stories.map(story => <li className={this.state.storyCategory.id === story.id ? 'active' : ''} onClick={() => this.changeStory(story)} key={story.id}>{story.display}</li>)}
                                    </ul>
                                </div>
                                <CaseStudyStory
                                    id={this.props.params.caseStudy}
                                    category={this.state.storyCategory.id}
                                    handlePageNumberChange={this.handlePageNumberChange}
                                    pageNumber={this.state.pageNumber}
                                />
                            </div>

                            <img onClick={() => this.changeStory('prev')} className='arrow left' src={leftArrow} alt='go to next page in the case study' />
                            <img onClick={() => this.changeStory('next')} className='arrow right' src={rightArrow} alt='go to previous page in the case study' />
                        </section>
                    </div>
                );
            case CASE_STUDY_TYPES.SLIDESHOW:
                return (
                    <div>slideshow</div>
                );
            default:
                return (
                    <div></div>
                )
        }
    }
}

CaseStudyContainer.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default CaseStudyContainer;
