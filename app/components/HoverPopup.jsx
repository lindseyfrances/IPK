/* eslint
    "react/no-did-mount-set-state": "off"
*/
import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import ExternalLink from 'app/components/SimpleElements/ExternalLink';
import Select from 'react-select';
import * as actions from 'app/actions/actions';

// TODO: Remove edit feature from popup -> put it in the project banner or
// project page?
// TODO: Eventually add authentication to be able to add connections?
// Or should we just tally how many times that connection has been submitted
// and only show ones over a certain threshold?
class HoverPopup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { popup, projects } = this.props;
        const { currentProject } = popup;
        const prj = projects[currentProject];

        // Do not set state if there are no projects in the list yet
        if (Object.keys(projects).length === 0) {
            return;
        }
    }

    componentDidUpdate(prevProps) {
        // const { currentProject, projects } = this.props;
        const { visible, point } = this.props.popup;

        if (this._elt) {
            const w = this._elt.offsetWidth;
            const h = this._elt.offsetHeight;

            let containerRect = document.getElementById(this.props.containerId).getBoundingClientRect();
            let containerLeftOffset = containerRect.left;
            let containerTopOffset = containerRect.top;

            // Defualt puts the popup to the upper left of the cursor
            if (point && visible) {
                let left = `${point.x + containerLeftOffset - w}px`,
                    top = `${point.y - h}px`;

                // If the cursor is closer to the edge than the width of the
                // popup, move popup to right of cursor
                if (point.x < w) {
                    left = `${point.x + containerLeftOffset}px`;
                }

                // Same with y, but move to bottom of cursor
                if (point.y < h) {
                    top = `${point.y}px`;
                }

                this._elt.style.left = left;
                this._elt.style.top = top;
            }
            this._elt.style.visibility = visible ? 'visible' : 'hidden';
        }
    }

    render() {
        const { popup, projects } = this.props;
        // const { visible, currentProject, point } = popup;
        const { currentProject } = popup;
        const prj = projects[currentProject];
        const self = this;

        // If projects haven't loaded yet, we just render an empty div
        if (!prj) {
            return <div />;
        }

        return (
            <div id='hover-popup' ref={(c) => { self._elt = c; }}>
                <div>
                    <h2>{prj && prj.name}</h2>
                    <p>{prj && prj.shortDesc}</p>
                </div>
            </div>
        );
    }
}

HoverPopup.propTypes = {
    popup: React.PropTypes.object.isRequired,
    projects: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect((state) => {
    return {
        popup: state.popup,
        projects: state.projects
    };
})(HoverPopup);
