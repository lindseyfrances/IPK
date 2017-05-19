/*
 * CaseStudySlideshowPopup.jsx
 * Copyright (C) 2017 jamiecharry <jamiecharry@Jamies-Air-2.home>
 *
 * Distributed under terms of the MIT license.
 */
import React from 'react';
import { connect } from 'react-redux';

class CaseStudySlideshowPopup extends React.Component {
    constructor(props) {
        super(props);

        console.log('elt', this._elt);
    }

    componentDidMount() {
        const { point, content } = this.props;
        const w = this._elt.offsetWidth;
        const h = this._elt.offsetHeight;

        // Start going towards the bottom right
        let top = point.y;
        let left = point.x;

        switch (content.dir) {
            case 'top-left':
                left = left - w;
                top = top - h;
                break;
            case 'bottom-left':
                left = left - w;
                break;
            case 'top-right':
                top = top - h;
                break;
            default:
                break;
        }

        this._elt.style.left = `${left}px`;
        this._elt.style.top = `${top}px`;
    }

    render() {
        const { point, content, visible } = this.props;
        let styles = {
            visibility: visible ? 'visible' : 'hidden',

        }
        return (
            <div
                className='slideshow-popup'
                style={styles}
                ref={c => this._elt = c}
            >
                {content.header && <h2>{content.header}</h2>}
                {content.image && <img src={content.image} />}
                {content.text && <p>{content.text}</p>}
            </div>
            );
}
}

export default connect()(CaseStudySlideshowPopup);
