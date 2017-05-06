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

    render() {
        console.log('rerendering case study page');
        const { params, router, location } = this.props;
        console.log('location', location.pathname);

        // Get case study that matches the route
        const caseStudy = caseStudies[params.caseStudy];
        const pageData = this.getPageData(caseStudy.id, params.category, params.pageNumber);
        const nodeList = nodes[caseStudy.id][params.category];

        // Figure out which node is active
        let activeId;
        nodeList.forEach(n => {
            if (n.pageNumber === parseInt(params.pageNumber, 10)) {
                activeId = n.id;
            }
        });

        const selectProjects = () => {
            // if (params.category && params.pageNumber) {
            //     // const pageData = this.getPageData(pages, caseStudy.id, params.category, params.pageNumber);
            // }
            return pageData.mapData;
        };

        const renderPanelContent = () => {
            return (
                <div className='case-study-panel'>
                    <h1>{pageData.storyDisplay}</h1>
                    <NodeList nodes={nodeList} activeId={activeId}/>
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
            <div style={{height: `${window.innerHeight - 60}px`}} className='case-study'>
                <div id='case-study-map-container' className='case-study-map-container'>
                    <MapCore onMouseMove={this.handleMouseMove} mapData={selectProjects()} />
                    <CaseStudyPopup containerId='case-study-map-container'/>
                </div>
                {renderPanelContent()}
                {renderFloatingText()}

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
