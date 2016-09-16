import React from 'react';
import { connect } from 'react-redux';

import { setWhereIAm } from 'app/actions/actions';

import NavItemCategory from 'app/components/NavItemCategory';
import TopNavItem from 'app/components/TopNavItem';

//var rightArrow = require('./../images/rightarrow.png');
//import rightArrow from './../images/rightarrow.png');
//var leftArrow = require('./../images/leftarrow.png');
class Nav extends React.Component {

    render() {
        var { pos, leftHeader, items, dispatch } = this.props;
        let style = {};
        if (pos === 'top') {
            style = {
                top: 0,
                left: 0
            };
        } else {
            style = {
                bottom: 0,
                left: 0
            };
        }

        var navItems = function() {
            if (pos === 'bottom') {
                return Object.keys(items).map((key) => {
                    return <NavItemCategory toggled={items[key]} title={key} key={key} />;
                });
            } else {
                return items.map(i => {
                    return <TopNavItem title={i} toggled={false} key={i} image={i === 'filter' ? require('../images/rightarrow.png') : null} />;
                });
            }
        };

        var renderRightBar = function() {
            switch (pos) {
                case 'top':
                    return (
                        <div className='nav-right'>
                            <img src={require('../images/Menu-100.png')} />
                        </div>
                    );
                    break;
                case 'bottom':
                    return (
                        <div className='nav-right'>
                            <h4>Your Impact</h4>
                            <img src={require('../images/progress-bar-type-1.png')} />
                        </div>
                    );
                    break;
            }
        };

        return (
            <div className='nav' style={style}>
                <div className='nav-left'>
                    <h4>{leftHeader}</h4>
                    <div className='items'>
                        {items && navItems()}
                    </div>
                </div>
                {renderRightBar()}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        //categories: state.categories,
        projects: state.projects,
        selectedCategories: state.currentCategories
    };
})(Nav);
