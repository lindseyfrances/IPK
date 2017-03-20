/* eslint
    "class-methods-use-this": "off"
 */
import React from 'react';
import { connect } from 'react-redux';
import { TransitionMotion, spring } from 'react-motion';

// import { setWhereIAm } from 'app/actions/actions';
import { toggleMenu } from 'app/actions/actions';

import NavItem from 'app/components/Nav/NavItem';
import SearchBar from 'app/components/SearchBar';
import Filter from 'app/components/Nav/Filter';
import BottomNavItem from 'app/components/Nav/BottomNavItem';
// import NavItemCategory from 'app/components/Nav/NavItemCategory';
// import TopNavItem from 'app/components/TopNavItem';

// const rightArrow = require('../images/rightarrow.png');
// const menuIcon = require('../images/Menu-100.png');
const progressBarImg = require('../../images/progress-bar-type-1.png');

class Nav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bottomNavState: ''
        };

        this.handleMenuClick = this.handleMenuClick.bind(this);
        // this.toggleImpactScreen = this.toggleImpactScreen.bind(this);
        this.handleNavItemClick = this.handleNavItemClick.bind(this);
        this.bottomNavWillLeave = this.bottomNavWillLeave.bind(this);
    }

    getChildren() {
        const { categories } = this.props;
        const { bottomNavState } = this.state;
        switch (bottomNavState) {
            case 'filter':
                return Object.keys(categories).map(cat => ({ ...categories[cat], title: cat, type: 'category' }));
            case 'menu':
                return [
                    { title: 'item1', visible: false, type: 'menu' },
                    { title: 'item2', visible: false, type: 'menu' },
                    { title: 'item3', visible: false, type: 'menu' }
                ];
            default:
                return {};
        }
    }

    bottomNavWillLeave() {
        const { bottomNavState } = this.state;
        if (bottomNavState) {
            return {};
        }
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
                    key: child.title,
                    style: {
                        height: 0,
                        opacity: 0
                    },
                    data: child
                    // {
                    //     title: child.title,
                    //     toggled: child.visible
                    // }
                }));
            }
            // Object
            return Object.keys(children).map((child, i) => ({
                key: i,
                style: {
                    height: 0,
                    opacity: 0
                },
                data: children[child]
                // {
                //     title: child,
                //     toggled: children[child].visible
                // }
            }));
        }

        return [];
    }

    bottomNavStyles(children) {
        if (typeof children === 'object') {
            // Array
            if (children.length) {
                return children.map(child => ({
                    key: child.title,
                    style: {
                        height: spring(30),
                        opacity: spring(1)
                    },
                    data: child
                    // {
                    //     title: child.title,
                    //     toggled: child.visible
                    // }
                }));
            }

            return Object.keys(children).map(child => ({
                key: child,
                style: {
                    height: spring(30),
                    opacity: spring(1)
                },
                data: children[child]
                // {
                //     title: child,
                //     toggled: children[child].visible
                // }
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

    // toggleImpactScreen() {
    //     const { dispatch } = this.props;
    //     dispatch(toggleImpact());
    // }

    handleMenuClick() {
        const { dispatch } = this.props;
        dispatch(toggleMenu());
    }

    handleNavItemClick(key) {
        console.log('nav item clicked', key);
        switch (key) {
            case 'filter':
                this.setState({
                    bottomNavState: this.state.bottomNavState === 'filter' ? '' : 'filter'
                });
                break;
            case 'menu':
                this.setState({
                    bottomNavState: this.state.bottomNavState === 'menu' ? '' : 'menu'
                });
                break;
            default:
                break;
        }
    }

    render() {
        // const { bottomNavContent } = this.props;
        const { bottomNavState } = this.state;
        const { toggleImpact } = this.props;
        const navItems = [
            {
                component: <Filter key='filter' />,
                key: 'filter',
                onClick: () => { this.handleNavItemClick('filter'); }
            },
            {
                component: <p key='contribute'>Contribute</p>,
                key: 'contribute',
                onClick: () => { this.handleNavItemClick('contribute'); }
            },
            {
                component: <p key='menu'>Menu</p>,
                key: 'menu',
                onClick: () => { this.handleNavItemClick('menu'); }
            }
        ];

        const bottomNavChildren = this.getChildren();

        let bottomNavClass = 'nav-bottom';
        if (bottomNavState === '') {
            bottomNavClass += ' closed';
        }
        return (
            <div className='nav'>
                <div className='nav-top'>
                    <div className='nav-left'>
                        <h4>Map Options</h4>
                        <div className='items'>
                            {navItems.map((item, idx) =>
                                <NavItem key={idx} item={item} toggled={item.key === bottomNavState} handleClick={item.onClick} />
                            )}
                        </div>
                    </div>
                    <div className='nav-right'>
                        <SearchBar />
                        <div className='nav-impact' onClick={toggleImpact}>
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
                                <BottomNavItem title={data.title} toggled={data.visible} key={key} style={style} type={data.type} />
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
    // bottomNavContent: React.PropTypes.string.isRequired,
    categories: React.PropTypes.object.isRequired,
    toggleImpact: React.PropTypes.func
};

export default connect(state => ({
    categories: state.categories,
    bottomNavContent: state.bottomNavContent
}))(Nav);
