/*
 * CaseStudy is responsible for rendering a single page of a case study story
 *
 * It expects data in a very particular format - see './data/casestudies.jsx'
 * for that format
*/
import React from 'react';
import { caseStudies, pages, nodes } from './data/casestudies';
import { connect } from 'react-redux';
import MapCore from '../Map/MapCore';
import NodeList from './NodeList';
import CaseStudyPopup from './CaseStudyPopup';
import * as actions from 'app/actions/actions';

class CaseStudy extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    getNodeData(id, story, pageNumber) {
        let data = nodes[id][story];
    }
    getPageData(id, story, pageNumber) {
        // Pull off map content specific to this site
        return pages.filter(page => {
            if (page.id === id) {
                if (page.story === story) {
                    if (page.pageNumber == pageNumber) {
                        return true;
                    }
                }
            }
            return false;
        })[0];
    }

    handleMouseMove(evt, features) {
        const { popup, dispatch } = this.props;
        if (features.length) {
            let topFeature = features[0];
            let { properties } = topFeature;

            if (properties.HASPOPUP) {
                dispatch(actions.showCaseStudyPopupWithContent(properties, evt.point));
            }
        } else if (features.length === 0 && popup.visible) {
            dispatch(actions.hideCaseStudyPopup());
        }
    }

    changePage(pageNumber) {
        this.props.handlePageNumberChange(pageNumber);
    }

    render() {
        console.log('rerendering case study page');
        const { params, router, id, category, pageNumber } = this.props;
        // console.log('location', location.pathname);

        // Get case study that matches the route
        const caseStudy = caseStudies[id];
        const pageData = caseStudy.pages.filter(page => {
            if (page.story === category) {
                return page.pageNumber === pageNumber;
            }
            return false;
        })[0];

        const nodeList = nodes[caseStudy.id][category];

        // Figure out which node is active
        let activeId;
        let activeNode;
        nodeList.forEach(n => {
            if (n.pageNumber === parseInt(pageNumber, 10)) {
                activeId = n.id;
                activeNode = n;
            }
        });

        const renderPanelContent = () => {
            return (
                <div className='case-study-panel'>
                    <h1>{pageData.storyDisplay}</h1>
                    <NodeList handleClick={this.changePage} nodes={nodeList} activeId={activeId}/>
                    <h2>{pageData.content.header}</h2>
                    <p>{pageData.content.text}</p>
                </div>
                );
        };

        const renderFloatingText = () => {
            if (pageData.floatingText) {
                let styles = {};
                switch (pageData.floatingText.position) {
                    case 'top-left':
                        styles.top = '100px';
                        styles.left = '100px';
                        break;
                    case 'top-center':
                        styles.top = '0px';
                        styles.left = '50%';
                        break;
                    case 'top-right':
                        styles.top = '100px';
                        styles.right = '100px';
                        break;
                    case 'center-left':
                        styles.top = '40%';
                        styles.left = '100px';
                        break;
                    case 'center':
                        styles.top = '40%';
                        styles.left = '50%';
                        break;
                    case 'center-right':
                        styles.top = '40%';
                        styles.right = '100px';
                        break;
                    case 'bottom-left':
                        styles.bottom = '100px';
                        styles.left = '100px';
                        break;
                    case 'bottom-center':
                        styles.bottom = '100px';
                        styles.left = '50%';
                        break;
                    case 'bottom-right':
                        styles.bottom = '100px';
                        styles.right = '100px';
                        break;
                    default:
                        break;
                }

                return (
                    <div style={styles} className='floating-text'>
                        <h3>{pageData.floatingText.title}</h3>
                        <p>{pageData.floatingText.text}</p>
                    </div>
                );
            }
            return;
        }

        return (
            <div className='case-study-story two-column'>
                <div className='left-col'>
                    {renderPanelContent()}
                </div>
                <div className='right-col'>
                    <div id='case-study-map-container' className='case-study-map-container'>
                        <MapCore mapId='case-study-map' onMouseMove={this.handleMouseMove} mapData={pageData.mapData} />
                        <CaseStudyPopup containerId='case-study-map-container'/>
                    </div>
                    {renderFloatingText()}
                </div>

            </div>
        );
    }
}

const mapCorePopupStyle = {
    position: 'absolute',
    width: '300px',
    height: '300px',
    backgroundColor: 'blue'
};

CaseStudy.contextTypes = {
    router: React.PropTypes.object
};

export default connect(state => ({
    popup: state.caseStudyPopup
}))(CaseStudy);
