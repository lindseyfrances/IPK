import React from 'react';
import { connect } from 'react-redux';

import { toggleSideNav } from './../actions/actions';
import LayerList from 'app/components/LayerList';

var rightArrow = require('./../images/rightarrow.png');
var leftArrow = require('./../images/leftarrow.png');
class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.leftPos = {
            left: 0
        };
        this.width = 280;
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        this.width = this.refs.sideNav.offsetWidth;
    }

    render() {
        var { dispatch, sideNavOpen, allLayers } = this.props;

        
        // set left position of side bar, 'style' expects
        // an object of css styles
        //this.leftPos = sideNavOpen ?  { right: 0 } : { right: -this.width + 50 + 'px' };
        this.leftPos = {right: 0};
        function whichArrow() {
            return sideNavOpen ? rightArrow : leftArrow;
        }

        var renderLayerLists = () => {
            return Object.keys(allLayers).map((l) => {
                return <LayerList key={l} title={l} items={allLayers[l]} />;
            });
        };

        return (
            <div className='side-nav' style={this.leftPos} ref='sideNav'>
                <div className='side-nav-open' onClick={() => { dispatch(toggleSideNav()); }}>
                    {/*<img src={whichArrow()} />*/}
                </div>
                {renderLayerLists()}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        sideNavOpen: state.sideNavOpen,
        allLayers: state.allLayers
    };
})(SideNav);
