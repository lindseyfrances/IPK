/* global document */
import React from 'react';
import { connect } from 'react-redux';

class CaseStudyPopup extends React.Component {
    componentDidUpdate() {
        const { popup } = this.props;
        const { point } = popup;

        if (this._elt && this.props.containerId) {
            const w = this._elt.offsetWidth;
            const h = this._elt.offsetHeight;

            let containerLeftOffset = 0;
            const containerTopOffset = 0;
            containerLeftOffset = document.getElementById(this.props.containerId).offsetLeft;

            // Defualt puts the popup to the upper left of the cursor
            if (point) {
                let left = `${point.x + -w + containerLeftOffset}px`,
                    top = `${point.y - h}px`;

                // If the cursor is closer to the edge than the width of the
                // popup, move popup to right of cursor
                if (point.x < w) {
                    left = `${point.x + containerLeftOffset}px`;
                }

                // Same with y, but move to bottom of cursor
                if (point.y < h) {
                    top = `${point.y + containerTopOffset}px`;
                }

                this._elt.style.left = left;
                this._elt.style.top = top;
            }
        }
    }

    render() {
        const { popup } = this.props;
        const style = {
            visibility: popup.visible ? 'visible' : 'hidden'
            // width: '300px',
            // position: 'absolute',
            // padding: '1rem',
            // zIndex: 100
        };

        const renderContent = () => {
            if (popup.content.POPUPFIELDS) {
                const contentFields = popup.content.POPUPFIELDS.split(',');
                return contentFields.map(fieldName => {
                    const propName = fieldName[0] === ' ' ? fieldName.slice(1) : fieldName;
                    return (
                        <div key={fieldName}>
                            <h4>{propName}</h4>
                            <p>{popup.content[propName]}</p>
                        </div>
                    );
                });
            } else if (popup.content.POPUPCONTENT) {
                return <p>{popup.content.POPUPCONTENT}</p>;
            }

            return null;
        };


        return (
            <div
                style={style}
                className='case-study-popup'
                ref={c => this._elt = c}            //eslint-disable-line
            >
                {popup.content &&
                    <div>
                        <h1>{popup.content.POPUPHEADER}</h1>
                        {renderContent()}
                    </div>
                }
            </div>
        );
    }
}

CaseStudyPopup.defaultProps = {
    containerId: ''
};

CaseStudyPopup.propTypes = {
    popup: React.PropTypes.object.isRequired,
    containerId: React.PropTypes.string
};

export default connect(state => ({
    popup: state.caseStudyPopup
}))(CaseStudyPopup);
