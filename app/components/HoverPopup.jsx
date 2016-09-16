import React from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import Link from 'app/components/Link';

class HoverPopup extends React.Component {

    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
        var { currentProject, projects } = this.props;
        var { visible, point } = this.props.popup;

        let prj = projects[currentProject];

        if (this._elt) {
            let w = this._elt.offsetWidth;
            let h = this._elt.offsetHeight;

            let lo = 0;
            if ($('.content-container')[0]) {
                lo = $('.content-container')[0].offsetLeft;
            }

            if ( point && visible ) {
                this._elt.style.left = point.x - w + lo + 'px';
                console.log(this._elt.style.left);
                this._elt.style.top = point.y - h + 'px';
                console.log(this._elt.style.top);
            }
            this._elt.style.visibility = visible ? 'visible' : 'hidden';
        }

    }

    render() {
        var { popup, projects } = this.props;
        var { visible, currentProject, point } = popup;
        let prj = projects[currentProject];
        
        let pos = {};

        return (
            <div id='hover-popup' ref={(c) => {this._elt = c;}}>
                <h2>{prj && prj.name}</h2>
                <Link dest={prj && prj.link}>Website</Link>
                <button>I want to get involved</button>
                <p><strong>Keywords:</strong> {prj && prj.keywords.join(', ')}</p>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        popup: state.popup,
        projects: state.projects
    };
})(HoverPopup);
