import React from 'react';
import { connect } from 'react-redux';

//import { setWhereIAm } from 'app/actions/actions';
import { toggleMenu } from 'app/actions/actions';

import NavItemCategory from 'app/components/NavItemCategory';
import TopNavItem from 'app/components/TopNavItem';

const rightArrow = require('../images/rightarrow.png');
const menuIcon = require('../images/Menu-100.png');
const progressBarImg = require('../images/progress-bar-type-1.png');

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this);
    }


    handleMenuClick() {
        const { dispatch } = this.props;
        dispatch(toggleMenu());
    }

    render() {
        const { pos, leftHeader, items } = this.props;
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

        // Render either top nav bar or bottom nav bar
        const navItems = () => {
            switch (pos) {
                case 'bottom':
                    return Object.keys(items).map((key) => {
                        return <NavItemCategory title={key} key={key} />;
                    });
                case 'top':
                    return items.map((i) => {
                        return <TopNavItem title={i} key={i} image={i === 'filter' ? rightArrow : null} />;
                    });
                default:
                    return [];
            }
        };

        const renderRightBar = () => {
            switch (pos) {
                case 'top':
                    return (
                        <div className='nav-right'>
                            <img onClick={this.handleMenuClick} src={menuIcon} alt='menu icon' />
                        </div>
                    );
                case 'bottom':
                    return (
                        <div className='nav-right nav-right-bottom'>
                            <h4>Your Impact</h4>
                            <img src={progressBarImg} alt='progress bar' />
                        </div>
                    );
                default:
                    return <div />;
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

Nav.propTypes = {
    pos: React.PropTypes.string.isRequired,
    leftHeader: React.PropTypes.string.isRequired,
    items: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default connect()(Nav);
