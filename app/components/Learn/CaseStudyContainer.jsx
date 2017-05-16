import React from 'react';
import MapCore from 'app/components/Map/MapCore';
import CaseStudyStory from 'app/components/Learn/CaseStudyStory';
import NodeList from 'app/components/Learn/NodeList';
import leftArrow from 'app/images/leftarrow.png';
import rightArrow from 'app/images/rightarrow.png';
import { caseStudies, nodes, CASE_STUDY_TYPES } from './caseStudyData';

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
        this.changePageNumber = this.changePageNumber.bind(this);
    }

    handlePageNumberChange(node) {
        this.setState({
            pageNumber: node.pageNumber
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

    changePageNumber(dir) {
        const caseStudy = caseStudies[this.state.currentCaseStudy];
        const { pages, stories } = caseStudy;

        let storyPages = pages.filter(page => {
            return page.story === this.state.storyCategory.id
        });

        let nextPageNumber;
        switch(dir) {
            case 'next':
                nextPageNumber = this.state.pageNumber + 1;
                if (nextPageNumber > storyPages.length) {
                    nextPageNumber = 1;
                }
                break;
            case 'prev':
                nextPageNumber = this.state.pageNumber - 1;
                if (nextPageNumber < 1) {
                    nextPageNumber = storyPages.length;
                }
                break;
            default:
                return;
        }

        this.setState({
            pageNumber: nextPageNumber
        });
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
        const nodeList = nodes[caseStudy.id][this.state.storyCategory.id];

        const pageData = caseStudy.pages.filter(page => {
            if (page.story === this.state.storyCategory.id) {
                return page.pageNumber === this.state.pageNumber;
            }
            return false;
        })[0];

        // Figure out which node is active
        let activeId;
        let activeNode;
        nodeList.forEach(n => {
            if (n.pageNumber === parseInt(this.state.pageNumber, 10)) {
                activeId = n.id;
                activeNode = n;
            }
        });
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
                        </section>

                        <section
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}
                            className='case-study-section-dark height-80 white'>
                                <h1>{caseStudy.headers.sectionTwo}</h1>
                                <div style={{width: '100%'}} className='centered'>
                                    <div className='video-wrapper'>
                                        <iframe src={caseStudy.videoSrc} width='100%' frameBorder='0' allowFullScreen />
                                    </div>
                                </div>
                        </section>

                        <section
                            style={{
                                background: `url('/images/joanna-kosinska-127887.png')`,
                                backgroundSize: 'cover',
                                backgroundPosition: '50% 50%',
                                backgroundRepeat: 'no-repeat',
                                padding: '0 4rem'
                            }}
                            className='case-study-section full-height story-section'
                        >
                            <div className='bg-overlay'/>
                            <div className='top'>
                                <div className='story-header row center col-20'>
                                    <h1>EXPLORE THE FOOD SYSTEM</h1>
                                    <p>{caseStudy.storySubHeader}</p>
                                </div>
                                <div className='row col-80'>
                                    <div className='row-20 flex-full-center'>
                                        <div className='case-study-story-list'>
                                            {/* {caseStudy.stories.map(story => <li className={this.state.storyCategory.id === story.id ? 'active' : ''} onClick={() => this.changeStory(story)} key={story.id}>{story.display}</li>)} */}
                                            {caseStudy.stories.map(story => {
                                                return (
                                                <div className={this.state.storyCategory.id === story.id ? 'case-study-icon active' : 'case-study-icon'} key={story.id} onClick={() => this.changeStory(story)}>
                                                    <p>{story.display}</p>
                                                    <img src={this.state.storyCategory.id === story.id ? story.activeImg : story.inactiveImg} />
                                                </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className='row-80 node-container'>
                                        <NodeList handleClick={this.handlePageNumberChange} activeId={activeId} nodes={nodeList} />
                                        <div className='node-text'>
                                            <div className='node-blurred-bg'/>
                                            <img onClick={() => this.changePageNumber('prev')} className='arrow left' src={leftArrow} alt='go to next page in the case study' />
                                            <div>
                                                <h2>{pageData.content.header}</h2>
                                                <p>{pageData.content.text}</p>
                                            </div>
                                            <img onClick={() => this.changePageNumber('next')} className='arrow right' src={rightArrow} alt='go to previous page in the case study' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='bottom'>
                                <CaseStudyStory
                                    id={this.props.params.caseStudy}
                                    category={this.state.storyCategory.id}
                                    handlePageNumberChange={this.handlePageNumberChange}
                                    pageNumber={this.state.pageNumber}
                                />
                            </div>

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

/*
 *
                            <img onClick={() => this.changeStory('prev')} className='arrow left' src={leftArrow} alt='go to next page in the case study' />
                            <img onClick={() => this.changeStory('next')} className='arrow right' src={rightArrow} alt='go to previous page in the case study' />
*/

CaseStudyContainer.propTypes = {
    params: React.PropTypes.object.isRequired
};

export default CaseStudyContainer;
