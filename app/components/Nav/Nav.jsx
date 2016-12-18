/* eslint
    "class-methods-use-this": "off"
 */
import React from 'react';
import { connect } from 'react-redux';
import { TransitionMotion, spring } from 'react-motion';

// import { setWhereIAm } from 'app/actions/actions';
import { toggleMenu, toggleImpact } from 'app/actions/actions';

import NavItem from 'app/components/Nav/NavItem';
import SearchBar from 'app/components/SearchBar';
import Filter from 'app/components/Nav/Filter';
import NavItemCategory from 'app/components/Nav/NavItemCategory';
// import TopNavItem from 'app/components/TopNavItem';

// const rightArrow = require('../images/rightarrow.png');
// const menuIcon = require('../images/Menu-100.png');
const progressBarImg = require('../../images/progress-bar-type-1.png');

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.toggleImpactScreen = this.toggleImpactScreen.bind(this);
    }

    getChildren() {
        const { bottomNavContent, categories } = this.props;
        switch (bottomNavContent) {
            case 'filter':
                return categories;
            default:
                return {};
        }
    }

    bottomNavWillLeave() {
        return {
            height: spring(0), //spring(0, presets.gentle),
            opacity: spring(0)
        };
    }

    bottomNavDefaultStyles(children) {
        if (typeof children === 'object') {
            // Array
            if (children.length) {
                return children.map(child => ({
                    key: child,
                    style: {
                        height: 0,
                        opacity: 0
                    },
                    data: child
                }));
            }
            // Object
            return Object.keys(children).map((child, i) => ({
                key: i,
                style: {
                    height: 0,
                    opacity: 0
                },
                data: {
                    title: child,
                    toggled: children[child].visible
                }
            }));
        }

        return [];
    }

    bottomNavStyles(children) {
        if (typeof children === 'object') {
            // Array
            if (children.length) {
                return children.map(child => ({
                    key: child,
                    style: {
                        height: spring(30),
                        opacity: spring(1)
                    },
                    data: child
                }));
            }

            return Object.keys(children).map(child => ({
                key: child,
                style: {
                    height: spring(30),
                    opacity: spring(1)
                },
                data: {
                    title: child,
                    toggled: children[child].visible
                }
            }));
        }

        return [];
    }

    bottomNavWillEnter() {
        return {
            height: 0,
            opacity: 0
        };
    }

    handleFilterClick(e) {
        // const { dispatch } = this.props;
        e.preventDefault();
        e.stopPropagation();
        // dispatch(actions.setMapDisplay())
    }

    toggleImpactScreen() {
        const { dispatch } = this.props;
        dispatch(toggleImpact());
    }

    handleMenuClick() {
        const { dispatch } = this.props;
        dispatch(toggleMenu());
    }

    render() {
        const { bottomNavContent } = this.props;
        const navItems = [
            {
                component: <Filter key='filter' />
            },
            {
                component: <p key='contribute'>Contribute</p>
            },
            {
                component: <p key='menu'>Menu</p>
            }
        ];

        const bottomNavChildren = this.getChildren();

        let bottomNavClass = 'nav-bottom';
        if (bottomNavContent === '') {
            bottomNavClass += ' closed';
        }
        return (
            <div className='nav'>
                <div className='nav-top'>
                    <div className='nav-left'>
                        <h4>Map Options</h4>
                        <div className='items'>
                            {navItems.map((item, idx) =>
                                <NavItem key={idx} item={item} />
                            )}
                        </div>
                    </div>
                    <div className='nav-right'>
                        <SearchBar />
                        <div className='nav-impact' onClick={this.toggleImpactScreen}>
                            <h4>Your Impact</h4>
                            <img src={progressBarImg} alt='progress bar' />
                        </div>
                    </div>
                </div>

                <TransitionMotion
                    defaultStyle={this.bottomNavDefaultStyles(bottomNavChildren)}
                    styles={this.bottomNavStyles(bottomNavChildren)}
                    willLeave={this.bottomNavWillLeave}
                    willEnter={this.bottomNavWillEnter}
                >
                    {interpolatedStyles =>
                        <div className={bottomNavClass}>
                            {interpolatedStyles.map(({ key, style, data }) =>
                                <NavItemCategory title={data.title} toggled={data.toggled} key={key} style={style} />
                            )}
                        </div>
                    }
                </TransitionMotion>
            </div>
        );
    }
}

Nav.propTypes = {
    // pos: React.PropTypes.string.isRequired,
    // leftHeader: React.PropTypes.string.isRequired,
    // items: React.PropTypes.oneOfType([
    //     React.PropTypes.object,
    //     React.PropTypes.array
    // ]).isRequired,
    dispatch: React.PropTypes.func.isRequired,
    bottomNavContent: React.PropTypes.string.isRequired,
    categories: React.PropTypes.object.isRequired
};

export default connect(state => ({
    categories: state.categories,
    bottomNavContent: state.bottomNavContent
}))(Nav);
