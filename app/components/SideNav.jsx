import React from 'react';
import { connect } from 'react-redux';

import { toggleSideNav } from './../actions/index';

var rightArrow = require('./../images/rightarrow.png');
var leftArrow = require('./../images/leftarrow.png');
class SideNav extends React.Component {
    render() {
        var { dispatch, sideNavOpen } = this.props;

        var leftPos = {
            left: '-100px'
        };
        if (sideNavOpen) {
            leftPos = {
                left: '0px'
            };
        }
        function whichArrow() {
            return sideNavOpen ? leftArrow : rightArrow;
        }
        return (
            <div className='side-nav' style={leftPos}>
                <div className='button-container'>
                    <button id='back'>&lt;&lt;</button>
                    <button id='next'>&gt;&gt;</button>
                </div>
                <div className='side-nav-open' onClick={() => { dispatch(toggleSideNav()); }}>
                    <img src={whichArrow()} />
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        sideNavOpen: state.sideNavOpen
    };
})(SideNav);
