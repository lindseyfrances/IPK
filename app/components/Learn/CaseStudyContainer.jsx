import React from 'react';
import MapCore from 'app/components/Map/MapCore';
import CaseStudyStory from 'app/components/Learn/CaseStudyStory';

import { caseStudies } from './data/casestudies';

import leftArrow from 'app/images/leftarrow.png';
import rightArrow from 'app/images/rightarrow.png';

class CaseStudyContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storyCategory: caseStudies[this.props.params.caseStudy].initialStory,
            pageNumber: 1
        };

        this.handlePageNumberChange = this.handlePageNumberChange.bind(this);
    }

    handlePageNumberChange(pageNumber) {
        this.setState({
            pageNumber
        });
    }

    // TODO: Implement these functions so the arrows work!
    changeCaseStudy(id) {
        console.log(id);
    }

    changeStory() {
    }

    render() {
        let caseStudy = caseStudies[this.props.params.caseStudy];
        return (
            <div className='case-study-container'>
                <section className='case-study-section two-column top'>
                    <div className='panel left-col'>
                        <h1>{caseStudy.headers.sectionOne}</h1>
                        <p>{caseStudy.introText}</p>
                    </div>
                    <div className='panel right-col'>
                        <MapCore mapId='map1' mapData={caseStudy.mapData} />
                    </div>
                    <img onClick={this.changeCaseStudy} className='arrow left' src={leftArrow} />
                    <img onClick={this.changeCaseStudy} className='arrow right' src={rightArrow} />
                </section>

                <section className='case-study-section height-80 white'>
                    <div className='section-padding'>
                        <h1>{caseStudy.headers.sectionTwo}</h1>
                        <div className='centered'>
                            <div className='video-wrapper'>
                                <iframe src={caseStudy.videoSrc} width="100%" frameBorder="0" allowFullScreen />
                            </div>
                        </div>
                    </div>
                </section>

                <section className='case-study-section full-height'>
                    <div className='case-study-story-intro'>
                        <h1>Explore the Food System</h1>
                        <p>{caseStudy.storySubHeader}</p>
                    </div>
                    <CaseStudyStory
                        id={this.props.params.caseStudy}
                        category={this.state.storyCategory}
                        handlePageNumberChange={this.handlePageNumberChange}
                        pageNumber={this.state.pageNumber} />
                    <img onClick={this.changeStory} className='arrow left' src={leftArrow} />
                    <img onClick={this.changeStory} className='arrow right' src={rightArrow} />
                </section>
            </div>
        );
    }
}

export default CaseStudyContainer;
